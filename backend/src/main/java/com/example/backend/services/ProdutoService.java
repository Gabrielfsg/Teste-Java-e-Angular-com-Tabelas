package com.example.backend.services;

import com.example.backend.dto.DadosVendaDTO;
import com.example.backend.dto.ProdutoDTO;
import com.example.backend.dto.VendaDTO;
import com.example.backend.dto.VendaProdutoDTO;
import com.example.backend.mapper.ProdutoMapper;
import com.example.backend.mapper.VendaMapper;
import com.example.backend.mapper.VendaProdutoMapper;
import com.example.backend.model.Produto;
import com.example.backend.model.Venda;
import com.example.backend.model.VendaProduto;
import com.example.backend.repository.ProdutoRepository;
import com.example.backend.repository.VendaProdutoRepository;
import com.example.backend.repository.VendaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProdutoService {


    @Autowired
    private ProdutoMapper produtoMapper;

    @Autowired
    private VendaMapper vendaMapper;

    @Autowired
    private VendaProdutoMapper vendaProdutoMapper;

    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VendaProdutoRepository vendaProdutoRepository;

    public Produto salvarProduto(ProdutoDTO produtoDTO) {
        if (!validarProdutosDuplicados(produtoDTO)) {
            throw new ResponseStatusException(HttpStatus.FOUND, "Já existe esse produto com esse nome!");
        }
        return produtoRepository.save(produtoMapper.produtoDTOToProduto(produtoDTO));
    }

    private boolean validarProdutosDuplicados(ProdutoDTO produtoDTO) {
        boolean retorno = true;
        Produto produto = produtoRepository.verificaProdutoNomeDuplicado(produtoDTO.getNome());
        if (produto != null) {
            if (produtoDTO.getId() != produto.getId()) {
                retorno = false;
            }
        }
        return retorno;
    }

    public List<ProdutoDTO> listagemProdutos(ProdutoDTO prod) {
        List<ProdutoDTO> lista = produtoRepository.buscaListagemProduto(prod.getNome());
        return lista;
    }

    public DadosVendaDTO listagemCarrinho() {
        DadosVendaDTO venda = vendaRepository.buscaVendaListagem();
        if (venda != null) {
            venda.setVendaProduto(vendaProdutoMapper.listVendaProdToVendaProdDTO(vendaProdutoRepository.obterVendaProdutoPorVenda(venda.getId())));
            return venda;
        } else {
            return null;
        }
    }

    public void realizaVenda(VendaDTO venda){
        venda.setStatus(false);
        venda.getVendaProduto().forEach(vendaProdutoDTO -> {
            vendaProdutoDTO.setPromocao(vendaProdutoDTO.getProduto().getPromocao());
            vendaProdutoDTO.setPreco(calculaProduto(vendaProdutoDTO));
            vendaProdutoDTO.getProduto().setQuantidade(vendaProdutoDTO.getProduto().getQuantidade() - vendaProdutoDTO.getQuantidade());
            vendaProdutoDTO.setNomeProduto(vendaProdutoDTO.getProduto().getNome());
        });
        Venda venda1 = vendaMapper.vendaDTOToVenda(venda);
        venda1.getVendaProduto().forEach(vendaProduto -> {
            vendaProduto.setVenda(venda1);
        });
        vendaRepository.save(venda1);
    }

    public Float buscarFinalizacaoVenda(VendaDTO venda) {
        venda.setTotal(new Float(0));
        venda.getVendaProduto().forEach(vendaProduto -> {
            float valor = calculaProduto(vendaProduto);
            if (venda.getTotal() != null) {
                venda.setTotal(venda.getTotal() + valor);
            } else {
                venda.setTotal(valor);
            }
        });
        return venda.getTotal();
    }

    private Float calculaProduto(VendaProdutoDTO vendaProduto){
            float valor = 0;
            switch (vendaProduto.getProduto().getPromocao()) {
                case "TRES_POR_DEZ":
                    if (vendaProduto.getQuantidade() == 3) {
                        vendaProduto.setPreco(new Float(10));
                        valor = vendaProduto.getPreco();
                    } else {
                        valor = (vendaProduto.getProduto().getPreco() * vendaProduto.getQuantidade());
                    }
                    break;
                case "DOIS_PAGUE_UM":
                    if (vendaProduto.getQuantidade() == 2) {
                        vendaProduto.setPreco(new Float(vendaProduto.getProduto().getPreco()));
                        valor = vendaProduto.getPreco();
                    } else {
                        valor = (vendaProduto.getProduto().getPreco() * vendaProduto.getQuantidade());
                    }
                    break;
                default:
                    valor = (vendaProduto.getProduto().getPreco() * vendaProduto.getQuantidade());
            }
            return valor;
    }

    public ProdutoDTO buscarProdutoPeloId(Long id) {
        Optional<Produto> produto = produtoRepository.findById(id);
        if (produto.isPresent()) {
            return produtoMapper.produtoToProdutoDTO(produto.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public void excluirProduto(Long id) {
        Optional<Produto> produto = produtoRepository.findById(id);
        if (produto.isPresent()) {
            boolean temVenda = vendaRepository.verificaSeTemProdutoNoCarrinho(id);
            if(temVenda){
                throw new ResponseStatusException(HttpStatus.FOUND, "O produto está no carrinho, remova o produto do carrinhopara poder remove-lo!");
            }
            boolean temVendido = vendaRepository.verificaSeTemProdutoVendido(id);
            if(temVendido){
                throw new ResponseStatusException(HttpStatus.FOUND, "O produto já está vinculado a uma venda e não pode ser removido!");
            }
            produtoRepository.delete(produto.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public void adicionarProdutoCarrinho(Long id) {
        boolean temVenda = vendaRepository.verificaSeJaExisteVenda();
        Optional<Produto> produto = produtoRepository.findById(id);
        if(produto.get().getQuantidade() == 0){
            throw new ResponseStatusException(HttpStatus.FOUND, "O produto " + produto.get().getNome() + " possui quantidade 0. O mínimo necessário " +
                    "para ir ao carrinho é 1." );
        }
        VendaProduto vendaProduto = new VendaProduto();
        if (temVenda) {
            Venda venda = vendaRepository.buscaVendaAtiva();
            venda.getVendaProduto().forEach(vendaProduto1 -> {
                if (vendaProduto1.getProduto().getId() == produto.get().getId()) {
                    throw new ResponseStatusException(HttpStatus.FOUND, "Já existe esse produto no carrinho!");
                }
            });
            vendaProduto.setProduto(produto.get());
            vendaProduto.setVenda(venda);
            vendaProduto.setQuantidade(1);
            VendaProduto vendaProdutoSalva = vendaProdutoRepository.save(vendaProduto);
            venda.getVendaProduto().add(vendaProdutoSalva);
            vendaRepository.save(venda);
        } else {
            Venda venda = new Venda();
            venda.setDataVenda(LocalDateTime.now());
            venda.setStatus(true);
            venda.setTotal(new Float(0));
            Venda vendaSalva = vendaRepository.save(venda);
            vendaProduto.setProduto(produto.get());
            vendaProduto.setVenda(vendaSalva);
            vendaProduto.setQuantidade(1);
            VendaProduto vendaProdutoSalva = vendaProdutoRepository.save(vendaProduto);
            vendaSalva.getVendaProduto().add(vendaProdutoSalva);
            vendaRepository.save(vendaSalva);
        }
    }

    public void removerProdutoCarrinho(Long id) {
        Optional<VendaProduto> vendaProduto = vendaProdutoRepository.findById(id);
        if (vendaProduto.isPresent()) {
            vendaProdutoRepository.delete(vendaProduto.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
