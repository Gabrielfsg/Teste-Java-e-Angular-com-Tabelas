import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ProdutoService} from "../../../services/services-api/produto.service";
import {finalize} from "rxjs";
import {Produto} from "../../../model/produto.model";
import {MessageService} from 'primeng/api';
import {UtilsService} from "../../../utils/utils.service";

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss'],
  providers: [MessageService]
})
export class ListagemProdutosComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nome: []
  });

  isLoadingBuscar: boolean = false;

  colunas = ['Nome', 'Preço', 'Editar', 'Excluir', 'Carrinho'];
  produtos: Produto[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private produtoService: ProdutoService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.limpar()
  }

  limpar(){
    this.form.get('nome')?.setValue('');
    this.buscarProdutos();
  }

  buscarProdutos(){
    this.isLoadingBuscar = true;
    this.produtoService.buscarListagemProdutos(this.form.value)
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe((res) => {
        this.produtos = res;
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: 'Erro Api'});
      });
  }

  novoProduto(){
    this.router.navigate(['produtos/criar-editar-produto']);
  }

  editarProduto(id: number){
    this.router.navigate(['produtos/criar-editar-produto'] , {queryParams: {idProduto: id}});
  }

  excluirProduto(id: number){
    this.isLoadingBuscar = true;
    this.produtoService.excluirProduto(id)
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe(() => {
        this.buscarProdutos();
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Produto excluido com sucesso.'});
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: error.error.message});
      });
  }

  adicionarCarrinho(id: number){
    this.isLoadingBuscar = true;
    this.produtoService.adicionarCarrinho(id)
      .pipe(finalize( () => (this.isLoadingBuscar = false)))
      .subscribe(() => {
        this.buscarProdutos();
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Produto adicionado ao carrinho.'});
      }, error => {
        this.messageService.add({severity:'error', summary:'Erro', detail: error.error.message});
      });
  }

}
