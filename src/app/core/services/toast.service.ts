import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts = signal<Toast[]>([]);
    private counter = 0;

    show(message: string, type: 'success' | 'error' | 'info' = 'success') {
        const id = this.counter++;
        const toast: Toast = { id, message, type };
        this.toasts.update(t => [...t, toast]);

        setTimeout(() => {
            this.remove(id);
        }, 3000);
    }

    remove(id: number) {
        this.toasts.update(t => t.filter(toast => toast.id !== id));
    }
}
