import React from 'react'
import ReactDOM from 'react-dom'
import BlueKit from 'react-bluekit'
import componentsIndex from '../componentsIndex'

const App = React.createClass({
    render() {
        return (<BlueKit componentsIndex={componentsIndex} />);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
