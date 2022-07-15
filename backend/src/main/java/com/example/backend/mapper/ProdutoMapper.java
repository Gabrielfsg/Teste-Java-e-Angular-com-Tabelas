package com.example.backend.mapper;

import com.example.backend.dto.ProdutoDTO;
import com.example.backend.model.Produto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    ProdutoDTO produtoToProdutoDTO(Produto produto);

    Produto produtoDTOToProduto(ProdutoDTO produto);
}
