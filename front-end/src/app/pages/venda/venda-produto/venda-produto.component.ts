import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {Produto, Promocao} from "../../../model/produto.model";
import {finalize} from "rxjs";
import {ProdutoService} from "../../../services/services-api/produto.service";
import {Venda, VendaProduto} from "../../../model/venda.model";
import {MaskService} from "../../../services/masks/mask.service";
import {UtilsService} from "../../../utils/utils.service";

@Component({
  selector: 'app-venda-produto',
  templateUrl: './venda-produto.component.html',
  styleUrls: ['./venda-produto.component.scss'],
  providers: [MessageService]
})
export class VendaProdutoComponent implements OnInit {

  colunas = ['Nome', 'Preço', 'Promoção', 'Quantidade', 'Remover'];
  isLoadingBuscar: boolean = false;
  isPodeCalcular: boolean = true;

  promocaoTRES_POR_DEZ = Promocao.TRES_POR_DEZ;
  promocaoDOIS_PAGUE_UM = Promocao.DOIS_PAGUE_UM;
  valorTotal: string  = '';

  venda: Venda = new class implements Venda {
    // @ts-ignore
    dataVenda: Date;
    // @ts-ignore
    id: number;
    // @ts-ignore
    status: boolean;
    // @ts-ignore
    total: number;
    vendaProduto: VendaProduto[] = [];
  }

  produtos: VendaProduto[] = [];

  constructor(private produtoService: ProdutoService,
              private messageService: MessageService,
              private mask: MaskService,
              private utilService: UtilsService
              ) { }

  ngOnInit(): void {
    this.buscarCarrinho();
  }

  buscarCarrinho(){
    this.isLoadingBuscar = true;
    this.produtoService.buscarListagemCarrinho()
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe((res) => {
        this.venda = res;
        if(this.venda){
          if(this.venda.vendaProduto.length >  0){
            this.produtos = res.vendaProduto;
            this.isPodeCalcular = false;
          } else {
            this.isPodeCalcular= true;
          }
        }
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: 'Erro Api'});
      });
  }

  modificaQuantidade(id: number, validador: boolean){
    this.venda.vendaProduto.forEach(value => {
      if(value.id === id){
        if(validador){
          value.quantidade += 1;
        } else {
          value.quantidade -= 1;
        }
      }
    });
  }

  removerCarrinho(id: number){
    this.isLoadingBuscar = true;
    this.produtoService.removerCarrinho(id)
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe(() => {
        this.produtos = [];
        this.buscarCarrinho();
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Produto removido do carrinho.'});
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: 'Erro Api'});
      });
  }

  buscarValorCarrinho(){
    this.produtoService.calcularCarrinho(this.venda)
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe((res) => {
        this.venda.total = res;
        this.valorTotal = this.utilService.formataValor(res);
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: error.error.message});
      });
  }

  realizarVenda(){
    this.produtoService.realizarVenda(this.venda)
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe(() => {
        this.produtos = [];
        this.valorTotal = '';
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Venda realizada com sucesso.'});
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: error.error.message});
      });
  }

  aplicarMascara() {
    this.valorTotal = (this.mask.currencyMask(this.valorTotal));
  }

}
