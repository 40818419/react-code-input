import React from 'react'
import ReactDOM from 'react-dom'
import ReactCodeInput from '../lib/index'
import ReactMarkdown from 'react-markdown'

const App = React.createClass({
    render() {
        const props = {
          options: {
            width: '15px',
            borderRadius: '3px',
            fontSize: '14px',
            height: '26px',
            paddingLeft: '7px',
            backgroundColor: 'black',
            color: 'lightskyblue',
            border: '1px solid lightskyblue'
          }
        }

        return (<div>
          <h4>Numeric input</h4>
          <ReactCodeInput type="number" digits={6} />
          <ReactMarkdown source="**Example:**
          ```
            <ReactCodeInput type='number' digits={6} />
          ```" />

        <h4>Text input</h4>
          <ReactCodeInput type="text" digits={6} />
          <ReactMarkdown source="**Example:**
          ```
            <ReactCodeInput type='text' digits={6} />
          ```" />
        <h4>Password input</h4>
          <ReactCodeInput type="password" digits={6} />
          <ReactMarkdown source="**Example:**
          ```
            <ReactCodeInput type='password' digits={6} />
          ```" />
        <h4>Numeric input with options</h4>
        <div style={{ backgroundColor: 'black', display: 'inline-block' }}>
          <ReactCodeInput type="number" digits={6} {...props} />
        </div>
          <ReactMarkdown source="**Example:**
          ```
            <ReactCodeInput type='number' digits={6} {...props}/>
          ```" />
      </div>);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
