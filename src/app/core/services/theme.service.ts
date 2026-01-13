import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    darkMode = signal<boolean>(this.loadTheme());

    constructor() {
        effect(() => {
            if (this.darkMode()) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    toggleTheme() {
        this.darkMode.update(d => !d);
    }

    private loadTheme(): boolean {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    }
}
