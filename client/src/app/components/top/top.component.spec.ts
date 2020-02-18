import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopComponent } from './top.component';

xdescribe('TopComponent', () => {
  let component: TopComponent;
  let fixture: ComponentFixture<TopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
