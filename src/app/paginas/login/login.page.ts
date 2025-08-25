import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class LoginPage {
  isSubmitting = false;
  errorMessage = '';

  form = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    const { usuario, contrasena } = this.form.value as { usuario: string; contrasena: string };
    this.auth.login({ usuario, contrasena }).subscribe({
      next: (user) => {
        localStorage.setItem('sessionUser', JSON.stringify(user));
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      error: (err) => {
        this.errorMessage = err?.message || 'Error de autenticación';
        this.isSubmitting = false;
      },
    });
  }
}
