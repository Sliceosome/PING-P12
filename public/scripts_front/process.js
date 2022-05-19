 $(document).ready(function(){
    document.getElementById("toto").onclick = function() {
        $.post("/request",
        {
        name: "viSion",
        designation: "Professional gamer"
        },
        function (data, status) {
        console.log(data);
        });
    }
 });

