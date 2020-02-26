import { Component, OnInit } from '@angular/core';
import { MetaTagService } from '../../shared/services/meta-tag.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit() {
    this.metaTagService.setMetaTag();
  }
}
