import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

//Plugin Storage
import { Storage } from '@ionic/storage';

//Servicios
import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from '../../config/url.servicios';




@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos:any[] = [];
  total:number = 0;

  constructor(  public alert: AlertController, 
                private platform: Platform, 
                private storage: Storage, 
                private _us:UsuarioService,
                public modal: ModalController,
                private router: Router,
                private http:HttpClient) {

    this.cargar_storage();
    this.actualizar_total();
  }

  borrar_producto(indice:number){
    this.productos.splice(indice, 1);
    this.guardar_storage();
  }

  realizar_pedido(){
    
    let codigos:string[] = [];  //Un vector donde solo guardaremos los códigos
    let items:string;

    for( let producto of this.productos){ //Rellenamos el vector con los códigos
      codigos.push(producto.codigo);
    }
    items = codigos.join(",");
    const data = new HttpParams()
            .set("items", items);//Separamos los códigos por comas
    console.log(items);

    let url = `${URL_SERVICIOS}pedidos/realizar_orden/${this._us.token}/${this._us.id_usuario}`; //url
    
    return this.http.post(url, data)
          .subscribe( (resp:any) =>{
            let respuesta = resp;
            console.log(respuesta);
            if(respuesta.error==true){
              this.alerta("Error en el pedido", respuesta.mensaje);
            }else{
              this.productos = []; //Vaciamos el carrito
              this.alerta("Orden realizada", "Contactaremos con usted proximamente");
            }
          })
  }

  ver_carrito(){

    if(this._us.token){   //Estamos registrados    
      this.router.navigate(['carrito']);
    }else{  //Mostrar el login
      this.router.navigate(['login']);
    }
  } 


  agregar_carrito(producto:any){
    //Vamos a comprobar que el producto no exista en el carrito
    console.log(producto);
    for (let item of this.productos){
      if(item.codigo == producto.codigo){
        //Mensaje que existe ya en el carrito
        this.presentAlert(producto);
        return;
      }
    }
    this.productos.push(producto);//Vamos insertando al carrito
    this.actualizar_total();
    this.guardar_storage();
  }

  actualizar_total(){
    this.total = 0;
    for(let producto of this.productos){
      this.total += Number(producto.precio_compra);
    }
  }

  async presentAlert(producto){
    const alert = await this.alert.create({
      header: "Item existe",
      subHeader: producto.producto + ", ya se encuentra en el carrito",
      buttons: ["OK"]
    });
    await alert.present();
  }

  private guardar_storage(){
    if( this.platform.is("cordova")){ //Estamos en Dispositivo
      this.storage.set('productos', this.productos); //Lo guarda como una pequeña BD sqlite
    }else{ //Estamos en PC
      localStorage.setItem("productos", JSON.stringify(this.productos));
    }
  }

  cargar_storage(){
    if( this.platform.is("cordova")){
      //this.storage.ready().then( ()=>{
        this.storage.get('productos').then((productos) => {
          if( productos ){ //Si lo que hay en el LS son productos
            this.productos = productos;
          }
          console.log('Estos son los productos', productos);
        });
      //})
    }else{ 
      if(localStorage.getItem("productos")){ //Existen los productos en LS
        this.productos = JSON.parse( localStorage.getItem("productos"));
      }
      //Si no existen no pasa nada porque está inicializado vacío
    }  
  }
  async alerta(cabecera:string, sub:string){
    const alert = await this.alert.create({
      header: cabecera,
      subHeader: sub,
      buttons: ["OK"]
    });
    await alert.present();
  }


}
