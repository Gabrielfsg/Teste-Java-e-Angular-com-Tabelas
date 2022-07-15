package com.example.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProdutoDTO {

    private Long id;
    private String nome;
    private Integer quantidade;
    private Float preco;
    private String promocao;




    public ProdutoDTO(Long id, String nome, Integer quantidade,Float preco, String promocao){
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.promocao = promocao;

    }
}
