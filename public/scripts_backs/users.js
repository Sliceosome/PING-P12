import { Individual } from "./Individual.js";
var tab=new Array();

export function getUsers(){
    return tab;
}

export function addUser(name,email,password){
    let P1 = new Individual(name,email,password);
    let taille = tab.length;
    let res = tab.filter(elmt => P1.comparatorIndividual(elmt.name,elmt.email,elmt.password))
    if(res.length == 0){
        tab.push(P1);
    }
    console.log("nb users = " + tab.length);
    return taille==tab.length;
}

export function connectUser(name,password){
    let res = tab.filter(elmt => elmt.name == name && elmt.password == password);
    if(res.length != 0){
        console.log("Successful connexion");
    }else{
        console.log("You don't have any account");
    }
    console.log("nb users = " + tab.length);
    return res.length == 0;
}
