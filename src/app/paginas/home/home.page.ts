import { Component } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { RutaImagenPipe } from '../../pipes/ruta-imagen.pipe';
import { Router } from '@angular/router'
import { CarritoService } from '../../servicios/carrito.service';


@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  productos:any[] = [];

  constructor(public _ps: ProductosService, private router: Router, private _cs:CarritoService) {
    this.productos = this._ps.productos;
    console.log(_cs.productos.length);

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
