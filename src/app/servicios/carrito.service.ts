import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos:any[] = [];

  constructor(public alert: AlertController) { }

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
  }

  async presentAlert(producto){
    const alert = await this.alert.create({
      header: "Item existe",
      subHeader: producto.producto + ", ya se encuentra en el carrito",
      buttons: ["OK"]
    });
    await alert.present();
  }
}
