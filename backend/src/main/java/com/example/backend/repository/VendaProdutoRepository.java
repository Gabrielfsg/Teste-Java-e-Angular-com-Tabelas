package com.example.backend.repository;

import com.example.backend.model.VendaProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VendaProdutoRepository extends JpaRepository<VendaProduto, Long> {

    @Query("select vp from VendaProduto vp where vp.venda.id = :id")
    List<VendaProduto> obterVendaProdutoPorVenda(Long id);

}
