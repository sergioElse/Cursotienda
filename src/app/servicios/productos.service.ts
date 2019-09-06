import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
 
import { URL_SERVICIOS } from '../../config/url.servicios'


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  pagina:number = 0;
  productos:any[] = []; //queda del tipo productos[[item1, item2],[item3, item4]......]
  lineas:any[] = [];
  por_categoria:any[] = []; //Arreglo para objetos filtrados por categoría
  resultados:any[]= []; //Arreglo para guardar las busquedas

  constructor(private http: HttpClient) { 
      this.cargar_todos();
      this.cargar_lineas();

  }  

  cargar_lineas(){
    let url = URL_SERVICIOS + "lineas";
    this.http.get(url)
      .subscribe((data:any) => {
        console.log('Esto es el data: ',data);
        console.log('Esto es el data.error:', data.error);
        if(data.error){
          //Error
        }else{
          console.log(data.lineas);
          return this.lineas = data.lineas;
          
        }
      })
  }

  cargar_por_categoria(categoria:number){
    let url = URL_SERVICIOS + "productos/por_tipo/" + categoria;
    this.http.get(url)
      .subscribe( (data:any) => {
        if(data.error){
          //Hay 
       }else{
        this.por_categoria = data.productos;
      }});
  }
  
  cargar_todos(){

    let promesa = new Promise((resolve, reject)=>{

      let url = URL_SERVICIOS + "productos/todos/" + this.pagina;
      this.http.get(url)
          .subscribe( (data:any) =>{
             if(data.error){
                //Hay 
             }else{
               let nuevaData = this.agrupar_columnas(data.productos, 2); //Lo pasamos por la funcion

              this.productos.push(...nuevaData);//Ya entran de 2 en 2 al vector
              this.pagina = this.pagina +1;
             } 
            resolve();
          });

    })
    return promesa;

  }

  private agrupar_columnas(arreglo:any, tamanyo:number){ //recibo arreglo y el tamaño que quiero
      let nuevoArreglo = [];
      for( let i = 0; i<arreglo.length; i+=tamanyo ){
          nuevoArreglo.push(arreglo.slice(i, i+tamanyo));
          //La funcion slice "trozo" coge un trozo de un indice inicial a otro final
      }
      console.log(nuevoArreglo);
      return nuevoArreglo;
  }


  buscar_producto(termino:string){
    let url = URL_SERVICIOS + "productos/buscar/" + termino;
    this.http.get(url)
        .subscribe((resp:any)=>{
          this.resultados = resp.productos;
        })
  }

}
