import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleComponent } from './article.component';
import { ArticleService } from '../../shared/services/article.service';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { Observable, of } from 'rxjs';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let articleService: ArticleService;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      imports: [RouterTestingModule, HttpClientModule, MarkdownModule, ReactiveFormsModule],
      providers: [ConfirmDialogService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    articleService = fixture.debugElement.injector.get(articleService);
    spyOn(articleService, 'getArticles').and.returnValue(of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
