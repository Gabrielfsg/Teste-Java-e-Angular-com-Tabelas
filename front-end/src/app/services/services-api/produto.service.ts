import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Produto} from "../../model/produto.model";
import {environment} from "../../../environments/environment";
import {Venda} from "../../model/venda.model";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private http:HttpClient) {
  }

  salvarProduto(prod: Produto): Observable<any>{
    return this.http.post<any>(`${environment.baseUrlApi}/produto`, prod);
  }

  buscarPeloId(id: number): Observable<Produto>{
    return this.http.get<Produto>(`${environment.baseUrlApi}/produto/${id}`);
  }

  buscarListagemProdutos(prod: Produto): Observable<Produto[]>{
    return this.http.post<Produto[]>(`${environment.baseUrlApi}/produto/buscar`, prod);
  }

  buscarListagemCarrinho(): Observable<Venda>{
    return this.http.get<Venda>(`${environment.baseUrlApi}/produto/carrinho`);
  }

  buscarListagemVendasRealizadas(): Observable<Venda[]>{
    return this.http.get<Venda[]>(`${environment.baseUrlApi}/venda/listarVendasRealizadas`);
  }

  listarProdutosVendaRealizada(id: number): Observable<Venda>{
    return this.http.get<Venda>(`${environment.baseUrlApi}/venda/listarProdutosVendaRealizada/${id}`);
  }

  excluirProduto(id: number): Observable<any>{
    return this.http.delete<any>(`${environment.baseUrlApi}/produto/${id}`);
  }
  adicionarCarrinho(id: number): Observable<any>{
    return this.http.get<any>(`${environment.baseUrlApi}/produto/adicionarCarrinho/${id}`);
  }
  removerCarrinho(id: number): Observable<any>{
    return this.http.get<any>(`${environment.baseUrlApi}/produto/removerCarrinho/${id}`);
  }

  calcularCarrinho(venda: Venda): Observable<any>{
    return this.http.post<any>(`${environment.baseUrlApi}/produto/calcularCarrinho`, venda);
  }

  realizarVenda(venda: Venda): Observable<any>{
    return this.http.post<any>(`${environment.baseUrlApi}/produto/realizarVenda`, venda);
  }
}
