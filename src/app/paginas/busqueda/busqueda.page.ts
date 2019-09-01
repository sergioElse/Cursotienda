import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  constructor(private _ps:ProductosService) { }

  ngOnInit() {
  }

  buscar_productos(termino: any){
    let valor = termino.target.value;
    console.log(valor);
  }

}
