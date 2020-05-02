import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from 'src/app/services/shared/nav.service';
import { NavData } from 'src/app/models/shared/nav-data';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() matSideNav: MatSidenav;

  navItens: NavData[];

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.loadNavItens();
  }

  loadNavItens() {
    this.navItens = this.navService.GetNav();
  }

  hideShowMenu() {
    if (this.matSideNav) {
      this.matSideNav.toggle();
    }
  }
}
