import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemVendasComponent } from './listagem-vendas.component';

describe('ListagemVendasComponent', () => {
  let component: ListagemVendasComponent;
  let fixture: ComponentFixture<ListagemVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemVendasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
