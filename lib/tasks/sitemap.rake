# frozen_string_literal: true

namespace :sitemap do
  desc 'create sitemap.xml'
  task create: :environment do
    SitemapService.new.call
  end
end