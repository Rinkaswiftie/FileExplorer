import {TestBed} from '@angular/core/testing';

import {FileSelectionService} from './file-selection.service';
import {of} from 'rxjs';

describe('FileSelectionService', () => {
  let service: any;
  beforeEach(() => {
        service = new FileSelectionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
