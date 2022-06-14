 var frames = new Array(0);
 var compt1 = 0;
 var compt2 = 0;
 var z1 = 1;
 var z2 = 1;
 
 $(document).ready(function(){
    document.getElementById("search").onclick = function() {
        document.getElementById("title").innerHTML += " : " + document.getElementById("outline").value
        $.post("/request",
        {
        two: document.getElementById("compare").checked,
        outline: document.getElementById("outline").value
        },
        function (data, status) {
        console.log(status);
        var zone1 = document.getElementById("cv1");
        let im = parsingImageData(data);
        drawCanvas(zone1,im,z1)
        if(document.getElementById("compare").checked){
            var zone2 = document.getElementById("cv2");
            drawCanvas(zone2,im,z2)
            $("#canvas2").show();
        }
        $("#canvas1").show();
        $("#title").show();
        $("#grade").show();
        });
    }

    document.getElementById("z+1").onclick = function() {
        z1+=0.25;
        var zone = document.getElementById("cv1");
        drawCanvas(zone,frames[compt1],z1);
    }

    document.getElementById("z-1").onclick = function() {
        if(z1>1){
            z1-=0.25;
        }
        var zone = document.getElementById("cv1");
        drawCanvas(zone,frames[compt1],z1);
    }

    document.getElementById("z+2").onclick = function() {
        z2+=0.25;
        var zone = document.getElementById("cv2");
        drawCanvas(zone,frames[compt2],z2);
    }

    document.getElementById("z-2").onclick = function() {
        if(z2>1){
            z2-=0.25;
        }
        var zone = document.getElementById("cv2");
        drawCanvas(zone,frames[compt2],z2);
    }

    document.getElementById("next1").onclick = function() {
        compt1++;
        z1=1;
        var zone1 = document.getElementById("cv1");
        if(compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt1
                },
                function (data, status) {
                console.log(status);
                var zone1 = document.getElementById("cv1");
                let im = parsingImageData(data);
                drawCanvas(zone1,im,z1)
                });
        }
    }
    
    document.getElementById("graded").onclick = function() {
        var grade = document.getElementById("grd").value;
        document.getElementById("grd").value = "";
        //TODO : send "grade" to the database in the User table, at the row of the current user of the website (the one currently connected), using POST request.
    }

    document.getElementById("previous1").onclick = function() {
        if(compt1 > 0){
            compt1--;
        }
        z1=1;
        var zone1 = document.getElementById("cv1");
        if(compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt1
                },
                function (data, status) {
                console.log(status);
                var zone1 = document.getElementById("cv1");
                let im = parsingImageData(data);
                drawCanvas(zone1,im,z1)
                });
        }
    }

    document.getElementById("next2").onclick = function() {
        compt2++;
        z2=1;
        var zone1 = document.getElementById("cv2");
        if(compt2 < frames.length){
            drawCanvas(zone1,frames[compt2],z2)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt2
                },
                function (data, status) {
                console.log(status);
                let im = parsingImageData(data);
                drawCanvas(zone1,im,z2)
                });
        }
    }

    document.getElementById("previous2").onclick = function() {
        if(compt2 > 0){
            compt2--;
        }
        z2=1;
        var zone1 = document.getElementById("cv2");
        if(compt2 < frames.length){
            drawCanvas(zone1,frames[compt2],z2)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt2
                },
                function (data, status) {
                console.log(status);
                let im = parsingImageData(data);
                drawCanvas(zone1,im,z2)
                });
        }
    }

    function drawCanvas(cv,im,scale){
        var canvas = document.getElementById(cv.id);
        var context = canvas.getContext("2d");
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.putImageData(im, 0, 0,0,0,600,600);
        if(scale !=1){
            context.scale(scale,scale);
            context.drawImage(canvas, 0, 0)
        };
    }

    function parsingImageData(string){
        let width = string[1]+string[2]+string[3]
        width = parseInt(width);
        let height = string[6]+string[7]+string[8]
        height = parseInt(height);
        string = string.substring(15);
        let pix_array = string.split(",");
        pix_array = new Uint8ClampedArray(pix_array);
        console.log(pix_array)
        var im = new ImageData(pix_array,height,width);
        frames.push(im);
        return im
    }
 });

