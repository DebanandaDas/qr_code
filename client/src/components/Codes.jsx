import React, { Component } from 'react'
import Code from './Code'
import mode1pass from '../data/rand.json';
import mode2pass from '../data/paths.json';
import './styles.css';

export default class Codes extends Component {
    render() {
        return (
            <div>
                <div className="codes-row">
                <Code roll="18CS8068" mode={0}></Code>
                <Code roll="18U10385" mode={0}></Code>
                </div>
                <div className="codes-row">
                <Code roll="18CS8068" mode={1} pass={mode1pass['18CS8068']}></Code>
                <Code roll="18U10385" mode={1} pass={mode1pass['18U10385']}></Code>
                </div>
                <div className="codes-row">
                <Code roll="18CS8068" mode={2} pass={mode2pass['18CS8068']}></Code>
                <Code roll="18U10385" mode={2} pass={mode2pass['18U10385']}></Code>
                </div>
                <h1>Wrong mathes</h1>
                <div className="codes-row">
                <Code roll="18CS8068" mode={1} pass={mode1pass['18U10385']}></Code>
                <Code roll="18U10385" mode={2} pass={mode2pass['18CS8068']}></Code>
                </div>
            </div>
        )
    }
}
