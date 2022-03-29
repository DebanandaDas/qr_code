import React, { Component } from 'react'
import {decodeAlphaNumeric32} from './helper.js'

export default class BitImage extends Component {
    componentDidMount(){
        const {path}=this.props;
        const decodedPath=decodeAlphaNumeric32(path);
        this.drawBitImage(decodedPath);
    }
    
    drawBitImage=decodedPath=>{
        const canvas=document.getElementById(this.props.id+"_canvas");
        var i,ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 80, 80);
        ctx.fillStyle = "black";
        for(i=0;i<40;i++){
            for(var j=0;j<40;j++){
                if(decodedPath[i*40+j]==="0"){
                    ctx.fillRect(2*j,2*i,2,2);
                }
            }
        }
    }

    render() {
        return (
            <div>
                <canvas id={this.props.id+"_canvas"} width="80" height="80" color="blue" style={{border:"5px blue solid"}} ></canvas>
            </div>
        )
    }
}
