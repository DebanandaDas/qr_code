import React, { Component } from 'react'
import Report from './Report'
import {verify} from './helper'
import BitImage from './BitImage'
import paths from '../data/paths.json'

export default class SecureReport extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             status:0
        }
    }
    componentDidMount(){
        var roll=new URLSearchParams(window.location.search).get("roll");
        var pass=new URLSearchParams(window.location.search).get("pass");
        if(verify(this.props.mode,roll,pass)){
            this.setState({roll,status:this.props.mode,pass});
        }else{
            if(this.props.mode===2)this.setState({roll,status:29});
            else this.setState({status:99});
        }
    }
    
    render() {
        const {status}=this.state;
        if(status===0) return <h1>Loading</h1>
        else if(status===1)
            return (
                <Report roll={this.state.roll}/>
            )
        else if(status===2)
            return (
                <div>
                    <BitImage id={this.state.roll+"_original"} path={paths[this.state.roll]}/>
                    <BitImage id={this.state.roll+"_qr"} path={this.state.pass}/>
                    <Report roll={this.state.roll}/>
                </div>
            )
        else if(status===29)
        return (
            <div>
                <BitImage id={this.state.roll+"_original"} path={paths[this.state.roll]}/>
                <BitImage id={this.state.roll+"_qr"} path={this.state.pass}/>
                <h1>Error In Fetching Details QRcode image not matched properly</h1>
            </div>
        )
        else return <h1>Error In Fetching Details QRcode Not matched with database</h1>
    }
}
