import Axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import $ from 'jquery'; 
import './Home.css';

var frames = new Array(0);

export default function Home() {
    
    const [title, setTitle] = useState('');
    const [outline, setOutline] = useState('');
    const [compare, setCompare] = useState(false);
    const [showtitle, setShowTitle] = useState(false);
    const [showcv, setShowCv] = useState(false);
    const [showcv2, setShowCv2] = useState(false);

    useEffect(() => {    // Met à jour   
        document.getElementById("images").className = showtitle;},[showtitle]);
    useEffect(() => {    // Met à jour   
        document.getElementById("canvas1").className = showcv;},[showcv]);
    useEffect(() => {    // Met à jour   
        document.getElementById("canvas2").className = showcv2;},[showcv2]);
    

    var compt1 = 0;
    var compt2 = 0;
    var z1 = 1;
    var z2 = 1;

    const search = async e => {
        e.preventDefault();

        try {
            const response = await Axios.post("http://localhost:8080/request",
            {
                two: compare,
                outline: outline
            });
            console.log(response.status);
            //let im="data:image/jpg;charset=utf-8;base64, "+ response.data;
            setTitle('Outline : '+ outline);
            var zone1 = document.getElementById("cv1");
            let im = parsingImageData(response.data);
            drawCanvas(zone1,im,z1)
            if(compare){
                var zone2 = document.getElementById("cv2");
                drawCanvas(zone2,im,z2)
                setShowCv2(true);
            }
            setShowTitle(true);
            setShowCv(true);
        }
        catch (e) {
            console.log('Error '+e);
        }
    }

    function drawCanvas(cv,im,scale){
        var canvas = document.getElementById(cv.id);
        var context = canvas.getContext("2d");
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //context.putImageData(im, 0, 0,0,0,600,600);
        var image = new Image();
        image.src = im
        image.onload = function() {
            context.drawImage(image, 0, 0);
        };
        if(scale !==1){
            context.scale(scale,scale);
            context.drawImage(canvas, 0, 0)
        };
    }

    function parsingImageData(string){
        let ima="data:image/jpg;charset=utf-8;base64, "+ string;

        // let width = string[1]+string[2]+string[3]
        // width = parseInt(width);
        // let height = string[6]+string[7]+string[8]
        // height = parseInt(height);
        // string = string.substring(15);
        // let pix_array = string.split(",");
        // pix_array = new Uint8ClampedArray(pix_array);
        // //console.log(pix_array)
        // var im = new ImageData(pix_array,height,width);
        frames.push(ima);
        return ima
    }

    const zoom1 = () => {
        z1+=0.25;
        var zone = document.getElementById("cv1");
        drawCanvas(zone,frames[compt1],z1);
    }

    const unzoom1 = () => {
        if(z1>1){
            z1-=0.25;
        }
        var zone = document.getElementById("cv1");
        drawCanvas(zone,frames[compt1],z1);
    }

    const zoom2 = () => {
        z2+=0.25;
        var zone = document.getElementById("cv2");
        drawCanvas(zone,frames[compt2],z2);
    }

    const unzoom2 = () => {
        if(z2>1){
            z2-=0.25;
        }
        var zone = document.getElementById("cv2");
        drawCanvas(zone,frames[compt2],z2);
    }

    const next1 = () => {
        compt1++;
        z1=1;
        var zone1 = document.getElementById("cv1");
        if(compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else{
            $.post("http://localhost:8080/unknown_frame",
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

    const next2 = () => {
        compt2++;
        z2=1;
        var zone1 = document.getElementById("cv2");
        if(compt2 < frames.length){
            drawCanvas(zone1,frames[compt2],z2)
        }else{
            $.post("http://localhost:8080/unknown_frame",
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

    const previous1 = () => {
        if(compt1 > 0){
            compt1--;
        }
        z1=1;
        var zone1 = document.getElementById("cv1");
        if(compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else{
            $.post("http://localhost:8080/unknown_frame",
                {
                    number: compt1
                },
                function (data, status) {
                console.log(status);
                let im = parsingImageData(data);
                drawCanvas(zone1,im,z1)
                });
        }
    }

    const previous2 = () => {
        if(compt2 > 0){
            compt2--;
        }
        z2=1;
        var zone1 = document.getElementById("cv2");
        if(compt2 < frames.length){
            drawCanvas(zone1,frames[compt2],z2)
        }else{
            $.post("http://localhost:8080/unknown_frame",
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

    return <div>
        <Form onSubmit={search}>
            <Form.Group size="lg" controlId="name">
            <Form.Label>Outline to process : </Form.Label>
            <Form.Control
                type="text"
                id="outline"
                required size="15"
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
            />
            <Form.Control
                type="checkbox"
                label="Compare"
                value={compare}
                onChange={(e) => setCompare(!compare)}
            />
            </Form.Group>
            <Button size="lg" type="submit" id="search">
                Activate database : 
            </Button>
        </Form>
        <div id="images" className={!showtitle ? "instructions" : "offscreen"}>
            <div id = "canvas1" className={!showcv ? "instructions" : "offscreen"}>
                <Button id="previous1" onClick={previous1}>previous frame</Button>
                <Button id="next1" onClick={next1}>next frame</Button>
                <Button id="z+1" onClick={zoom1}>zoom +</Button>
                <Button id="z-1" onClick={unzoom1}>zoom -</Button>
                <canvas id="cv1" width="600" height="600"></canvas>
            </div>
            <div id = "canvas2" className={!showcv2 ? "instructions" : "offscreen"}>
                <Button id="previous2" onClick={previous2}>previous frame</Button>
                <Button id="next2" onClick={next2}>next frame</Button>
                <Button id="z+1" onClick={zoom2}>zoom +</Button>
                <Button id="z-1" onClick={unzoom2}>zoom -</Button>
                <canvas id="cv2" width="600" height="600"></canvas>
            </div>
        </div>
        <label id="title" htmlFor="images" value = {title} className={!showtitle ? "instructions" : "offscreen"}></label>
        </div>
}