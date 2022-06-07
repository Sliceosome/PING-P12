 $(document).ready(function(){
    document.getElementById("toto").onclick = function() {
        $.post("/request",
        {
        name: "viSion",
        designation: "Professional gamer"
        },
        function (data, status) {
        console.log(status);
        var zone = document.getElementById("gneu");
        //zone.append(data.toString());
        //var im = new ImageData(data[0][1],data[0][2])
        //im.data = data
        //zone.append(im);
        console.log(data[1])
        });
    }
 });

