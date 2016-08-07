jest.unmock('../src/components/HomePage/components/Clicker');
jest.unmock('react');
jest.unmock('react-dom');
jest.unmock('react-addons-test-utils');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Clicker from '../src/components/HomePage/components/Clicker';

describe('Clicker', () => {
    it('displays "Clicked" after being clicked on', () => {
        const clicker = TestUtils.renderIntoDocument(
            <Clicker/>
        );

        const clickerNode = ReactDOM.findDOMNode(clicker);
        expect(clickerNode.textContent).not.toMatch("Clicked");

        // Simulate a click
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(clicker, 'button')
        );

        expect(clickerNode.textContent).toMatch("Clicked");

    });
});