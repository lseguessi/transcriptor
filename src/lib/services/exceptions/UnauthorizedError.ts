import Router from 'next/router'
import { clearSession } from '../storage/app-storage';
export class UnauthorizedError {
    message!: string;
    status!: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
        this.redirectLogin();
    }

    redirectLogin() {
        clearSession();
        Router.push("/login")
    }
}