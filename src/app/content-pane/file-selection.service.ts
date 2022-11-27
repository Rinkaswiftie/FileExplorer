import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class FileSelectionService {

  constructor() {
  }

  private selectedFile$ = new Subject<string>();

  selectedFile(): Subject<string> {
    return this.selectedFile$;
  }
}
