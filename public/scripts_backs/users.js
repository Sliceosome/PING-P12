import { Individual } from "./Individual.js";
export var tab=new Array();

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
    console.log("nb users = " + tab.length);
    return res.length == 0;
}
