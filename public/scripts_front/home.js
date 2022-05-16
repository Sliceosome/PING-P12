import * as users from "../scripts_backs/users.js"

$(document).ready(function(){ 
    document.getElementById("submit").onclick = function() {
    var name = document.getElementById("name").value;
    var pwd = document.getElementById("password").value;
    users.connectUser(name,pwd)
    }
});