import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarProdutosComponent } from './cadastrar-editar-produtos.component';

describe('CadastrarEditarProdutosComponent', () => {
  let component: CadastrarEditarProdutosComponent;
  let fixture: ComponentFixture<CadastrarEditarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
