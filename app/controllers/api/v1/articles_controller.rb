# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user_from_token!,
        only: [:index, :show, :search, :archive]

      def index
        limit = params[:limit] || 5
        articl_ids = Article.latest_ids(published_option, limit)
        articles = Article.with_comments_and_thumbnail(published_option, articl_ids)
        include_option = params[:limit] == '1' ? true : false

        serializer_options = {
          include_comments: include_option,
          include_thumbnail: !include_option,
          include_next: include_option,
        }
        response_articles = articles.map do |article|
          ArticleSerializer.new(article, serializer_options)
        end
        render status: 200, json: { articles: response_articles }
      end

      def show
        @article = Article.includes(:comments)
                          .where(published: published_option)
                          .order('comments.created_at asc').find(params[:id])
        render status: 200, json: @article,
          serializer: ArticleSerializer, include_thumbnail: true,
          include_comments: true, include_next: true
      end

      def update
        article = Article.find(params[:id])
        set_upload_files_and_thumbnail(article) if params[:article][:upload_file_uuids].present?
        article.update(article_params) if article.user_id == current_user.id
        SitemapService.new.call if article.published
      end

      def create
        article = Article.new(article_params)
        set_upload_files_and_thumbnail(article) if params[:article][:upload_file_uuids].present?
        article.user_id = current_user.id
        article.save!
        render status: 201, json: { id: article.id }
      end

      def destroy
        article = Article.find(params[:id])
        render_invalid_request && return unless article.user_id == current_user.id

        article.upload_files.each do |upload_file|
          UploadFile.remove_upload_file(upload_file.uuid)
        end
        article.destroy
      end

      def search
        render_invalid_request && return unless search_parms_valid?

        articles = searched_articles.page(params[:page] || 1).per(12)
        response_articles = articles.map do |article|
          ArticleSerializer.new(article, { include_thumbnail: true })
        end
        response = {
          articles: response_articles,
          next_page: articles.next_page,
          previous_page: articles.prev_page,
        }
        render status: 200, json: response
      end

      def update_publish_status
        article = Article.find(params[:id])
        after_status = article.published ? false : true
        article.published = after_status
        article.save!
        if after_status
          twitter_service = TwitterService.new(tweet_message(article))
          twitter_service.call
          SitemapService.new.call
        end
        render status: 200, json: article,
          serializer: ArticleSerializer, include_comments: true, include_next: true
      end

      def tweet
        article = Article.find(params[:id])
        raise Exception unless article.published
        twitter_service = TwitterService.new(tweet_message(article))
        twitter_service.call
        render status: 200, json: { message: 'tweet success' }
      end

      private
      def article_params
        params.require(:article)
              .permit(:title, :mark_content, :html_content, :category_id, :published, :description)
      end

      def move_to_index
        redirect_to action: :index unless user_signed_in?
      end

      # 最終的に記事に乗せない画像を削除する
      def upload_files
        return unless params[:article][:upload_file_uuids]
        remove_files = []
        params[:article][:upload_file_uuids].each do |uuid|
          next if params[:article][:mark_content].include?(uuid)
          remove_files.push(uuid)
          UploadFile.remove_upload_file(uuid)
        end
        UploadFile.where(uuid: remove_files).destroy_all if remove_files
        params[:article][:upload_file_uuids] - remove_files
      end

      def set_upload_files_and_thumbnail(article)
        upload_files_params = upload_files
        article_upload_files = UploadFile.where(uuid: upload_files_params).order(:id)
        if article_upload_files.present?
          article.upload_files << article_upload_files
          article.thumbnail = Thumbnail.new(file_name: article_upload_files[0].file_name,
            uuid: article_upload_files[0].uuid) unless article.thumbnail
        end
        article
      end

      def published_option
        User.logged_in?(session) ? [true, false] : true
      end

      def search_parms_valid?
        params[:category_id].present? || params[:keyword].present?
      end

      def searched_articles
        if params[:category_id]
          search_by_category
        else
          Article.with_thumbnail(published_option).by_keyword(params[:keyword])
        end
      end

      def search_by_category
        if params[:category_id] == 'all'
          Article.order(created_at: :desc)
        else
          Article.with_thumbnail(published_option).by_category(params[:category_id])
        end
      end

      def tweet_message(article)
        "#{article.title}\n\n#{ENV['CORS_ALLOW_HOST']}/article/#{article.id}"
      end
    end
  end
end
