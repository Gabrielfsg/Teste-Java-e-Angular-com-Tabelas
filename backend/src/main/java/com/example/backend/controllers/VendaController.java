package com.example.backend.controllers;

import com.example.backend.dto.DadosVendaDTO;
import com.example.backend.dto.VendaDTO;
import com.example.backend.dto.VendaListagemDTO;
import com.example.backend.model.Venda;
import com.example.backend.services.VendaServico;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/venda")
public class VendaController {

    @Autowired
    private VendaServico vendaServico;

    @GetMapping("/listarVendasRealizadas")
    public ResponseEntity<List<VendaListagemDTO>> listarVendasRealizadas(){
        return new ResponseEntity<>(vendaServico.listarVendasRealizadas(), HttpStatus.OK);
    }

    @GetMapping("/listarProdutosVendaRealizada/{id}")
    public ResponseEntity<VendaDTO> listarProdutosVendaRealizada(@PathVariable @NotNull Long id){
        return new ResponseEntity<>(vendaServico.listarProdutosVendaRealizada(id), HttpStatus.OK);
    }

}
