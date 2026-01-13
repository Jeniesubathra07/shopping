import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  themeService = inject(ThemeService);
  notificationsEnabled = signal(true);
  emailUpdates = signal(true);

  saveSettings() {
    // Mock save
    alert('Settings saved successfully!');
  }
}
