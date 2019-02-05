module Api
  module V1
    class ThumbnailsController < ApplicationController
      def create
        image = params[:image]
        s3 = Aws::S3::Resource.new(region:'ap-northeast-1')
        obj = s3.bucket('kuzugr-blog').object('thumbnails/key')
        obj.upload_file(image.tempfile)
        render json: { public_url: obj.public_url}
      end
    end
  end
end