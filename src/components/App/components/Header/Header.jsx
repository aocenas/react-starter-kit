// @Flow
const React = require('react');
import {Link} from 'react-router';

const PT = React.PropTypes;


export default class Header extends React.Component {
    render() {
        return (
            <nav className="nav">
                <Link
                    activeClassName="is-active"
                    to={'/'}
                    onlyActiveOnIndex={true}
                >
                    home
                </Link>

                <Link
                    activeClassName="is-active"
                    to={{
                        pathname: '/about',
                        //query: {},
                    }}
                >
                    about
                </Link>
            </nav>
        );
    }
}

