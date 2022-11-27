import {TestBed} from '@angular/core/testing';

import {CurrentTabService} from './current-tab.service';
import {filesystem} from './file-data';

describe('CurrentTabService', () => {
  let service: CurrentTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new folder in the given tab', () => {
    service.createNewFolderInTab('Desktop', 'computer');
    filesystem.find(f => f.name === 'Desktop').folders.find(f => f.name.includes('New Folder'));
    expect(service.currentTab$.value.name)
      .withContext('should stay in current tab')
      .toEqual('Desktop');
  });

  it('should go to a selected tab', () => {
    service.selectTab('Quick Access', 'star');
    expect(service.currentTab$.value.name)
      .withContext('should go to desired tab')
      .toEqual('Quick Access');
  });

  it('should get the count when queried', () => {
    expect(service.getCountInTab().value).toEqual(service.countInTab$.value);
  });
});
