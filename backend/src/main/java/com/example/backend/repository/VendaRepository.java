package com.example.backend.repository;

import com.example.backend.dto.DadosVendaDTO;
import com.example.backend.dto.VendaListagemDTO;
import com.example.backend.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    @Query("select case when count(v) > 0 then true else false end from Venda v where v.status = true")
    boolean verificaSeJaExisteVenda();

    @Query("select v from Venda v where v.status = true")
    Venda buscaVendaAtiva();

    @Query("select new com.example.backend.dto.DadosVendaDTO(v.id, v.dataVenda, v.total, v.status) from Venda v where v.status = true")
    DadosVendaDTO buscaVendaListagem();

    @Query("select new com.example.backend.dto.VendaListagemDTO(v.id, v.dataVenda, v.total) from Venda v where v.status = false")
    List<VendaListagemDTO> listarVendasRealizadas();

    @Query("select case when count(v) > 0 then true else false end from Venda v inner join VendaProduto vp on vp.venda = v where v.status = true and vp.produto.id = :id")
    boolean verificaSeTemProdutoNoCarrinho(Long id);

    @Query("select case when count(v) > 0 then true else false end from Venda v inner join VendaProduto vp on vp.venda = v where v.status = false and vp.produto.id = :id")
    boolean verificaSeTemProdutoVendido(Long id);

}
