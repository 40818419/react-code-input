# react-code-input
React component for entering and validating code.

[![npm version](https://badge.fury.io/js/react-code-input.svg)](https://badge.fury.io/js/react-code-input) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/970fd2a1775740aa82eecad7cb407395)](https://www.codacy.com/app/konstantin_2/react-code-input?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=40818419/react-code-input&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/40818419/react-code-input.svg?branch=master)](https://travis-ci.org/40818419/react-code-input) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/970fd2a1775740aa82eecad7cb407395)](https://www.codacy.com/app/konstantin_2/react-code-input?utm_source=github.com&utm_medium=referral&utm_content=40818419/react-code-input&utm_campaign=Badge_Coverage)

##### Live example [here](https://40818419.github.io/react-code-input)

## Installation

`npm i --save react-code-input`

## Usage

### Numeric input:
![Numeric input](https://cloud.githubusercontent.com/assets/2235499/21593670/eafea336-d119-11e6-9d4b-738141f24b44.png)
```js
...
<ReactCodeInput type='number' digits={6} />
...
```

### Text input:
![Text input](https://cloud.githubusercontent.com/assets/2235499/21593708/61cebee2-d11a-11e6-9b8d-e99dbeeec23b.png)
```js
...
<ReactCodeInput type='text' digits={6} />
...
```
### Password input:
![Password input](https://cloud.githubusercontent.com/assets/2235499/21593710/65ed7252-d11a-11e6-995f-f0127af5bd9f.png)
```js
...
<ReactCodeInput type='password' digits={6} />
...
```
### Numeric input with options:
![Numeric input with options](https://cloud.githubusercontent.com/assets/2235499/21593674/f3bb887c-d119-11e6-8b3f-ba478a0f4692.png)
```js
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
...
<ReactCodeInput type='number' digits={6} {...props}/>
...
```
## Props:

| Prop | Type | Description |
|---|---|---|
| type | string |Only types like: `text`, `number`, `password` are accepted.|
| digits | number | Amount of characters to enter. |
| value | string | Setting the initial value of code input field. |
| name | string | Set the name of input field. |
| onChange | func | Function, which is called whenever there is a change of value in the input box. |
| touch | func | Marks the given fields as "touched" to show errors. |
| untouch | func | Clears the "touched" flag for the given fields. |
| className | string | Add classname to the root element |
| options | object | Set the styles as options |

## Compatible with
[`redux-form`](https://github.com/erikras/redux-form) from [erikras](https://github.com/erikras)

## License
MIT
