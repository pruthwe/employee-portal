import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: null,
    name: '',
    email: '',
    position: ''
  };

  @Output() employeeAdded: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.employee)
      .subscribe(newEmployee => {
        this.employeeAdded.emit(newEmployee);
        this.resetForm();
      });
  }

  resetForm(): void {
    this.employee = {
      id: null,
      name: '',
      email: '',
      position: ''
    };
  }
}
