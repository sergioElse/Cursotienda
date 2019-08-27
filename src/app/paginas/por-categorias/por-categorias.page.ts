import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { RutaImagenPipe } from '../../pipes/ruta-imagen.pipe';


@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage {

  categoria:any = {};

  constructor(private route: ActivatedRoute, private _ps:ProductosService) {
    this.route.queryParams.subscribe((respuesta)=>{
      this.categoria = JSON.parse(respuesta.producto);
      this._ps.cargar_por_categoria(this.categoria.id)
      console.log(this.categoria);
      console.log(this.categoria.id);
    }) 

  }

  rutaImagen(codigo){
    var ruta = new RutaImagenPipe();
    return ruta.transform(codigo);
  }
}
