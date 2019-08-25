import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaImagenPipe } from '../../pipes/ruta-imagen.pipe';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto:any;
  
  constructor(private route: ActivatedRoute) {
    console.log('en el producto');
    this.route.queryParams.subscribe((respuesta)=>{
      this.producto = JSON.parse(respuesta.producto)
      console.log(this.producto);
    })

  
  }
  ngOnInit() {
  }
  rutaImagen(codigo){
    var ruta = new RutaImagenPipe();
    return ruta.transform(codigo);
  }
}
