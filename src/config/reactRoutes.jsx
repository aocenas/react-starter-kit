// @flow
const React = require('react');
import {Route, IndexRoute} from 'react-router';

import App from '../components/App/App';
import HomePage from '../components/HomePage/HomePage';
import AboutPage from '../components/AboutPage/AboutPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
    </Route>
);