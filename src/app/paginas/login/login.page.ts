import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async testConnection() {
    const loading = await this.loadingController.create({
      message: 'Probando conexión...'
    });
    await loading.present();

    this.authService.testConnection().subscribe({
      next: (response) => {
        loading.dismiss();
        this.showAlert('Conexión Exitosa', `Servidor: ${response.server_info}\nTimestamp: ${response.timestamp}`);
      },
      error: (error) => {
        loading.dismiss();
        this.showAlert('Error de Conexión', error.message);
      }
    });
  }

  async login() {
    if (!this.usuario || !this.contrasena) {
      this.showAlert('Error', 'Por favor completa todos los campos');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();

    this.authService.login({
      usuario: this.usuario,
      contrasena: this.contrasena
    }).subscribe({
      next: (user) => {
        loading.dismiss();
        // Guardar información del usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Mostrar mensaje de bienvenida
        this.showAlert('¡Bienvenido!', `Hola ${user.usuario}, has iniciado sesión correctamente.`);
        // Navegar a la página de inicio
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        loading.dismiss();
        this.showAlert('Error de Login', error.message);
      }
    });
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
