 var frames = new Array(0);
 var compt1 = 0;
 var compt2 = 0;
 
 $(document).ready(function(){
    document.getElementById("search").onclick = function() {
        $.post("/request",
        {
        two: document.getElementById("compare").checked,
        outline: document.getElementById("outline").value
        },
        function (data, status) {
        console.log(status);
        var zone1 = document.getElementById("cv1");
        let im = parsingImageData(data);
        drawCanvas(zone1,im,1)
        if(document.getElementById("compare").checked){
            var zone2 = document.getElementById("cv2");
            drawCanvas(zone2,im,1)
            $("#canvas2").show();
        }
        $("#canvas1").show();
        $("#title").show();
        });
    }
    document.getElementById("next1").onclick = function() {
        compt1++;
        var zone1 = document.getElementById("cv1");
        if(compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],1)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt1
                },
                function (data, status) {
                console.log(status);
                var zone1 = document.getElementById("cv1");
                let im = parsingImageData(data);
                drawCanvas(zone1,im,1)
                });
        }
    }

    document.getElementById("previous1").onclick = function() {
        if(compt1 > 0){
            compt1--;
        }
        var zone1 = document.getElementById("cv1");
        if(compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],1)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt1
                },
                function (data, status) {
                console.log(status);
                var zone1 = document.getElementById("cv1");
                let im = parsingImageData(data);
                drawCanvas(zone1,im,1)
                });
        }
    }

    document.getElementById("next2").onclick = function() {
        compt2++;
        var zone1 = document.getElementById("cv2");
        if(compt2 < frames.length){
            drawCanvas(zone1,frames[compt2],1)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt2
                },
                function (data, status) {
                console.log(status);
                let im = parsingImageData(data);
                drawCanvas(zone1,im,1)
                });
        }
    }

    document.getElementById("previous2").onclick = function() {
        if(compt2 > 0){
            compt2--;
        }
        var zone1 = document.getElementById("cv2");
        if(compt2 < frames.length){
            drawCanvas(zone1,frames[compt2],1)
        }else{
            $.post("/unknown_frame",
                {
                    number: compt2
                },
                function (data, status) {
                console.log(status);
                let im = parsingImageData(data);
                drawCanvas(zone1,im,1)
                });
        }
    }

    function drawCanvas(cv,im,scale){
        console.log(im)
        var canvas = document.getElementById(cv.id);
        var context = canvas.getContext("2d");
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

