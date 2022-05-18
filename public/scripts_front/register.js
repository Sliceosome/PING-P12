import * as users from "../scripts_backs/users.js"

// class user extends React.Component {        //Afficher l'historique des notations via appel à bdd
//     render() {
//       return (
//         <div className="user">
//           <h1>Account for {this.props.name_}</h1>
//           <div id="historique">
//           <ul>
//             <li>note 1</li>
//             <li>note 2</li>
//             <li>note 3</li>
//           </ul>
//           </div>
//           <div id="process">
//               <input id="processing" type="button" value="Go to Processing page ?"></input>
//           </div>
//         </div>
//       );
//     }
//   }

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
        }else{  //Parcours HashMap utilisateurs dans list users.
            if(users.addUser(name,mail,pwd)){
                alert("You already have an account");
            }else{
                alert("Congratulation on successfully resgistration " + name + " !");
                let content = document.getElementById("account");
                content.style.display = "block";
            }
        }
        
    }

    function validateEmail(email) {     //Indique si la string passée en paramètre est POTENTIELLEMENT une adresse mail (format de la string)
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});