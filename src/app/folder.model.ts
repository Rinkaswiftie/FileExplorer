import {FileModel} from './file.model';

export interface FolderModel{
  id: string;
  name: string;
  icon?: string;
  files?: FileModel[];
  folders?: FolderModel[];
}
