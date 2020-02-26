import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaTagService {
  constructor(private metaService: Meta, private titleService: Title) {}

  setMetaTag(article?: Article) {
    if (!!article) {
      this.setArticlePageMetatag(article);
    } else {
      this.setTopPageMetaTag();
    }
  }

  setTopPageMetaTag() {
    this.titleService.setTitle("kuzuエンジニア'sブログ");
    this.metaService.updateTag({ name: 'description', content: 'Webエンジニアの私が技術に関する記事を書いていくブログです。' });
    this.metaService.updateTag({ property: 'og:title', content: "kuzuエンジニア'sブログ" });
    this.metaService.updateTag({ property: 'og:description', content: 'Webエンジニアの私が技術に関する記事を書いていくブログです。' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://kuzugr.com' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://kuzugr.com/assets/images/coding.jpg' });
  }

  setArticlePageMetatag(article: Article) {
    this.titleService.setTitle(article.title);
    const articleContent = article.html_content
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
      .replace(/\r?\n/g, '')
      .trim();
    const description = article.description || articleContent;
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: article.title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ property: 'og:url', content: `https://kuzugr.com/article/${article.id}` });
    this.metaService.updateTag({ property: 'og:image', content: article.thumbnail_url });
  }
}
