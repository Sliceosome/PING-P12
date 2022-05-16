$(document).ready(function(){ 
    document.getElementById("submit").onclick = function() {
        var name = document.getElementById("name").value;
        var pwd = document.getElementById("password").value;
        var cpwd = document.getElementById("c-password").value;
        var mail = document.getElementById("mail").value;
        var res = validateEmail(mail);
        if(!res || !(pwd == cpwd)){
            if(!res && !(pwd == cpwd)){
                alert("Invalid email and differents password on confirmation");
            }else if(res){
                alert("Diffferents password on confirmation");
            }else{
                alert("Invalid email");
            }
        }
        //Parcours HashMap utilisateurs dans list users.
    }

    function validateEmail(email) {     //Indique si la string passée en paramètre est POTENTIELLEMENT une adresse mail (format de la string)
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});