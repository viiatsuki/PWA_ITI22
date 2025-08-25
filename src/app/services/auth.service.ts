import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

export interface User {
	ID: number;
	usuario: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly baseUrl = environment.apiBaseUrl;
	private currentUserSubject = new BehaviorSubject<User | null>(null);
	public currentUser$ = this.currentUserSubject.asObservable();

	constructor(private http: HttpClient) {
		// Verificar si hay un usuario guardado al inicializar el servicio
		this.loadCurrentUser();
	}

	login(payload: LoginRequest): Observable<{ ID: number; usuario: string }> {
		return this.http
			.post<LoginResponse>(`${this.baseUrl}/login.php`, payload)
			.pipe(
				map((res) => {
					if (!res.ok || !res.user) {
						throw new Error(res.error || 'Credenciales inválidas');
					}
					return res.user;
				}),
				catchError(this.handleError)
			);
	}

	// Método para probar la conexión
	testConnection(): Observable<any> {
		return this.http.get(`${this.baseUrl}/test-connection.php`)
			.pipe(catchError(this.handleError));
	}

	// Verificar si el usuario está logueado
	isLoggedIn(): boolean {
		return this.currentUserSubject.value !== null;
	}

	// Obtener el usuario actual
	getCurrentUser(): User | null {
		return this.currentUserSubject.value;
	}

	// Cargar usuario del localStorage
	private loadCurrentUser(): void {
		const userStr = localStorage.getItem('currentUser');
		if (userStr) {
			try {
				const user = JSON.parse(userStr);
				this.currentUserSubject.next(user);
			} catch (error) {
				console.error('Error parsing user from localStorage:', error);
				this.logout();
			}
		}
	}

	// Cerrar sesión
	logout(): void {
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}

	private handleError(error: HttpErrorResponse) {
		let errorMessage = 'Error desconocido';
		
		if (error.error instanceof ErrorEvent) {
			// Error del lado del cliente
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// Error del lado del servidor
			if (error.status === 0) {
				errorMessage = 'No se pudo conectar al servidor. Verifica que XAMPP esté ejecutándose.';
			} else if (error.status === 404) {
				errorMessage = 'API no encontrada. Verifica la URL del endpoint.';
			} else if (error.status === 500) {
				errorMessage = 'Error interno del servidor.';
			} else {
				errorMessage = `Error ${error.status}: ${error.message}`;
			}
		}
		
		console.error('Error en AuthService:', errorMessage);
		return throwError(() => new Error(errorMessage));
	}
}
