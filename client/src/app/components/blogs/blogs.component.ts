import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  articles: Array<Article>;
  articleLoaded: boolean;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleLoaded = false;
    this.getLatestArticles();
  }

  getLatestArticles() {
    this.articleService.getArticles({ limit: 4 }).subscribe((response) => {
      if (response.articles.length > 0) {
        this.articles = response.articles;
        this.articleLoaded = true;
      }
    });
  }
}
