# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:index, :show, :search, :create_months]
      skip_before_action :verify_authenticity_token, only: [:create, :update]
      before_action :upload_files, only: [:create]

      def index
        limit = params[:limit] || 5
        @articles = Article.order('created_at desc').limit(params[:limit])
        render status: 200, json: @articles, each_serializer: ArticleSerializer
      end

      def show
        @article = Article.find(params[:id])
        render status: 200, json: @article, serializer: ArticleSerializer
      end

      def new
      end

      def edit
        @article = Article.find(params[:id])
      end

      def update
        article = Article.find(params[:id])
        set_upload_files_and_thumbnail(article) if params[:article][:upload_file_uuids].present?
        article.update(article_params) if article.user_id == current_user.id
      end

      def create
        article = Article.new(article_params)
        article = set_upload_files_and_thumbnail(article) if params[:article][:upload_file_uuids].present?
        article.user_id = current_user.id
        article.save!
      end

      def destroy
        article = Article.find(params[:id])
        article.destroy if article.user_id === current_user.id
      end

      def search
        if params[:category]
          @articles = Article.by_category(params[:category])
        else
          @articles = Article.by_keyword(params[:keyword])
        end
        render status: 200, json: @articles, each_serializer: ArticleSerializer
      end

      def create_months
        create_months = Article.select(:created_at).map{ |i| i.created_at.strftime('%Y年%m月') }.uniq
        render status: 200, json: create_months
      end

      private
      def article_params
        params[:article].permit(:title, :mark_content, :html_content, :category_id)
      end

      def move_to_index
        redirect_to action: :index unless user_signed_in?
      end

      # 最終的に記事に乗せない画像を削除する
      def upload_files
        remove_files = []
        params[:article][:upload_file_uuids].each do |uuid|
          unless params[:article][:mark_content].include?(uuid)
            remove_files.push(uuid)
            UploadFile.remove_upload_file(uuid)
          end
        end
        UploadFile.where(uuid: remove_files).destroy_all if remove_files
        params[:article][:upload_file_uuids] - remove_files
      end

      def set_upload_files_and_thumbnail(article)
        upload_files_params = upload_files
        article_upload_files = UploadFile.where(uuid: upload_files_params).order(:id)
        article.upload_files << article_upload_files
        article.thumbnail = Thumbnail.new(file_name: article_upload_files[0].file_name,
                                          uuid: article_upload_files[0].uuid) unless article.thumbnail
        article
      end
    end
  end
end
