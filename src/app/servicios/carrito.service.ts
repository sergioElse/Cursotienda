import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos:any[] = [];

  constructor(private alert: AlertController, private platform: Platform, private storage: Storage) {
    this.cargar_storage();
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
    this.guardar_storage();
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

}
