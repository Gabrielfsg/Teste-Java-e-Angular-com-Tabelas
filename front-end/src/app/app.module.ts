import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home-page/home/home.component';
import {MegaMenuModule} from 'primeng/megamenu';
import { MenuComponent } from './pages/menu/menu.component';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import { ListagemProdutosComponent } from './pages/produtos/listagem-produtos/listagem-produtos.component';
import { CadastrarEditarProdutosComponent } from './pages/produtos/cadastrar-editar-produtos/cadastrar-editar-produtos.component';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from 'primeng/toast';
import {MoneyPipe} from "./pipe/money.pipe";
import { VendaProdutoComponent } from './pages/venda/venda-produto/venda-produto.component';
import { ListagemVendasComponent } from './pages/venda/listagem-vendas/listagem-vendas.component';
import { ListagemProdutosVendaComponent } from './pages/venda/listagem-produtos-venda/listagem-produtos-venda.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ListagemProdutosComponent,
    CadastrarEditarProdutosComponent,
    MoneyPipe,
    VendaProdutoComponent,
    ListagemVendasComponent,
    ListagemProdutosVendaComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MegaMenuModule,
        CardModule,
        InputTextModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        AutoCompleteModule,
        HttpClientModule,
        ToastModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
