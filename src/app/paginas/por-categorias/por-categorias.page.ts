import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { RutaImagenPipe } from '../../pipes/ruta-imagen.pipe';


@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage {

  categoria:any = {};

  constructor(private activatedRoute: ActivatedRoute, private _ps:ProductosService, private router:Router) {
    this.activatedRoute.queryParams.subscribe((respuesta)=>{
      this.categoria = JSON.parse(respuesta.producto);
      this._ps.cargar_por_categoria(this.categoria.id);
      
    }) 
  }

  rutaImagen(codigo){
    var ruta = new RutaImagenPipe();
    return ruta.transform(codigo);
  }

  pinchar(producto){ //Nueva funcion de Angular para pasar parámetros
    this.router.navigate(['producto'], {
      queryParams:{
        producto : JSON.stringify(producto)
      },
    });
  }
}
