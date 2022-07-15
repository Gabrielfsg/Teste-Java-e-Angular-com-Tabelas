package com.example.backend;

import com.example.backend.dto.ProdutoDTO;
import com.example.backend.mapper.ProdutoMapper;
import com.example.backend.model.Produto;
import com.example.backend.repository.ProdutoRepository;
import com.example.backend.services.ProdutoService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class ProdutoTest {

    @InjectMocks
    private ProdutoService produtoService;

    @Mock
    private ProdutoRepository produtoRepository;

    @Mock
    private ProdutoMapper produtoMapper;

    private Produto produto;
    private ProdutoDTO produtoDTO;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
        startObjects();
    }

    @Test
    public void cadastraProduto(){
        Mockito.when(produtoRepository.save(Mockito.any())).thenReturn(produto);
        Produto prodResultado = produtoService.salvarProduto(produtoDTO);
        Assertions.assertThat(prodResultado).isNotNull();
        Assertions.assertThat(prodResultado).hashCode();
        Assertions.assertThat(prodResultado.getId()).isNotNull();
    }

    private void startObjects(){
        produto = new Produto(1L,"Teste",1, new Float(5),"TRES_POR_DEZ");
        produtoDTO = new ProdutoDTO(1L,"Teste",1,new Float(5),"TRES_POR_DEZ");
    }
}
