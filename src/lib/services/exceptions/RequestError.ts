export class RequestError {
    message!: string;
    status!: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }

    geterrpr() {
        return this
    }
}