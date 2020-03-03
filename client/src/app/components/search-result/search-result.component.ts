import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  params: any;
  articles: Array<Article>;
  nextPage: Number;
  previousPage: Number;
  articleLoaded: boolean;
  searcyType: string;
  searchTypeValue: string;
  searchTypeLoaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.articleLoaded = false;
    this.searchTypeLoaded = false;
    this.getParamsAndSearch();
  }

  getParamsAndSearch() {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.searchArticle();
    });
  }

  searchArticle() {
    this.articleService.searchArticle(this.params).subscribe(
      (response) => {
        this.articles = response.articles;
        this.nextPage = response.next_page;
        this.previousPage = response.previous_page;
        if (this.params['category_id']) {
          this.searcyType = 'カテゴリ';
          this.categoryService.loadCategories().then((categories) => {
            if (!!categories) {
              this.setCategoryName(categories);
            }
          });
        } else {
          if (this.params['keyword']) {
            this.searcyType = 'キーワード';
            this.searchTypeValue = this.params['keyword'];
          }
        }

        this.searchTypeLoaded = true;
        if (this.params['category_id'] && this.params['category_id'] === 'all') {
          this.searchTypeLoaded = false;
        }
        this.articleLoaded = true;
      },
      (error) => {},
    );
  }

  setCategoryName(categories: Array<Category>) {
    if (!!categories) {
      categories.forEach((category) => {
        if (category.id === Number(this.params['category_id'])) {
          this.searchTypeValue = category.name;
        }
      });
    }
  }

  pagination(page: Number) {
    if (this.params['category_id']) {
      const routerOption = { queryParams: { category_id: this.params['category_id'], page: page }, fragment: 'search-result' };
      this.router.navigate(['/search'], routerOption);
    } else {
      const routerOption = { queryParams: { keyword: this.params['keyword'], page: page }, fragment: 'search-result' };
      this.router.navigate(['/search'], routerOption);
    }
  }
}
