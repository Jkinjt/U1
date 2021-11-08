import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from 
'@angular/forms'
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  validator=this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
      ]
      ],
      password: ['', [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), 
      Validators.minLength(6)
      ]
      ]
  });  

  constructor(
   
    private fb:FormBuilder,
    public authS:AuthService,
    private router:Router,
    private autentification:AutentificacionService
  ) { 
    
  }

  ngOnInit(): void {
  
      

    this.authS.$ready?.subscribe((data)=>{
      if(data){
        //si el usuario esta conectado lo manda a la página de inicio
        this.router.navigate(['/inicio']);
      }
    });
  }
  public login(){
    this.autentification.sigIn(this.validator.value.email,this.validator.value.password);
    this.router.navigate(['/inicio']);
    
  }
  
    

  loginGoogle(){
    this.authS.googleLogin()
    .then((data)=>{
      this.authS.setUser(data);
      //compruba si el usuario esta conectado
      if(this.authS.isLogged){
        //te manda a la pagina que especifiques
        this.router.navigate(['/inicio']);
        
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }
}
