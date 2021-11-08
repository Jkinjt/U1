import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { EditpressComponent } from './presupuestos/editpress/editpress.component';
import { PresupuestoComponent } from './presupuestos/presupuesto/presupuesto.component';
import { AddProveComponent } from './proveedores/add-prove/add-prove.component';
import { EditproveedorComponent } from './proveedores/editproveedor/editproveedor.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { GuardService } from './servicios/guard.service';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'inicio',component:InicioComponent,canActivate:[GuardService]},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'proveedores',component:ProveedoresComponent,canActivate:[GuardService]},
  {path:'editProveedor/:key', component:EditproveedorComponent,canActivate:[GuardService]},
  {path:'presupuestos',component:PresupuestoComponent,canActivate:[GuardService]},
  {path:'addpres',component:AddpresComponent,canActivate:[GuardService]},
  {path:'addProve',component:AddProveComponent,canActivate:[GuardService]},
  {path:'editpress/:key',component:EditpressComponent,canActivate:[GuardService]},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
