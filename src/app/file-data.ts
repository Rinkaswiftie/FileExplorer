import {FileModel} from './file.model';
import {FolderModel} from './folder.model';
import { v4 as uuidv4 } from 'uuid';

const files = (): FileModel[] => {
  return [1, 2, 3, 4, 5]
    .map((num) => {
      return {
        id: uuidv4(),
        name: `File ${num}.txt`,
        icon: 'insert_drive_file',
        type: 'txt',
        size: `${num * 101} kb`
      };
    });
};

const folders = (): FolderModel[] => {
  return [1, 2, 3, 4, 5]
    .map((num) => {
      return {
        id: uuidv4(),
        name: `Folder ${num}`,
        icon: 'folder',
        files: files(),
        folders: []
      };
    });
};

const deepCopy = (obj) => {
  let copy;
  // Handle the 3 simple types, and null or undefined
  // tslint:disable-next-line:triple-equals
  if (null == obj || 'object' != typeof obj) { return obj; }

  // // Handle Date
  // if (obj instanceof Date) {
  //   copy = new Date();
  //   copy.setTime(obj.getTime());
  //   return copy;
  // }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) { copy[attr] = deepCopy(obj[attr]); }
    }
    return copy;
  }
};

export const filesystem: FolderModel[] =
  [
    {
      id: uuidv4(),
      name: '3D objects',
      icon: 'view_in_ar',
      files: files(),
      folders : deepCopy(folders())
    },
    {
      id: uuidv4(),
      name: 'Desktop',
      icon: 'computer',
      files: files(),
      folders : deepCopy(folders())
    },
    {
      id: uuidv4(),
      name: 'Document',
      icon: 'description',
      files: files(),
      folders : deepCopy(folders())
    },
    {
      id: uuidv4(),
      name: 'Download',
      icon: 'download',
      files: files(),
      folders : deepCopy(folders())
    },
    {
      id: uuidv4(),
      name: 'Music',
      icon: 'audiotrack',
      files: files(),
      folders : deepCopy(folders())
    },
    {
      id: uuidv4(),
      name: 'Pictures',
      icon: 'image',
      files: files(),
      folders : deepCopy(folders())
    },
    {
      id: uuidv4(),
      name: 'Videos',
      icon: 'theaters',
      files: files(),
      folders : deepCopy(folders())
    },
    {
      id: uuidv4(),
      name: 'OSDisk (C:)',
      icon: 'album',
      files: files(),
      folders : deepCopy(folders())
    },
  ];

export const sections = {
  'Quick Access': [
    {
      name: 'Frequent Folders',
      folders: filesystem.slice(1, 5),
      files: [] as FileModel[]
    },
    {
      name: 'Recent files',
      files: filesystem.reduce((prev, curr) => {
        return {
          id: '',
          name: '',
          icon: '',
          folders: [],
          files: curr.files.concat(prev.files)
        };
      }).files.slice(3, 9),
      folders: [] as FolderModel[]
    }
  ],
  'This PC': [
    {
      name: 'Folders',
      folders: filesystem.slice(0, 7),
      files: [] as FileModel[],
    },
    {
      name: 'Device and drivers',
      folders: filesystem.slice(7),
      files: [] as FileModel[]
    }
  ],
  'Network': [] as {
    name: string,
    files: FileModel[],
    folders: FolderModel[]
  }[]
};

export const dropsdowns = [
  {
    id: uuidv4(),
    name: 'Quick Access',
    icon: 'star',
    folders: filesystem.slice(1, 5),
  },
  {
    id: uuidv4(),
    name: 'This PC',
    icon: 'desktop_windows',
    folders: filesystem,
  },
  {
    id: uuidv4(),
    name: 'Network',
    icon: 'public',
    folders: new Array<FolderModel>(0),
  }
];

