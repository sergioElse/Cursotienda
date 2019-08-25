import { NgModule } from '@angular/core';
import { RutaImagenPipe } from './ruta-imagen.pipe'; //manera de decir que es un modulo

@NgModule({
  declarations: [RutaImagenPipe],
  exports:[  //Esto nos lo creamos para poder exportarlo y usarlo en otros sitios
    RutaImagenPipe
  ]
})
export class PipesModule { }
