 $(document).ready(function(){
    document.getElementById("search").onclick = function() {
        $.post("/request",
        {
        number: document.getElementById("compare").checked,
        outline: document.getElementById("outline").value
        },
        function (data, status) {
        console.log(status);
        var zone1 = document.getElementById("cv1");
        var zone2 = document.getElementById("cv2");
        let im = parsingImageData(data);
        drawCanvas(zone1,im,1)
        drawCanvas(zone2,im,1)
        });
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
        return im
    }
 });

