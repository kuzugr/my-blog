import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateForm } from '../../shared/functions/validate-forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  categories: Array<Category>;
  categoryLoaded: boolean;
  form: FormGroup;
  formErrors: { [key: string]: Array<string> } = {};
  validationMessages = {
    keyword: {
      required: 'キーワードを入力してください。',
      maxlength: 'キーワードは50文字以内で入力してください。',
    },
  };

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.categoryLoaded = false;
    this.form = new FormGroup({
      keyword: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
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

  onSubmit() {
    if (this.form.valid) {
      this.formErrors = {};
      this.router.navigateByUrl(`/search?keyword=${encodeURIComponent(this.form.value['keyword'])}#top`);
    } else {
      this.formErrors = ValidateForm(this.form, false, this.validationMessages);
    }
  }
}
