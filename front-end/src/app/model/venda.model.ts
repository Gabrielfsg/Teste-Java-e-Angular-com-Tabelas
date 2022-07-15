import {Produto} from "./produto.model";

export interface Venda {
  id: number;
  dataVenda: Date;
  total: number;
  status: boolean;
  vendaProduto: VendaProduto[];
}

export interface VendaProduto {
  id: number;
  preco: number;
  quantidade: number;
  promocao: string;
  nomeProduto: string;
  produto: Produto;
}
