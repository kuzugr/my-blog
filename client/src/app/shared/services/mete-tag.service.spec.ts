import { TestBed } from '@angular/core/testing';

import { MeteTagService } from './mete-tag.service';

describe('MeteTagServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeteTagService = TestBed.get(MeteTagService);
    expect(service).toBeTruthy();
  });
});
