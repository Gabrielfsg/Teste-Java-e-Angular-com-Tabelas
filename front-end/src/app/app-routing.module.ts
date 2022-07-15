import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home-page/home/home.component";
import {ListagemProdutosComponent} from "./pages/produtos/listagem-produtos/listagem-produtos.component";
import {
  CadastrarEditarProdutosComponent
} from "./pages/produtos/cadastrar-editar-produtos/cadastrar-editar-produtos.component";
import {VendaProdutoComponent} from "./pages/venda/venda-produto/venda-produto.component";
import {ListagemVendasComponent} from "./pages/venda/listagem-vendas/listagem-vendas.component";
import {ListagemProdutosVendaComponent} from "./pages/venda/listagem-produtos-venda/listagem-produtos-venda.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "produtos",
    component: ListagemProdutosComponent
  },
  {
    path: "carrinho",
    component: VendaProdutoComponent
  },
  {
    path: "vendas",
    component: ListagemVendasComponent
  },
  {
    path: "vendas/produtos",
    component: ListagemProdutosVendaComponent
  },
  {
    path: "produtos/criar-editar-produto",
    component: CadastrarEditarProdutosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
