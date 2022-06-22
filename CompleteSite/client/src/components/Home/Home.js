import Axios from "axios";
import { useState } from "react";
import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import $ from 'jquery'; 
import './Home.css';

export default function Home( {setToken} ) {
    
    const [title, setTitle] = useState('');
    const [outline, setOutline] = useState('');
    const [compare, setCompare] = useState(false);
    const [showtitle, setShowTitle] = useState(false);
    const [showcv, setShowCv] = useState(false);
    const [showcv2, setShowCv2] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setToken(false);
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

    var frames = new Array(0);
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
            console.log(response.data);
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
        context.putImageData(im, 0, 0,0,0,600,600);
        if(scale !==1){
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
        z1+=0.25;
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

    const next2 = () => {
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

    const previous1 = () => {
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

    const previous2 = () => {
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

    return <div>
        <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu List
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
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
            <label id="title" for="images" value = {title} className={!showtitle ? "instructions" : "offscreen"}></label>
            <div id = "canvas1" className={!showcv ? "instructions" : "offscreen"}>
                <Button id="previous1" onSubmit={previous1}>previous frame</Button>
                <Button id="next1" onSubmit={next1}>next frame</Button>
                <Button id="z+1" onSubmit={zoom1}>zoom +</Button>
                <Button id="z-1" onSubmit={unzoom1}>zoom -</Button>
                <canvas id="cv1" width="600" height="600"></canvas>
            </div>
            <div id = "canvas2" className={!showcv2 ? "instructions" : "offscreen"}>
                <Button id="previous2" onSubmit={previous2}>previous frame</Button>
                <Button id="next2" onSubmit={next2}>next frame</Button>
                <Button id="z+1" onSubmit={zoom2}>zoom +</Button>
                <Button id="z-1" onSubmit={unzoom2}>zoom -</Button>
                <canvas id="cv2" width="600" height="600"></canvas>
            </div>
        </div>
        </div>
}