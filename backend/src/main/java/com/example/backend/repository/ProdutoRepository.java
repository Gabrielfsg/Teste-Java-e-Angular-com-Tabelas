package com.example.backend.repository;

import com.example.backend.dto.ProdutoDTO;
import com.example.backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("select new com.example.backend.dto.ProdutoDTO(p.id, p.nome, p.quantidade, p.preco , p.promocao)" +
            "from Produto p where lower(p.nome) like lower(concat('%',:nome,'%'))")
    List<ProdutoDTO> buscaListagemProduto(String nome);

    @Query("select p from Produto p where lower(p.nome) = lower(:nome) ")
    Produto verificaProdutoNomeDuplicado(String nome);

}
