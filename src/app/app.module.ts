import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header/header.component';
import { AddProveComponent } from './proveedores/add-prove/add-prove.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { PresupuestosService } from './servicios/presupuestos.service';
import { PresupuestoComponent } from './presupuestos/presupuesto/presupuesto.component';
import { EditpressComponent } from './presupuestos/editpress/editpress.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AutentificacionService } from './servicios/autentificacion.service';
import { EditproveedorComponent } from './proveedores/editproveedor/editproveedor.component';


@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddProveComponent,
    AddpresComponent,
    LoginComponent,
    PresupuestoComponent,
    EditpressComponent,
    RegistroComponent,
    EditproveedorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //para poder crear formularios
    FormsModule,
    
    //para poder almacenar datos del HTML
    ReactiveFormsModule,
    //Componestes de firebase
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    
  ],
  providers: [
    ProveedoresService,
    PresupuestosService,
    AutentificacionService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
