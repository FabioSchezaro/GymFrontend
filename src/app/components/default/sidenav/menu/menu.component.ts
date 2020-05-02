import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/shared/nav.service';
import { NavData } from 'src/app/models/shared/nav-data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  navItens: NavData[];

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.loadNavItens();
  }

  loadNavItens() {
    this.navItens = this.navService.GetNav();
  }

}
