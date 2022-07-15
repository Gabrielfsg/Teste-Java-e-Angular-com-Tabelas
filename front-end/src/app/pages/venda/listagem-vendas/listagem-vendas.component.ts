import { Component, OnInit } from '@angular/core';
import {Venda} from "../../../model/venda.model";
import {MessageService} from "primeng/api";
import {finalize} from "rxjs";
import {ProdutoService} from "../../../services/services-api/produto.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listagem-vendas',
  templateUrl: './listagem-vendas.component.html',
  styleUrls: ['./listagem-vendas.component.css'],
  providers: [MessageService]
})
export class ListagemVendasComponent implements OnInit {

  constructor(private messageService: MessageService,
              private produtoService: ProdutoService,
              private router: Router) { }

  colunas = ['Id', 'Data Venda', 'Valor Total', 'Produtos'];
  isLoadingBuscar: boolean = false;

  vendas: Venda[] = [];

  ngOnInit(): void {
    this.buscarCarrinho();
  }

  buscarCarrinho(){
    this.isLoadingBuscar = true;
    this.produtoService.buscarListagemVendasRealizadas()
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe((res) => {
        this.vendas = res;
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: 'Erro Api'});
      });
  }

  listarProdutos(id: number){
    this.router.navigate(['vendas/produtos'] , {queryParams: {idVenda: id}});
  }

}
