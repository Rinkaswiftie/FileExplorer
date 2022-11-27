import {TestBed} from '@angular/core/testing';

import {FileExplorerService} from './file-explorer.service';
import {filesystem} from './file-data';

describe('FileExplorerService', () => {
  let service: FileExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileExplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find a file and rename it', () => {
    service.renameFile('Desktop', 'File 1.txt', 'New Name', true);
    const nameChanged = filesystem.find(f => f.name.toUpperCase() === 'Desktop'.toUpperCase())
      .files.find(f => f.name === 'New Name');
    expect(nameChanged).toBeTruthy();
  });

  it('should find a folder and rename it', () => {
    service.renameFile('Desktop', 'Folder 1', 'New Name', false);
    const nameChanged = filesystem.find(f => f.name.toUpperCase() === 'Desktop'.toUpperCase())
      .folders.find(f => f.name === 'New Name');
    expect(nameChanged).toBeTruthy();
  });

  it('should create a new folder', () => {
    service.createNewFolder('Desktop');
    const created = filesystem.find(f => f.name.toUpperCase() === 'Desktop'.toUpperCase())
      .folders.find(f => f.name === 'New Folder');
    expect(created).toBeTruthy();
    service.createNewFolder('Desktop');
    const createdAnother = filesystem.find(f => f.name.toUpperCase() === 'Desktop'.toUpperCase())
      .folders.find(f => f.name === 'New Folder(1)');
    expect(createdAnother)
      .withContext('to have a unique name each time we create')
      .toBeTruthy();
  });

  it('should get files and folders for a requested page', () => {
    expect(filesystem.find(f => f.name.toUpperCase() === 'Desktop'.toUpperCase()))
      .toEqual(service.getFilesAndFoldersForAPage('Desktop'));
  });

  it('should get files and folders for a requested sectioned page', () => {
    const result = service.getFilesAndFoldersForAPage('Quick Access');
    expect(result.files.length).toBeGreaterThan(0);
    expect(result.folders.length).toBeGreaterThan(0);
  });
});
