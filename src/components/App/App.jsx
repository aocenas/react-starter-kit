// @flow
import React from 'react';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {getData} from '../../redux/data/dataActions';
const PT = React.PropTypes;

@provideHooks({
    fetch: ({dispatch}) => dispatch(getData()),
})
@connect(
    state => ({data: state.data.data}),
    {getData}
)
export default class App extends React.Component {
    props: {
        children: any,
        data: Object,
    };

    static propTypes = {
        children: PT.node.isRequired,
        data: PT.object.isRequired,
    };

    render() {
        const {children} = this.props;

        // access to redux data
        // this.props.data
        // access to action binded to dispatch, can be used in event handlers
        // this.props.getData

        return (
            <div className="app">
                <Header/>
                <div className="main-container">
                    {children}
                </div>
                <Footer/>
            </div>
        );
    }
}

