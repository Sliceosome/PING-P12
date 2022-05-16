export class Individual{
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
    comparatorIndividual(name,email,password){
        return(this.name == name && this.email == email && this.password == password);
    }
}