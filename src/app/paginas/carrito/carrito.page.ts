import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { RutaImagenPipe } from '../../pipes/ruta-imagen.pipe';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private _cs:CarritoService) { }

  ngOnInit() {
  }

  rutaImagen(codigo){
    var ruta = new RutaImagenPipe();
    return ruta.transform(codigo);
  }

}
