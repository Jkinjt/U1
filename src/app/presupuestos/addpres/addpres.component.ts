import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Presupuesto } from 'src/model/presupuesto';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {
  public errorMessage: string = "";
  public alertClass: string = "alert alert-success"
  public isValid: boolean = true;
  private presupuesto:Presupuesto|null=null;
 public validator=this.pf.group({
    proveedor: ['', [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
    fecha: ['', [Validators.required]],
    concepto: ['', [Validators.required,Validators.pattern('^[a-zA-Z]*')]],
    base: ['', [Validators.required,Validators.pattern('^[0-9\,]*')]],
    tipo: ['', [Validators.required,Validators.pattern('^[a-zA-Z]*')]],
    iva: ['', [Validators.required,Validators.pattern('^[0-9]*')]],
    total: ['', [Validators.required,Validators.pattern('^[0-9\,]*')]],
   
  })
  
  constructor(
    
    private pf:FormBuilder,
    private presupuestosService:PresupuestosService
    ) { 
     
    }

  ngOnInit(): void {
  }
  onSubmit(){
   this.savePresupuesto();
   
  }

  savePresupuesto(){
    
    console.log(this.validator.status);
    if(this.validator.status=="VALID"){
      this.presupuesto= {
        proveedor:this.validator.value.proveedor,
        fecha:this.validator.value.fecha,
        concepto:this.validator.value.concepto,
        base:this.validator.value.base,
        tipo:this.validator.value.tipo,
        iva:this.validator.value.iva,
        total:this.validator.value.total
      };
      
      console.log(this.presupuesto);
      this.validator.reset();
      this.presupuestosService.addPress(this.presupuesto);

    }else{
      this.mostrarMensaje("fallo",true);
      
    }
    
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
