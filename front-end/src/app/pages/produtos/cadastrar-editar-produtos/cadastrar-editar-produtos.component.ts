import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MaskService} from "../../../services/masks/mask.service";
import {Produto, Promocao} from "../../../model/produto.model";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs";
import {ProdutoService} from "../../../services/services-api/produto.service";
import {UtilsService} from "../../../utils/utils.service";

@Component({
  selector: 'app-cadastrar-editar-produtos',
  templateUrl: './cadastrar-editar-produtos.component.html',
  styleUrls: ['./cadastrar-editar-produtos.component.scss'],
  providers: [MessageService]
})
export class CadastrarEditarProdutosComponent implements OnInit {

  isEditar: boolean = false;
  isLoadingSalvar: boolean = false;

  form: FormGroup = this.fb.group({
    nome: [],
    preco: ['0,00'],
    promocao: [],
    quantidade: [1],
    carrinho: [false]
  });

  produto: Produto = new class implements Produto {
    // @ts-ignore
    id: number;
    // @ts-ignore
    nome: string;
    // @ts-ignore
    preco: number;
    // @ts-ignore
    promocao: string;
    // @ts-ignore
    quantidade: number;
    // @ts-ignore
    carrinho: boolean;
  }

  promocoes = ['Leve 2 e Pague 1', '3 por R$10,00']

  promocoesAuto: any[] = [];

  constructor(private fb: FormBuilder,
              private mask: MaskService,
              private messageService: MessageService,
              private router: Router,
              private produtoService: ProdutoService,
              private route: ActivatedRoute,
              private utilService: UtilsService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get("idProduto")) {
        this.isEditar= true;
        // @ts-ignore
        this.produto.id = JSON.parse(params.get("idProduto"));
        this.produtoService.buscarPeloId(this.produto.id)
          .pipe(finalize(() => (this.isLoadingSalvar = false)))
          .subscribe((res) => {
            this.construirDadosEditaveis(res);
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro Api'});
          });
      }
    });
  }

  construirDadosEditaveis(res: Produto) {
    this.form.get('nome')?.setValue(res.nome);
    this.form.get('quantidade')?.setValue(res.quantidade);
    this.form.get('preco')?.setValue(this.utilService.formataValor(res.preco));
    if (res.promocao) {
      if (res.promocao === Promocao.DOIS_PAGUE_UM) {
        this.form.get('promocao')?.setValue('Leve 2 e Pague 1');
      } else if (res.promocao === Promocao.TRES_POR_DEZ) {
        this.form.get('promocao')?.setValue('3 por R$10,00');
      }
    }
  }

  buscaPromocoes(event: any) {
    let filtrados: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.promocoes.length; i++) {
      let promocao = this.promocoes[i];
      if (promocao.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrados.push(promocao);
      }
    }
    this.promocoesAuto = filtrados;
  }

  salvar() {
    if (!this.validarCampos()) {
      return;
    }
    this.contruirModel();
    this.isLoadingSalvar = true;
    this.produtoService.salvarProduto(this.produto)
      .pipe(finalize(() => (this.isLoadingSalvar = false)))
      .subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Produto excluido com sucesso.'});
        this.router.navigate(['produtos']);
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: error.error.message});
      });
  }

  contruirModel() {
    this.produto.nome = this.form.get('nome')?.value;
    this.produto.quantidade = this.form.get('quantidade')?.value;
    let valor: string = "";
    valor = this.form.get('preco')?.value;
    this.produto.preco = Number(valor.toString().replace(',', '.'));
    if (this.form.get('promocao')?.value === 'Leve 2 e Pague 1') {
      this.produto.promocao = Promocao.DOIS_PAGUE_UM;
    } else if (this.form.get('promocao')?.value === '3 por R$10,00') {
      this.produto.promocao = Promocao.TRES_POR_DEZ;
    } else {
      this.produto.promocao = '';
    }
  }

  validarCampos() {
    if (!this.form.get('nome')?.value) {
      this.messageService.add({severity: 'warn', summary: 'Campo Obrigatório', detail: 'O campo nome é obrigatório!'});
      return false;
    }
    if (!this.form.get('preco')?.value) {
      this.messageService.add({severity: 'warn', summary: 'Campo Obrigatório', detail: 'O campo preço é obrigatório!'});
      return false;
    }
    if (!this.form.get('quantidade')?.value || this.form.get('quantidade')?.value <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campo Obrigatório ou Incorreto',
        detail: 'O campo quantidade é obrigatório e so aceita valores positivos!'
      });
      return false;
    }
    return true;
  }

  aplicarMascara() {
    this.form.get('preco')?.setValue(this.mask.currencyMask(this.form.get('preco')?.value));
  }
}
