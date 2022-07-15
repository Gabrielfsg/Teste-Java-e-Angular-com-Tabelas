import { Component, OnInit } from '@angular/core';
import {MegaMenuItem} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MegaMenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Pagina Inicial',
        icon: 'pi pi-fw pi-home',
        routerLink:['']
      },
      {
        label: 'Produtos',
        icon: 'pi pi-fw pi-inbox',
        routerLink:['produtos']
      },
      {
        label: 'Carrinho',
        icon: 'pi pi-fw pi-money-bill',
        routerLink:['carrinho']
      },
      {
        label: 'Vendas',
        icon: 'pi pi-fw pi-list',
        routerLink:['vendas']
      },
    ]
  }

}
