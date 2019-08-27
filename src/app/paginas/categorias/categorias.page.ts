import { Component } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage {
  
  constructor(private _ps: ProductosService, private router: Router) { 

  }

  pinchar(categoria){ //Nueva funcion de Angular para pasar parámetros
    this.router.navigate(['por-categorias'], {
      queryParams:{
        producto : JSON.stringify(categoria)
      },
    }); 

  }

}
