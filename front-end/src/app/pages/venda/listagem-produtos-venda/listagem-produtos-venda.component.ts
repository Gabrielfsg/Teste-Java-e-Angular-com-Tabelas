import { Component, OnInit } from '@angular/core';
import {VendaProduto} from "../../../model/venda.model";
import {Promocao} from "../../../model/produto.model";
import {finalize} from "rxjs";
import {MessageService} from "primeng/api";
import {ProdutoService} from "../../../services/services-api/produto.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-listagem-produtos-venda',
  templateUrl: './listagem-produtos-venda.component.html',
  styleUrls: ['./listagem-produtos-venda.component.css'],
  providers: [MessageService]
})
export class ListagemProdutosVendaComponent implements OnInit {

  colunas = ['Nome Produto', 'Promoção', 'Preço', 'Quantidade'];
  promocaoTRES_POR_DEZ = Promocao.TRES_POR_DEZ;
  promocaoDOIS_PAGUE_UM = Promocao.DOIS_PAGUE_UM;
  isLoadingBuscar: boolean = false;

  produtosVenda: VendaProduto[] = [];
  idProduto: number = 0;

  constructor(private messageService: MessageService,
              private produtoService: ProdutoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get("idVenda")) {
        // @ts-ignore
        this.idProduto = JSON.parse(params.get("idVenda"));
        this.buscarProdutos(this.idProduto);
      }
    });
  }

  buscarProdutos(id: number){
    this.isLoadingBuscar = true;
    this.produtoService.listarProdutosVendaRealizada(id)
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe((res) => {
        this.produtosVenda = res.vendaProduto;
        this.idProduto = res.id;
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: 'Erro Api'});
      });
  }

}
