import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  constructor(private _ps:ProductosService, private router:Router) { }

  ngOnInit() {
  }

  buscar_productos(termino: any){
    let valor = termino.target.value;
    this._ps.buscar_producto(valor);
  }
  ir_producto(producto){
    console.log('El producto: ', producto)
    this.router.navigate(['producto'], {
      queryParams:{
        producto : JSON.stringify(producto)
      },
    });
  }
}
