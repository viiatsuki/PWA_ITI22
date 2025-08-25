import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface LoginRequest {
	usuario: string;
	contrasena: string;
}

export interface LoginResponse {
	ok: boolean;
	error?: string;
	user?: { ID: number; usuario: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly baseUrl = environment.apiBaseUrl;

	constructor(private http: HttpClient) {}

	login(payload: LoginRequest): Observable<{ ID: number; usuario: string }> {
		return this.http
			.post<LoginResponse>(`${this.baseUrl}/login.php`, payload)
			.pipe(
				map((res) => {
					if (!res.ok || !res.user) {
						throw new Error(res.error || 'Credenciales inválidas');
					}
					return res.user;
				})
			);
	}
}
