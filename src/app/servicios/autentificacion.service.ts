import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  conect:boolean=false;
  constructor(
    public afAuth:AngularFireAuth,
    private ruote:Router
  ) { }

  //para registrarrse con correo en firebase
  public signUp(email:string,password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      window.alert("Te has registrado con exito");
      console.log(result.user);
      this.conect=true;
      console.log(this.conect);
    }).catch((error)=>{
      window.alert(error.message);
    });
    
  }

  public sigIn(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
      window.alert("Te has conectado");
      this.ruote.navigate(['/inicio']);
      this.conect=true;
    }).catch((error)=>{
      window.alert(error.message);
      this.conect=false;
    })
  }

  public sigOut(){
    return this.afAuth.signOut()
    .then((result)=>{
      this.ruote.navigate(['/login']);
      this.conect=false;
      console.log(this.conect);
    })
  }

  public get isLogged(): boolean {
    //devuelve falso si el usuario no esta conectado
    return this.conect;
  }

}
