import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    // { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer' },
    // { id: 3, name: 'Mike Johnson', email: 'mike@example.com', position: 'Manager' }
  ];

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    if(this.employees.length)
      return of(this.employees);
    else {
      return this.http.get<Employee[]>('http://localhost:3000');
    }
  }

  getEmployeeById(id: number): Observable<Employee> {
    const employee = this.employees.find(e => e.id === id);
    return of(employee!);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    employee.id = this.generateEmployeeId();
    this.employees.push(employee);
    return of(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
    }
    return of(employee);
  }

  private generateEmployeeId(): number {
    const maxId = Math.max(...this.employees.map(e => e.id!));
    return maxId + 1;
  }
}
