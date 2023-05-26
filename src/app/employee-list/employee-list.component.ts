import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements AfterViewInit {
  @Input() selectedEmployee?: Employee; // Input property to receive the selected employee from the parent component
  @Output() employeeSelected: EventEmitter<Employee> = new EventEmitter<Employee>(); // Output event to emit the selected employee to the parent component

  employees: Employee[]=[];

  constructor(private employeeService: EmployeeService) { }
  ngAfterViewInit(): void {
    this.getEmployees(); 
  }


  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.employeeSelected.emit(employee);
  }
}
