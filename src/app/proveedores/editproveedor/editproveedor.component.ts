import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@firebase/util';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-editproveedor',
  templateUrl: './editproveedor.component.html',
  styleUrls: ['./editproveedor.component.css']
})
export class EditproveedorComponent implements OnInit {
  public errorMessage: string = "";
  public alertClass: string = "alert alert-success"
  public isValid: boolean = true;
  presupuestoForm!: FormGroup;
  proveedor: any;
  key:string="";
  public validator=this.fb.group({
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
    private fb:FormBuilder,
    private proveedoresService:ProveedoresService,
    private router:Router,
    private activateRouter:ActivatedRoute,
    private cdref:ChangeDetectorRef
  ) {
    this.activateRouter.params.subscribe(parametros=>{
      
      this.key=parametros['key'];
      
      (async ()=>{
        try{
          this.proveedor=await this.proveedoresService.getProveedor(this.key);
          this.proveedor.key=this.key;
          this.setProveedor();
          console.log(this.proveedor);
        }catch(err){
          console.log(err+"Fallo al cargar el presupuesto")
        }
      })();
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.savePresupuesto();
  }

  public setProveedor():void{
    console.log("setProveedor"+this.proveedor);
    this.validator=this.fb.group({
      nombre: [this.proveedor?.nombre, [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
      cif: [this.proveedor?.cif, [Validators.required,Validators.pattern('^[0-9\.]*')]],
      direccion: [this.proveedor.direccion, [Validators.required,Validators.pattern('^[a-zA-Z\/]*')]],
      cp: [this.proveedor.cp, [Validators.required,Validators.pattern('^[0-9\.]*')]],
      localidad: [this.proveedor.localidad, [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
      provincia: [this.proveedor.provincia, [Validators.required]],
      telefono: [this.proveedor.telefono, [Validators.required,Validators.pattern('^[0-9]{9}')]],
      email: [this.proveedor.email, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      contacto: [this.proveedor.contacto, [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
    
    });

  }

  public savePresupuesto():void{
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

       this.proveedoresService.editProveedor(this.proveedor,this.key);
        this.router.navigate(['/proveedores']);
    }
  }

}
