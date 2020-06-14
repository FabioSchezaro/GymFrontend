import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll() {
    return this.http.get<Role[]>(`${environment.apiUrl}role`, this.httpOptions);
  }
}
