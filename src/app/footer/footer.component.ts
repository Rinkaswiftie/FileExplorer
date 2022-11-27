import { Component, OnInit } from '@angular/core';
import {CurrentTabService} from '../current-tab.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  itemCount = 0;
  constructor(private tabService: CurrentTabService) { }

  ngOnInit(): void {
    this.tabService
      .getCountInTab()
      .subscribe(count => {
        this.itemCount = count;
      });
  }

}
