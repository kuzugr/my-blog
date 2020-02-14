import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  categories: Array<Category>;
  categoryLoaded: boolean;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryLoaded = false;
    this.loadCategories();
  }

  async loadCategories() {
    this.categoryService.loadCategories().then((categories) => {
      if (!!categories) {
        this.categories = categories;
        this.categoryLoaded = true;
      }
    });
  }
}
