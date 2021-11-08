import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/User';
import {AngularFireAuth} from '@angular/fire/compat/auth';
//autentificación con google
import {GoogleAuthProvider} from 'firebase/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

public user: User | null = null;
//variable que comprueba si el usuario esta conectado
public ready = false;

public $ready: Observable<boolean> | null = null;
  
  constructor(
    //para conectar con el servicio de firebase
    private authf: AngularFireAuth
  ) { 
    this.checkSSO();
  }
    //conecta con la cuenta de google y devuelve los datos del usuario
  public googleLogin(): Promise<firebase.default.auth.UserCredential> {
    return this.authf.signInWithPopup(new GoogleAuthProvider());
  }
  //metodo para que se desconecte el usuario
  public  logout(): Promise<void> {

    //Metodo devuelve una promesa si el usuario esta conectado y se desconecta
    return new Promise(async (resolve, reject) => {
      if (this.isLogged) {
        try {
        //espera a que el usuario se desconecte para poner el usuario local en nulo
         await this.authf.signOut();
          this.setUser(null);
          this.ready=false;
          console.log(this.ready);

          resolve();
        } catch (err) {
          reject(err);
        }

      }
    })
  }
  //metodo para construir el usuario
  public setUser(u: firebase.default.auth.UserCredential | any | null): void {
    //comprueba que el usuario exista
    if (u && u.user) {
      //Se le pasan los atributos del usuario
      this.user = {
        displayName: u.user?.displayName,
        email: u.user?.email,
        photoURL: u.user?.photoURL,
        uid: u.user?.uid
      };

    } else {
      this.user != null;
    }
  }

  public get isLogged(){
    return this.ready;
  }
  /*
  //metodo para comprobar si el usuario esta registrado
  public get isLogged(): boolean {
    //devuelve falso si el usuario no esta conectado
    return this.user?true : false;
  }
*/
  //metodo para comprobar si el usuario esta en línea
  public checkSSO(): void {
    //Comprueba que el usuario esta conectado
    this.$ready = new Observable((observer) => {
      try {
        this.authf.authState.subscribe((data) => {
          console.log(data);
          this.ready=true;
          if(data!=null){
          //si los datos no son nulos, se carga y devuelve verdadero
          this.setUser({ user: data });
          observer.next(true);
          }else{
            this.ready=false;
            this.setUser(null);            
            observer.next(false);
          }      
                    
          observer.complete();
        });
      } catch {
        this.ready = false;
        console.log("error");
        observer.next(false);
        observer.complete();

      }

    })
    console.log("checkSSO");
    //Se combrueba si esta logueado, devuelve un observable list o un null
  }

}
