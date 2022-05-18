import * as users from "../scripts_backs/users.js"

$(document).ready(function(){ 
    document.getElementById("submit").onclick = function() {
    var name = document.getElementById("name").value;
    var pwd = document.getElementById("password").value;
    let test = users.connectUser(name,pwd);
    if(!test){
        alert("Congratulation on successfully connexion " + name + " !");
        let content = document.getElementById("account");
        content.style.display = "block";
    }else{
        console.log("You don't have any account, please register on the register page");
    }
    }
});