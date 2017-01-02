# react-code-input
React component for entering and validating code.

## Installation

`npm i --save react-code-input`

## Usage

### Nummeric input:
![Nummeric input](https://cloud.githubusercontent.com/assets/2235499/21593670/eafea336-d119-11e6-9d4b-738141f24b44.png)
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
### Nummeric input with options:
![Nummeric input with options](https://cloud.githubusercontent.com/assets/2235499/21593674/f3bb887c-d119-11e6-8b3f-ba478a0f4692.png)
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

## License
MIT
