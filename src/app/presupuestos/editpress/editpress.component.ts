import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editpress',
  templateUrl: './editpress.component.html',
  styleUrls: ['./editpress.component.css']
})
export class EditpressComponent implements OnInit {
  public errorMessage: string = "";
  public alertClass: string = "alert alert-success"
  public isValid: boolean = true;
  presupuestoForm!: FormGroup;
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  key: string = "";
  public validator=this.fb.group({
    proveedor: ['', [Validators.required,Validators.pattern('^[a-zA-Z\ ]*')]],
    fecha: ['', [Validators.required]],
    concepto: ['', [Validators.required,Validators.pattern('^[a-zA-Z]*')]],
    base: ['', [Validators.required,Validators.pattern('^[0-9\,]*')]],
    tipo: ['', [Validators.required,Validators.pattern('^[a-zA-Z]*')]],
    iva: ['', [Validators.required,Validators.pattern('^[0-9]*')]],
    total: ['', [Validators.required,Validators.pattern('^[0-9\,]*')]],
   
  });
  
  constructor(
    private fb: FormBuilder,
    //private fc:FormControl,
    private presupuestoService: PresupuestosService,
    private router: Router,
    //recupera información de la pagina anterior
    private activatedRouter: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) { 
    
    this.activatedRouter.params.subscribe(parametros => {
      
      this.key = parametros['key'];      
      (async ()=>{
        try{
        this.presupuesto=await this.presupuestoService.getPresupuesto(this.key);
        this.presupuesto.$key=this.key;
        this.setPresupuesto();
        }catch(err){
          console.log("ERRRRRRR"+err)
        }
        
      })();
    });
    
      
  }


  ngOnInit(): void {
  }

  onSubmit(){
    this.savePresupuesto();
  }
  onChanges(): void {
    this.validator.valueChanges.subscribe(valor=>{
      this.base=this.validator.value.base;
      this.tipo=this.validator.value.tipo;
      this.iva=this.validator.value.iva;
      this.total=this.validator.value.total;

    });
    }
    
    setPresupuesto(){
      this.validator =  this.fb.group({
        proveedor: [this.presupuesto?.proveedor, [Validators.required,Validators.minLength(4)]],
        fecha: [this.presupuesto?.fecha, Validators.required],
        concepto: [this.presupuesto?.concepto, [Validators.required,]],
        base: [this.presupuesto?.base, [Validators.required,Validators.min(0)]],
        tipo: [this.presupuesto?.tipo, Validators.required],
        iva: [this.presupuesto?.iva,Validators.required],
        total: [this.presupuesto?.total,Validators.required]
      });
      this.onChanges();
      
      //para que Angular detecte los cambios en las variables y no de error NG0100: ExpressionChangedAfterItHasBeenCheckedError
      this.cdref.detectChanges();
    }

    savePresupuesto(){
    
      console.log(this.validator.status);
      console.log(this.presupuesto);
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
        
        this.presupuestoService.changePress(this.presupuesto,this.key);
        this.router.navigate(['/presupuestos']);
        
  
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
