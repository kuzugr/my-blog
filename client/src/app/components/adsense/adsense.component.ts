import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-adsense',
  templateUrl: './adsense.component.html',
  styleUrls: ['./adsense.component.scss'],
})
export class AdsenseComponent implements OnInit {
  spView: boolean;
  canDisplay: boolean;

  constructor() {}

  ngOnInit() {
    this.canDisplay = false;
    this.handleResizeWindow(window.innerWidth);
  }

  @HostListener('window:resize')
  onResize() {
    this.handleResizeWindow(window.innerWidth);
  }

  private handleResizeWindow(width: Number) {
    if (768 >= width) {
      this.spView = true;
    } else {
      this.spView = false;
    }
    this.canDisplay = true;
  }
}
