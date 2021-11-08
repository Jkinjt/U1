import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { throwError } from 'rxjs';

import { Proveedor1 } from 'src/model/proveedor1';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
 
 /*
  private proveedor:Proveedor1=new Proveedor1('Telefónica',
  'B12345678', 
  'Paseo de la Castellana, 100', 
  '28.010', 
  'Madrid', 
  'Madrid', 
  911111111, 
  'info@telefonica.com', 
  'Juan Pére');
  private proveedor2:Proveedor1=new Proveedor1(
    'Iberdrola', 
    'B87654321', 
    'Príncipe de Vergara, 200', 
    '28.015', 
    'Madrid', 
    'Madrid', 
    922222222, 
    'info@iberdrola.com', 
    'Laura Martínez'
  );
 */
  proveedores!:[
    {
    nombre:'Telefónica'
    cif: 'B12345678', 
    direccion: 'Paseo de la Castellana, 100', 
    cp: '28.010', 
    localidad: 'Madrid', 
    provincia: 'Madrid', 
    telefono: 911111111, 
    email: 'info@telefonica.com', 
    contacto: 'Juan Pére'
  },
  {
    nombre: 'Iberdrola', 
    cif: 'B87654321', 
    direccion: 'Príncipe de Vergara, 200', 
    cp: '28.015', 
    localidad: 'Madrid', 
    provincia: 'Madrid', 
    telefono: 922222222, 
    email: 'info@iberdrola.com', 
    contacto: 'Laura Martínez'
  }
]
  constructor(
    private db:AngularFireDatabase
  ) { 
    /*
    this.listaProveedores.push(this.proveedor);
   this.listaProveedores.push(this.proveedor2);
   */
  }
  nuevoProveedor(p:Proveedor1){
    this.db.database.ref().child("proveedores").push(p);
    


  }


  public getProveedores():any{
    let result:Proveedor1[]=[];
    this.db.database.ref().child("proveedores").get().then((data)=>{
      //para almacenar los valores traidos de firebase
      const presupuestos=data.val();
      for(let presupuesto in presupuestos){
        result.push({$key: presupuesto, ...presupuestos[presupuesto] });
        
      }
    });
    
    return result;

    
  }
  async getProveedor(key: string) {
    try {
      console.log("getproveedor"+key);
      let tmp = await this.db.database.ref().child("proveedores").child(key).get();
      
      let result: Proveedor1 ={$key:key, ...tmp.val()};
      console.log(result);
      
      return result;
    } catch (err) {
      throwError(err+"Fallo al cargar el presupuesto");
      return null;
    }
    
  }
 

  public delProveedor(key:string):Promise<boolean>{
    return new Promise(async (resolve,rejects)=>{
      try{
        await this.db.database.ref().child("proveedores").child(key).remove();
        resolve(true);
      }catch(err){
        resolve(false);
        rejects("no se ha borrado");
      }
    });
  }

  public editProveedor(p:Proveedor1,key:string):void{
    this.db.database.ref().child("proveedores").child(key).update(p);
  }
  
}
