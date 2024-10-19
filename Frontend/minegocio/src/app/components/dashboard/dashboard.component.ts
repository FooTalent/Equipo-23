import { Component, NgModule } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from '../../data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  view: [number, number] = [580, 290];
  

  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
    console.log(this.view)
}

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  showYAxisLabel = true;


  colorScheme = [
    { name: 'Ene', value: '#e5e504' },   
    { name: 'Feb', value: '#ffffff' },   
    { name: 'Mar', value: '#5d3cba' },   
    { name: 'Abr', value: '#e5e504' },   
    { name: 'May', value: '#ffffff' },   
    { name: 'Jun', value: '#5d3cba' },   
    { name: 'Jul', value: '#e5e504' },   
    { name: 'Agos', value: '#ffffff'},   
    { name: 'Sep', value: '#5d3cba' },   
    { name: 'Oct', value: '#e5e504' },  
    { name: 'Nov', value: '#ffffff' },   
    { name: 'Dic', value: '#5d3cba' },   
  ];

  constructor() {
    Object.assign(this, { single })
  }

  onSelect (event: Event) {
    console.log(event);
  } 
  public single = [];

  formatPercent(value: number): string {
    return (value / 100).toLocaleString('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
  formatNumberAsPercent(value: number): string {
    return Math.round(value) + '%'; 
  }
}
