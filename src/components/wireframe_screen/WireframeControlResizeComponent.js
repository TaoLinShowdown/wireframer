import React, { Component } from 'react';

export default class WireframeControlResizeComponent extends Component {
    render() {
        return (
            <div style={{
                height: "100%",
                width: "100%",
                background: "white",
                border: "1px black solid",
                zIndex: 2
            }}></div>
        )
    }
}