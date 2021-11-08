import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Proveedor1 } from 'src/model/proveedor1';
import {AngularFireDatabase} from '@angular/fire/compat/database'
import { getDatabase, ref, child, get } from "firebase/database";

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  public proveedores:any[]=[];
  constructor(
    private proveedoresService:ProveedoresService,
    public authS:AuthService,
   
    ) { }

  ngOnInit(): void {
    //comprueba que el usuario este conectado
    if (!this.authS.ready) {
      this.authS.checkSSO();

    }
    this.proveedores=this.proveedoresService.getProveedores();
    console.log(this.proveedores);
  }
  nuevoProveedor(p:Proveedor1){

    this.proveedoresService.nuevoProveedor(p);
    this.proveedores.push(p);
  }
  getProveedores():Proveedor1[]{
    return this.proveedores;
  }
  async delPresupuesto(key:string):Promise<any>{
    let r=await this.proveedoresService.delProveedor(key);
    if(r){
      
      this.proveedores.splice(this.proveedores.indexOf(key));
      console.log(this.proveedores);
    }
    

  }

  
  
  

}
