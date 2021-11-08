import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  userData:any;
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
    public autentification:AutentificacionService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    
    if(this.validator.status){
      this.autentification.signUp(this.validator.value.email,this.validator.value.password);
      this.router.navigate(['/inicio']);
    }
  }  
}
