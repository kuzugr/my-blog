import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss'],
})
export class ScrollTopButtonComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  scrollToTop() {
    window.scroll(0, 0);
  }
}
