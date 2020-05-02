import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('matSideNav', { static: true }) matSideNav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }
}
