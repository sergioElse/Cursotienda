import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule} from '@ionic/storage'


//Servicios
import { ProductosService } from './servicios/productos.service'
import { UsuarioService } from './servicios/usuario.service'
import { CarritoService } from './servicios/carrito.service';


//Pipes
import { PipesModule } from './pipes/pipes.module';
import { RutaImagenPipe } from './pipes/ruta-imagen.pipe';


@NgModule({
  declarations: [
    AppComponent, 
    RutaImagenPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(), 
    HttpClientModule,
    AppRoutingModule,
    //PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CarritoService,
    UsuarioService,
    ProductosService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
