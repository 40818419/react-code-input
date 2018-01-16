import React from 'react'
import createReactClass from 'create-react-class'
import ReactDOM from 'react-dom'
import BlueKit from 'react-bluekit'
import componentsIndex from '../componentsIndex'

const App = createReactClass({
    render() {
        return (<BlueKit componentsIndex={componentsIndex} />);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
