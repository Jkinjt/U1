import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  conect:boolean=true;
  constructor(
    public authS:AuthService,
    public autentification:AutentificacionService,
    private route:Router
  ) { 

    if (!this.authS.ready) {
      this.authS.checkSSO();
    }
  }

  ngOnInit(): void {
    if(this.authS.isLogged){
      this.conect=this.authS.isLogged;
      this.authS.$ready?.subscribe((data) => {
  
      });

    }else if(this.autentification.conect){
      this.conect=true;
    }
  }

  public async logout() {
    if(this.authS.isLogged){
        try {
          //se pone await para que el hilo se espere hasta que se ejecute la promesa
          await this.authS.logout();
          this.route.navigate(['/login']);
          this.conect = false;
    
        } catch (err) {
          alert(err);
          this.conect = this.authS.isLogged;
        }

      }else if(this.autentification.conect){
        try{
          await this.autentification.sigOut();
          this.conect=false;

        }catch(err){
          alert(err);
          this.conect=this.autentification.conect;
          
        }
      }
  }

}
