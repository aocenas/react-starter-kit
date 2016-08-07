// @flow
const React = require('react');
import Clicker from './components/Clicker';

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <h1>Home</h1>
                <Clicker/>
            </div>
        );
    }
}

