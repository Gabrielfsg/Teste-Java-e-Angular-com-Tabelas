package com.example.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DadosVendaDTO {

    private Long id;
    private LocalDateTime dataVenda;
    private Float total;
    private boolean status;

    private List<VendaProdutoDTO> vendaProduto = new ArrayList<>();

    public DadosVendaDTO(Long id, LocalDateTime dataVenda, Float total, boolean status){
        this.id = id;
        this.dataVenda = dataVenda;
        this.total = total;
        this.status = status;
    }
}
