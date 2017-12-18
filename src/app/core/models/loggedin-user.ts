export class LoggedInUser {
    constructor(
        access_token: string,
        username: string,
        fullname: string,
        email: string,
        phone: string,
        avatar: string
    ) {
        this.access_token = access_token;
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.avatar = avatar;
    }
    public id: string;
    public access_token: string;
    public username: string;
    public fullname: string;
    public email: string;
    public phone: string;
    public avatar: string;
}