// @flow
const React = require('react');

export default class Clicker extends React.Component {
    state: {
        clicked: bool
    };

    constructor() {
        super();
        this.state = {
            clicked: false
        }
    }

    render() {
        return (
            <div className="clicker">
                <button onClick={() => this.setState({clicked: true})}>
                    Click me
                </button>
                {this.state.clicked ?
                    <span>Clicked</span> : null
                }
            </div>
        );
    }
}
