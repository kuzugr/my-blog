import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdsenseComponent } from './header-adsense.component';

describe('HeaderAdsenseComponent', () => {
  let component: HeaderAdsenseComponent;
  let fixture: ComponentFixture<HeaderAdsenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAdsenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAdsenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
