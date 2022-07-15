import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemProdutosVendaComponent } from './listagem-produtos-venda.component';

describe('ListagemProdutosVendaComponent', () => {
  let component: ListagemProdutosVendaComponent;
  let fixture: ComponentFixture<ListagemProdutosVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemProdutosVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemProdutosVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
