import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  }
]

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router; 
  let injector: TestBed;

  beforeEach(async () => {
    //preparando o módulo para teste
    //aqui nós colocamos tudo que o componente vai usar
    //outros coponentes, service e etc...
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    //ciandoo componente
    fixture = TestBed.createComponent(LoginComponent);
    //pegando a instância do componente criado
    component = fixture.componentInstance;
    //aplicando mudanças no DOM
    fixture.detectChanges();
    injector = getTestBed();
    router = injector.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
