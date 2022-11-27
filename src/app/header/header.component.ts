import {Component, OnInit} from '@angular/core';
import {CurrentTabService} from '../current-tab.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  icon: string;
  title: string;

  constructor(private currentTabService: CurrentTabService) {
  }

  ngOnInit(): void {
    this.currentTabService.getCurrentTabSubject().subscribe(tab => {
      this.title = tab.name;
      this.icon = tab.icon;
    });
  }

}
