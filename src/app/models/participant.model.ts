export class Participant{
    public name: string;
    public recipient: string;
    public email: string;
    constructor(name: string, recipient: string, email: string){
        this.name = name;
        this.recipient = recipient;
        this.email = email;
    }
}