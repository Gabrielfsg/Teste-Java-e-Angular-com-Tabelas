package com.example.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VendaProdutoDTO {

    private Long id;
    private Integer quantidade;
    private Float preco;
    private String promocao;
    private String nomeProduto;
    private ProdutoDTO produto;
}
