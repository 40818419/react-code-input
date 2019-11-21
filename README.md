# react-code-input
React component for entering and validating PIN code.

[![CircleCI](https://circleci.com/gh/40818419/react-code-input.svg?style=svg)](https://circleci.com/gh/40818419/react-code-input) [![npm version](https://badge.fury.io/js/react-code-input.svg)](https://badge.fury.io/js/react-code-input) [![codecov](https://codecov.io/gh/40818419/react-code-input/branch/master/graph/badge.svg)](https://codecov.io/gh/40818419/react-code-input)

##### Live example [here](https://40818419.github.io/react-code-input)

## Installation

`npm i --save react-code-input`

## Usage

### Numeric input:
![Numeric input](https://cloud.githubusercontent.com/assets/2235499/21593670/eafea336-d119-11e6-9d4b-738141f24b44.png)
```js
...
<ReactCodeInput type='number' fields={6} />
...
```

### Text input:
![Text input](https://cloud.githubusercontent.com/assets/2235499/21593708/61cebee2-d11a-11e6-9b8d-e99dbeeec23b.png)
```js
...
<ReactCodeInput type='text' fields={6} />
...
```
### Password input:
![Password input](https://cloud.githubusercontent.com/assets/2235499/21593710/65ed7252-d11a-11e6-995f-f0127af5bd9f.png)
```js
...
<ReactCodeInput type='password' fields={6} />
...
```
### Numeric input with options:
![Numeric input with options](https://cloud.githubusercontent.com/assets/2235499/21593674/f3bb887c-d119-11e6-8b3f-ba478a0f4692.png)
```js
import { reactCodeInput } from 'CodeInputField.scss'
...
const props = {
  className: reactCodeInput,
  inputStyle: {
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    width: '15px',
    borderRadius: '3px',
    fontSize: '14px',
    height: '26px',
    paddingLeft: '7px',
    backgroundColor: 'black',
    color: 'lightskyblue',
    border: '1px solid lightskyblue'
  },
  inputStyleInvalid: {
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    width: '15px',
    borderRadius: '3px',
    fontSize: '14px',
    height: '26px',
    paddingLeft: '7px',
    backgroundColor: 'black',
    color: 'red',
    border: '1px solid red'
  }
}
...
<ReactCodeInput type='number' fields={6} {...props}/>
...
```
### Usage with next.js
```js
import dynamic from 'next/dynamic';

const ReactCodeInput = dynamic(import('react-code-input'));
...
<ReactCodeInput type='number' fields={6} {...props}/>
...
```

## Props:

| Property               | Type   | Description                                                                                          |
| :--------------------- | :----- | :--------------------------------------------------------------------------------------------------- |
| type                   | string | Only types like: `text`, `number`, `password` and `tel` are accepted.                                |
| fields                 | number | Allowed amount of characters to enter.                                                               |
| value                  | string | Setting the value of code input field.                                                               |
| name                   | string | Setting the name of component.                                                                       |
| onChange               | func   | Function, which is called whenever there is a change of value in the input box.                      |
| touch                  | func   | Marks the given fields as "touched" to show errors.                                                  |
| untouch                | func   | Clears the "touched" flag for the given fields.                                                      |
| className              | string | Add classname to the root element.                                                                   |
| style                  | object | Setting the styles of container element.                                                             |
| inputStyle             | object | Setting the styles of each input field.                                                              |
| inputStyleInvalid      | object | Setting the styles of each input field if `isValid` prop is `false`.                                 |
| isValid                | bool   | Returns true if an input element contains valid data.                                                |
| disabled               | bool   | When present, it specifies that the element should be disabled.                                      |
| autoFocus              | bool   | Setup autofocus on the first input, `true` by default.                                               |
| filterKeyCodes         | array  | Filter characters on key down.                                                                       |
| filterChars            | array  | Filter characters; default is ['-', '.']                                                             |
| filterCharsIsWhitelist | bool   | `filterChars` acts as blacklist if `false`, whitelist if `true`; `false` by default.                 |
| pattern                | string | The pattern prop specifies a regular expression that the <input> element's value is checked against. |
| inputMode              | string | The inputMode prop tells the browser on devices with dynamic keyboards which keyboard to display.    |

## Compatible with
[`redux-form`](https://github.com/erikras/redux-form) from [erikras](https://github.com/erikras)

[`next.js`](https://github.com/zeit/next.js) from [zeit](https://github.com/zeit)

## License
MIT
