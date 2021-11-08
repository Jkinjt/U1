import { Component, OnInit, } from '@angular/core';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Proveedor1 } from 'src/model/proveedor1';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prove',
  templateUrl: './add-prove.component.html',
  styleUrls: ['./add-prove.component.css']
})
export class AddProveComponent implements OnInit {
  private proveedor:Proveedor1|null=null;
  public errorMessage: string = "";
  public alertClass: string = "alert alert-success"
  public isValid: boolean = true;
  //comprueba que el campo esta relleno
  validator = this.fb.group({
    nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
    cif: ['', [Validators.required,Validators.pattern('^[0-9\.]*')]],
    direccion: ['', [Validators.required,Validators.pattern('^[a-zA-Z\/]*')]],
    cp: ['', [Validators.required,Validators.pattern('^[0-9\.]*')]],
    localidad: ['', [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
    provincia: ['', [Validators.required]],
    telefono: ['', [Validators.required,Validators.pattern('^[0-9]{9}')]],
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    contacto: ['', [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
  });
  //array que se va a pasar al selector de provincias
  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza']


  constructor(
    private pc: ProveedoresService,
    private fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    
  }
  onSubmit() {
    this.guardarProveedor();
   
  }

  guardarProveedor(){
    console.log(this.validator.status);
    if (this.validator.status == "VALID") {
      this.proveedor ={//se crea el proveedor en formato json
       nombre: this.validator.value.nombre,
       cif: this.validator.value.cif,
       direccion: this.validator.value.direccion,
       cp: this.validator.value.cp,
       localidad: this.validator.value.localidad,
       provincia: this.validator.value.provincia,
       telefono: this.validator.value.telefono,
       email: this.validator.value.email,
       contacto: this.validator.value.contacto};
       console.log(this.proveedor);
      this.pc.nuevoProveedor(this.proveedor);//se guarda
      this.validator.reset();
      this.router.navigate(['/proveedores']);
    }else{

      this.mostrarMensaje("Falta un campo", false);
    }
    console.log(this.validator.touched);
  }
  mostrarMensaje(mensaje: string, isError: boolean) {
    this.errorMessage = mensaje;
    this.isValid = isError;
    if (isError) {
      this.alertClass = "alert alert-danger";

    } else {
      this.alertClass = "alert alert-success";
    }
    setTimeout(() => {
      this.isValid = true;

    }, 2000)
  }
}
