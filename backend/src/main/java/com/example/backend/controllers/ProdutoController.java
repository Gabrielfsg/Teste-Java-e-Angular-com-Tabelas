package com.example.backend.controllers;

import com.example.backend.dto.DadosVendaDTO;
import com.example.backend.dto.ProdutoDTO;
import com.example.backend.dto.VendaDTO;
import com.example.backend.model.Produto;
import com.example.backend.services.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<Produto> salvarProduto(@RequestBody ProdutoDTO produto){
        return new ResponseEntity<>(produtoService.salvarProduto(produto), HttpStatus.CREATED);
    }

    @PostMapping("/buscar")
    public ResponseEntity<List<ProdutoDTO>> listagemProdutos(@RequestBody ProdutoDTO produto){
        return new ResponseEntity<>(produtoService.listagemProdutos(produto), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscarProdutoPeloId(@PathVariable @NotNull Long id){
        return new ResponseEntity<>(produtoService.buscarProdutoPeloId(id), HttpStatus.OK);
    }

    @GetMapping("/carrinho")
    public ResponseEntity<DadosVendaDTO> buscarCarrinho(){
        return new ResponseEntity<>(produtoService.listagemCarrinho(), HttpStatus.OK);
    }

    @PostMapping("/calcularCarrinho")
    public ResponseEntity<Float> calcularCarrinho(@RequestBody VendaDTO dto){
        return new ResponseEntity<>(produtoService.buscarFinalizacaoVenda(dto), HttpStatus.OK);
    }

    @PostMapping("/realizarVenda")
    public ResponseEntity<Void> realizarVenda(@RequestBody VendaDTO dto){
        produtoService.realizaVenda(dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable @NotNull Long id){
        produtoService.excluirProduto(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/adicionarCarrinho/{id}")
    public ResponseEntity<Void> adicionarCarrinho(@PathVariable @NotNull Long id){
        produtoService.adicionarProdutoCarrinho(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/removerCarrinho/{id}")
    public ResponseEntity<Void> removerCarrinho(@PathVariable @NotNull Long id){
        produtoService.removerProdutoCarrinho(id);
        return ResponseEntity.ok().build();
    }
}
