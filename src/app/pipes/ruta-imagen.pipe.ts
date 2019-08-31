import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES } from '../../config/url.servicios';

@Pipe({
  name: 'rutaImagen'
})
export class RutaImagenPipe implements PipeTransform {

  transform(codigo: string ): string { //El valor que recibimos
    return URL_IMAGENES + codigo + '.jpg';

  }

}



