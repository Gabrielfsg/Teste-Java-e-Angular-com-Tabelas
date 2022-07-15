package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class VendaListagemDTO {

    private Long id;
    @JsonFormat(pattern = "YYYY-MM-dd HH:mm")
    private LocalDateTime dataVenda;
    private Float total;

    private boolean status;

    private List<VendaProdutoDTO> vendaProduto = new ArrayList<>();

    public VendaListagemDTO(Long id, LocalDateTime dataVenda, Float total){
        this.id = id;
        this.dataVenda = dataVenda;
        this.total = total;
    }
}
