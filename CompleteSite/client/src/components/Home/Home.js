import Axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import $ from 'jquery'; 
import './Home.css';

var frames = new Array(0);
var frames2 = new Array(0);


export default function Home() {
    
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
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
    var z1 = 1;

    const search = async e => {
        e.preventDefault();

        try {
            const response = await Axios.post("http://localhost:8080/request",
            {
                two: compare,
                outline: outline
            });
            console.log(response.status);
            setTitle('Outline : '+ outline);
            var zone1 = document.getElementById("cv1");
            let im = parsingImageData(response.data);
            drawCanvas(zone1,im,z1)
            if(compare){
                var zone2 = document.getElementById("cv2");
                drawCanvas(zone2,frames2[0],z1)
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
        console.log(string)
        if(string != "Out of bounds"){
            let im = string.split("end1")
            let ima="data:image/jpg;charset=utf-8;base64, "+ im[0];
            let ima2 = "";
            if(im[1] != ""){
                ima2 = "data:image/jpg;charset=utf-8;base64, "+ im[1];
                frames2.push(ima2);
                console.log(frames2.length)
            }

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
        }else{console.log(string)}
    }

    const zoom1 = () => {
        z1+=0.25;
        var zone1 = document.getElementById("cv1");
        drawCanvas(zone1,frames[compt1],z1);
        if(compare){
            var zone2 = document.getElementById("cv2");
            drawCanvas(zone2,frames2[compt1],z1);
        }
    }

    const unzoom1 = () => {
        if(z1>1){
            z1-=0.25;
        }
        var zone1 = document.getElementById("cv1");
        drawCanvas(zone1,frames[compt1],z1);
        if(compare){
            var zone2 = document.getElementById("cv2");
            drawCanvas(zone2,frames2[compt1],z1);
        }
    }

    const next1 = () => {
        compt1++;
        z1=1;
        var zone1 = document.getElementById("cv1");
        var zone2 = document.getElementById("cv2");
        if(!compare && compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else if(compare && compt1 < Math.max(frames.length, frames2.length)){
            drawCanvas(zone1,frames[compt1],z1)
            drawCanvas(zone2,frames2[compt1],z1)
        }else{
            $.post("http://localhost:8080/unknown_frame",
            {
                number: compt1,
                two: compare,
            },
            function (data, status) {
            console.log(status);
            let im = parsingImageData(data);
            drawCanvas(zone1,frames[compt1],z1);
            //console.log("frames2 : " + frames2.length)
            if(compare){
                drawCanvas(zone2,frames2[compt1],z1);
            }
            });
        }
    }

    const previous1 = () => {
        if(compt1 > 0){
            compt1--;
        }
        z1=1;
        var zone1 = document.getElementById("cv1");
        var zone2 = document.getElementById("cv2");
        if(!compare && compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else if(compare && compt1 < Math.max(frames.length, frames2.length)){
            drawCanvas(zone1,frames[compt1],z1)
            drawCanvas(zone2,frames2[compt1],z1)
        }else{
            $.post("http://localhost:8080/unknown_frame",
            {
                number: compt1,
                two: compare,
            },
            function (data, status) {
            console.log(status);
            parsingImageData(data);
            drawCanvas(zone1,frames[compt1],z1);
            console.log(compare)
            if(!compare){
                drawCanvas(zone2,frames2[compt1],z1);
            }
            });
        }
    }

    const graded = () => {  //TODO
        var note = document.getElementById("notation").value;
        $.post("http://localhost:8080/graded",
            {
                value: note
            },
            function (data, status) {
            console.log(status);
            });
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
            <Button id="previous1" onClick={previous1}>previous frame</Button>
            <Button id="next1" onClick={next1}>next frame</Button>
            <Button id="z+1" onClick={zoom1}>zoom +</Button>
            <Button id="z-1" onClick={unzoom1}>zoom -</Button>
            <div id="display">
                <div id = "canvas1" className={!showcv ? "instructions" : "offscreen"}>
                    <canvas id="cv1" width="600" height="600"></canvas>
                </div>
                <div id = "canvas2" className={!showcv2 ? "instructions" : "offscreen"}>
                    <canvas id="cv2" width="600" height="600"></canvas>
                </div>
            </div>
        </div>
            <div id="marks">
            {showtitle ? (
            <Form.Control
                type="text"
                id="notation"
                required size="25"
                value={grade}
                placeholder = {compare ? "Left or Right for whichever outline is the better" : "Grade the outline on 4 points"}
                onChange={(e) => setGrade(e.target.value)}
            />) : null}
             {showtitle ? (
             <Button id="sendGrade" onClick={graded}>Submit Grade</Button>) : null}
             </div>
        <label id="title" htmlFor="images" value = {title} className={!showtitle ? "instructions" : "offscreen"}></label>
        </div>
}