import { Injectable } from '@angular/core';
import { NavData } from 'src/app/models/shared/nav-data';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  GetNav(): NavData[] {
    const navItens: NavData[] = [
      {
        name: 'Cadastro',
        url: '/register',
        childrens: [
          {
            name: 'Planos',
            url: '/register/plans'
          },
          {
            name: 'Doenças',
            url: '/register/disease'
          },
          {
            name: 'Pessoas',
            url: '/register/people'
          }
        ]
      }
    ];
    return navItens;
  }
}
