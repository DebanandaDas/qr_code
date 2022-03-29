import React, { Component } from 'react'
import data from '../data/text.json';

export default class Report extends Component {

    render() {
        const roll=this.props.roll;
        const name=data.details[roll] &&data.details[roll].name
        const cgpa=data.details[roll]&&data.details[roll].cgpa
        const src="DATA/"+roll+".jpeg"
        return (
            <div>
                <h1>NIT Durgapur</h1>
                <img src={src} alt={name}/>
                <h2>{name}</h2>
                <h3>CGPA: {cgpa}</h3>
                <p> This data is Authenic #TESTING</p>
            </div>
        )
    }
}
