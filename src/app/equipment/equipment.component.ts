import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {

  calculationResult: any;
  calculationInProgress: boolean = false;
  auxPtoOptions: string[] = ['Alternator', '140A', '190A', '28V', 'Bilgepump', 'On-engine PTOs'];
  oilSystemOptions: string[] = ['Oil replenishment system', 'Diverter valve'];
  fuelSystemOptions: string[] = ['Duplex fuel pre-filter', 'Diverter valve for fuel filter', 'Monitoring fuel leakage'];

  selectedAuxPto!: string;
  selectedOilSystem!: string;
  selectedFuelSystem!: string;


  statuses = [
    {name: 'MS1', status: 'Not started'},
    {name: 'MS2', status: 'Not started'},
    {name: 'MS3', status: 'Not started'},
  ];

  constructor(private http: HttpClient) { }

  setStatus(s : string) {
    this.statuses[0].status = s;
    this.statuses[1].status = s;
    this.statuses[2].status = s;
  }

  startCalculation(): void {
    this.calculationInProgress = true;
    this.setStatus('RUNNING');
    this.http.post('http://localhost:3000/calculate', {
      auxiliaryPto: this.selectedAuxPto,
      oilSystem: this.selectedOilSystem,
      fuelSystem: this.selectedFuelSystem
    })
      .subscribe(
        result => {
          console.log('Calculation result: ', result);
          this.calculationResult = "OK";
          this.setStatus('OK')
          this.calculationInProgress = false;
        },
        error => {
          console.error('There was an error during the calculation!', error);
          this.setStatus('FAILED')
          this.calculationResult = "FAILED";
          this.calculationInProgress = false;
        }
      );
  }
}
