import React, { Component } from "react";
import '../static/css/Panel.css';

class PanelWriting extends Component {

    constructor(props) {
        super(props);
        this.state = { input: this.props.text };
        this.handleWrite = this.handleWrite.bind(this);
    }

    handleWrite(event) {
        // updates current text input
        this.setState({ input: event.target.value });
        // pass text input to the render panel 
        /* pass in the textarea input, as "setState" is an async
          function aka will not stop on even if the input is loading
         */
        this.props.submitNewText(event.target.value);
    }
    
    render() {
        return(
            <div className="Panel Panel-left">
                <textarea id="editor" value={this.state.input}
                    onChange={(event) => this.handleWrite(event)} />
            </div>
        );
    }
};

export default PanelWriting;