import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string = "";
  contrasena:string = ""; 

  constructor(private _us:UsuarioService, private router:Router) { }

  login(){
    console.log('Entramos en el login de la page');
    this._us.login(this.correo, this.contrasena);
    
  }

  ngOnInit() {
  }

}
