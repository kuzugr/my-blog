import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleCardComponent } from './article-card.component';

xdescribe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleCardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
