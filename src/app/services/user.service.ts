import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}user`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}user/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}user/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}user`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}user/${id}`);
    }
}
