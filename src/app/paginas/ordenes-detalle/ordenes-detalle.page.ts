import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaImagenPipe } from '../../pipes/ruta-imagen.pipe';
import { CarritoService } from '../../servicios/carrito.service';


@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  pedido:any[]=[];

  constructor(private route:ActivatedRoute, 
              private _cs:CarritoService,
              private router:Router) {
    this.route.queryParams.subscribe((respuesta)=>{
      this.pedido = JSON.parse(respuesta.pedido);
   })
  }

  ngOnInit() {
  }
  rutaImagen(codigo){
    var ruta = new RutaImagenPipe();
    return ruta.transform(codigo);
  }

  borrar_pedido(id_pedido){
    this._cs.borrar_pedidos(id_pedido)
              .subscribe( (data:any)=>{
                console.log(data);
                if(data.error){
                  console.log('entramos en el error');
                }else{
                  this.router.navigate(['tabs/tab-pedidos']);
                }
              })
  }

}
