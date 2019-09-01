import { Component } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage {

  constructor(private _cs:CarritoService, private router:Router) { }
  

  
  ionViewDidEnter(): void {
    this._cs.cargar_pedidos();   
    console.log('DidEnter');
  }
  ionViewDidLoad(): void {
    this._cs.cargar_pedidos();
    console.log('DidLoad');   
  }


  detalles_pedido(pedido){ //Nueva funcion de Angular para pasar parámetros
    this.router.navigate(['ordenes-detalle'], {
      queryParams:{
        pedido : JSON.stringify(pedido)
      },
    });
  }

}
