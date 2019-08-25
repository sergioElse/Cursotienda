import { Component } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { RutaImagenPipe } from '../../pipes/ruta-imagen.pipe';
import { Router } from '@angular/router'


@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ //Tengo que añadir el servidio que importo arriba.
    ProductosService,
  ] 
})
export class HomePage {

  productos:any[] = [];

  constructor(public _ps: ProductosService, private router: Router) {
    this.productos = this._ps.productos;

  }

  siguiente_pagina(event){
    this._ps.cargar_todos().then( ()=>{  //No recibo ningún parámetro
        console.log('Done');
        event.target.complete();
      
    });
  }

  rutaImagen(codigo){
    var ruta = new RutaImagenPipe();
    return ruta.transform(codigo);
  }

  pinchar(item){ //Nueva funcion de Angular para pasar parámetros
    this.router.navigate(['producto'], {
      queryParams:{
        producto : JSON.stringify(item)
      },
    }); 

  }

}
