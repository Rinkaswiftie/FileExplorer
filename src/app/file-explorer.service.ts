import {Injectable} from '@angular/core';
import {dropsdowns, filesystem, sections} from './file-data';
import {FolderModel} from './folder.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {
  private filesystem: FolderModel[];
  private readonly sections: any;

  constructor() {
    this.filesystem = filesystem;
    this.sections = sections;
  }

  getDropdowns = () => dropsdowns;

  getSections = (name: string): FolderModel[] => {
    return this.sections[name];
  }

  isSectionedTab = (name: string) => name in this.sections;

  getFilesAndFoldersForAPage = (name: string) => {
    if (this.isSectionedTab(name)) {
      const output: FolderModel = this.getDropdowns()
        .find(f => f.name.toUpperCase() === name.toUpperCase());
      output.files = [];
      this.getSections(name).forEach(section => {
          output.files = output.files.concat(section.files);
        }
      );
      return output;
    }
    return this.filesystem.find(f => f.name.toUpperCase() === name.toUpperCase());
  }

  createNewFolder(name: string) {
    const id = uuidv4();
    const existingFolders = this.filesystem.find(f => f.name.toUpperCase() === name.toUpperCase()).folders;
    let folderName = 'New Folder';
    let i = 1;
    while (!!existingFolders.find((folderM) => folderM.name === folderName)){
      folderName = 'New Folder(' + i + ')';
      i++;
    }
    const folder: FolderModel = {
      id,
      name: folderName,
      icon: 'folder'
    };
    this.filesystem.find(f => f.name.toUpperCase() === name.toUpperCase()).folders.push(folder);
    return folderName;
  }

  renameFile(pageName: string, oldName: string, newName: string, isFile: boolean) {
    if (isFile) {
      this.filesystem.find(f => f.name.toUpperCase() === pageName.toUpperCase())
        .files.find(f => f.name === oldName).name = newName;
    } else {
      this.filesystem.find(f => f.name.toUpperCase() === pageName.toUpperCase())
        .folders.find(f => f.name === oldName).name = newName;
    }
  }
}
