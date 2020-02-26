import { Component, OnInit } from '@angular/core';
import { MetaTagService } from '../../shared/services/meta-tag.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit() {
    this.metaTagService.setMetaTag();
  }
}
