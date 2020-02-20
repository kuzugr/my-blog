# frozen_string_literal: true

class ArticleListSerializer < ActiveModel::Serializer
  attribute :articles
  attribute :next_page
  attribute :previous_page

  def articles
    object.each do |article|
      ArticleSerializer.new(object, scope[:include_thumbnail])
    end
  end

  def next_page
    object.next_page
  end

  def previous_page
    object.prev_page
  end
end
