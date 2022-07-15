package com.example.backend.services;

import com.example.backend.dto.VendaDTO;
import com.example.backend.dto.VendaListagemDTO;
import com.example.backend.mapper.VendaMapper;
import com.example.backend.repository.VendaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class VendaServico {


    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VendaMapper vendaMapper;

    public List<VendaListagemDTO> listarVendasRealizadas() {
        List<VendaListagemDTO> vendas = vendaRepository.listarVendasRealizadas();
        return vendas;
    }

    public VendaDTO listarProdutosVendaRealizada(Long id) {
        return vendaMapper.vendaToVendaDTO(vendaRepository.findById(id).get());
    }
}
