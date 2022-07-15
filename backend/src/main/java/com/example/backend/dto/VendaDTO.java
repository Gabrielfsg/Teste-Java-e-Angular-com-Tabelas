package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class VendaDTO {

    private Long id;
    private LocalDateTime dataVenda;
    private Float total;
    private boolean status;
    private List<VendaProdutoDTO> vendaProduto = new ArrayList<>();

}
