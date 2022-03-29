import React, { Component } from 'react'
import QRCode from 'qrcode'
 
export default class Code extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             URL: ''
        }
    }
    
    componentDidMount() {  
        const {mode,roll,pass}=this.props;
        QRCode.toDataURL(this.getUrl(mode,roll,pass))
            .then(url => {
                this.setState({URL:url});
            })
            .catch(err => {
                console.error(err)
            });
    }
    getUrl=(mode,roll,pass)=>{
        if(mode===1)
            return `https://verify-nitdgp.web.app/1?roll=${roll}&pass=${pass}`;
        else if(mode===2)
            return `https://verify-nitdgp.web.app/2?roll=${roll}&pass=${pass}`;
        else
            return "https://verify-nitdgp.web.app/?roll="+this.props.roll;
    }
    render() {
        return (
            <div>
                <h2>{this.props.roll} , mode={this.props.mode}</h2>
                <img src={this.state.URL} alt="sample"/>
            </div>
        )
    }
}
