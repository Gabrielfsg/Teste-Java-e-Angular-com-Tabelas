export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  promocao: string;
}


export enum Promocao {
  DOIS_PAGUE_UM = "DOIS_PAGUE_UM",
  TRES_POR_DEZ = "TRES_POR_DEZ"
}
