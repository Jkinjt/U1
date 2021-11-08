import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';


@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  presupuestos:any[]=[];
  constructor(
    private presupuestoService:PresupuestosService
  ) {
    
    this.presupuestos=this.presupuestoService.getPresupuestos();
   }


  ngOnInit(): void {
  }

  async delPresupuesto(key:string):Promise<any>{
    let r=await this.presupuestoService.delPresupuesto(key);
    if(r){
      
      this.presupuestos.splice(this.presupuestos.indexOf(key));
      console.log(this.presupuestos);
    }
    

  }
}
