package com.example.backend.mapper;

import com.example.backend.dto.VendaProdutoDTO;
import com.example.backend.model.VendaProduto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface VendaProdutoMapper {

    VendaProdutoDTO vendaProdutoToVendaProdutoDTO(VendaProduto vendaProduto);

    VendaProduto vendaProdutoDTOToVendaProduto(VendaProdutoDTO vendaProdutoDTO);

    List<VendaProdutoDTO> listVendaProdToVendaProdDTO(List<VendaProduto> venda);
}
