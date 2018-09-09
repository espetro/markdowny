import React, { Component } from "react";
import marked from "marked";
import '../static/css/Panel.css';

// Rendered Markdown modif - br and link
let renderer = new marked.Renderer();

renderer.br = () => {
    return `
    <br />
    `;
};

renderer.link = (href, title, text) => {
    return `<a href="${href}" alt="${title}" target="_blank">${text}</a>`;
};

class PanelRendering extends Component {
    render() {
        let rendered = {
            __html: marked(this.props.text, { renderer: renderer})
        };

        return(
            // fill 100% height and 50% width
            <div className="Panel Panel-right">
                <div id="preview" dangerouslySetInnerHTML={rendered} />
            </div>
        );
    }
}

export default PanelRendering;