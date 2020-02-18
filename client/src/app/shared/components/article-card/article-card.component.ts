import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit, OnChanges {
  @Input() articles: Array<Article>;
  articleRows: Array<Array<Article>>;
  articleLoaded: boolean;
  previousArticles: Array<Article>;

  constructor() { }

  ngOnInit() {
    this.articleLoaded = false;
    this.splitFourArticles();
  }

  ngOnChanges() {
    if (this.previousArticles) {
      this.articleLoaded = false;
      this.splitFourArticles();
    }
  }

  splitFourArticles(){
    const idx = 0;
    this.articleRows = [];

    while(idx < this.articles.length){
        this.articleRows.push(this.articles.splice(idx, idx + 4));
    }

    this.previousArticles = this.articles;
    this.articleLoaded = true;
  }
}
