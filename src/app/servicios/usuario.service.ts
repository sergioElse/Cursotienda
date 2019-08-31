import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string = null;
  id_usuario:string = null;

  constructor(private http:HttpClient, 
              private alert:AlertController,
              private platform:Platform,
              private storage:Storage,
              private router:Router) { 
        
    this.cargar_storage();
  }

  activo():boolean{
    if(this.token){
      return true;
    }else{
      return false;
    }
  }

  login(correo:string, contrasena: string){
    let login:string;
    const data = new HttpParams()
          .set('correo', correo)
          .set('contrasena', contrasena);
    let url = URL_SERVICIOS + "login";

    return this.http.post(url, data)
                .subscribe((resp:any)=>{
                    let respuesta = resp;
                    console.log(respuesta);
                    if(respuesta.error){//No es correcto el login
                      this.Alerta("ERROR", "Usuario y/o contraseña incorrecto");
                    }else{
                      this.token = respuesta.token;
                      this.id_usuario = respuesta.id;
                      //Guardamos
                      this.guardar_storage();
                      this.router.navigate(['carrito']);
                    }
                  });   
  }


  async Alerta(cabecera:string, sub:string){
    const alert = await this.alert.create({
      header: cabecera,
      subHeader: sub,
      buttons: ["OK"]
    });
    await alert.present();
  }

  logout(){
    this.token=null;
    this.id_usuario=null;
    //guardar storage
    this.guardar_storage();
  }

  private guardar_storage(){
    if( this.platform.is("cordova")){ //Estamos en Dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario); 
    }else{ //Estamos en PC
      if (this.token){ //En el caso que no hayamos hecho logout 
        localStorage.setItem("token", this.token); //Ahora lo guardamos como string
        localStorage.setItem("id_usuario", this.id_usuario); //Ahora lo guardamos como string
      }else{//Caso logout
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }

  cargar_storage(){
    let promesa  = new Promise((resolve, reject)=>{
      if( this.platform.is("cordova")){
      //dispositivo  
      this.storage.ready()
                  .then( ()=>{
                    this.storage.get('token')
                                .then((token)=>{
                                    if(token){ //Si existe el token
                                      this.token = token;
                                    }
                                })
                    this.storage.get('id_usuario')
                                .then((id)=>{
                                  if(id){ //Si existe el token
                                    this.id_usuario = id;
                                  }
                                  resolve();
                                })
        })
      }else{ 
        if(localStorage.getItem("token")){ //Existe token en LS
          this.token = localStorage.getItem("token");
          this.id_usuario = localStorage.getItem("id_usuario");
        }
        resolve();
      }  
    });
    return promesa;
  }
}
