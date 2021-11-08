import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { async } from '@firebase/util';

import { throwError } from 'rxjs';
import { Presupuesto } from 'src/model/presupuesto';


@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  constructor(
    private db:AngularFireDatabase
  ) { }

  addPress(presupuesto:Presupuesto){
    return this.db.database.ref().child("presupuestos").push(presupuesto);
        
  }

  changePress(presupuesto:Presupuesto,key:string){
    this.db.database.ref().child("presupuestos").child(key).update(presupuesto);
  }

  getPresupuestos():any{
    let result:Presupuesto[]=[];
    this.db.database.ref().child("presupuestos").get().then((data)=>{
      //para almacenar los valores traidos de firebase
      const presupuestos=data.val();
      for(let presupuesto in presupuestos){
        result.push({$key: presupuesto, ...presupuestos[presupuesto] });
        
      }
    });
    
    return result;
  }
  
  async getPresupuesto(key: string) {
    try {
     
      let tmp = await this.db.database.ref().child("presupuestos").child(key).get();
      
      let result: Presupuesto ={$key:key, ...tmp.val()};
      
      return result;
    } catch (err) {
      throwError(err+"Fallo al cargar el presupuesto");
      return null;
    }
    
  }
/*
 getPresupuesto(key:string):Promise<firebase.default.database.DataSnapshot>{
    return this.db.database.ref().child("presupuesto").child(key).get()   
  }
 */

  //se devuelve promesa
  delPresupuesto(key:string): Promise<boolean>{

    //se crea la promesa con un async
    return new Promise(async(resolve,rejects)=>{
     try {
      const confirmacion=confirm("¿Estas seguro?");
    if(confirmacion){      
      //se pone el await para que se espere a que se resuelva
       await this.db.database.ref().child("presupuestos").child(key).remove();
       //termina la función flecha y devuelve el true o false
       resolve(true);      
    }else {
      //si no se acepta el borrado devuelve false
      resolve(false);
    }
  }catch(err){
    rejects("no se ha borrado");
  }
    });
    
  }
}
