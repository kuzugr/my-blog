import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAdsenseComponent } from './footer-adsense.component';

describe('FooterAdsenseComponent', () => {
  let component: FooterAdsenseComponent;
  let fixture: ComponentFixture<FooterAdsenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterAdsenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAdsenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
