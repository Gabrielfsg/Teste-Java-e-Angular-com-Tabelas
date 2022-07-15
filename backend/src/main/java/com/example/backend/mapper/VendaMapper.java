package com.example.backend.mapper;

import com.example.backend.dto.VendaDTO;
import com.example.backend.model.Venda;
import com.example.backend.model.VendaProduto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface VendaMapper {

    VendaDTO vendaToVendaDTO(Venda venda);

    Venda vendaDTOToVenda(VendaDTO vendaDTO);

}
