import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ReactCodeInput extends Component {
  constructor(props) {
    super(props)

    const { value, fields, type, isValid, disabled } = props

    this.state = {
      value,
      fields,
      type,
      input: [],
      isValid,
      disabled,
      defaultInputStyle: {
        fontFamily: 'monospace',
        MozAppearance: 'textfield',
        borderRadius: '6px',
        border: '1px solid',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,.10)',
        margin: '4px',
        paddingLeft: '8px',
        width: '36px',
        height: '42px',
        fontSize: '32px',
        boxSizing: 'border-box'
      }
    }
    for (let i = 0; i < Number(this.state.fields); i += 1) {
      if (i < 32) {
        const value = [...this.state.value][i] || ''
        this.state.input.push(value)
      }
    }
    this.textInput = []
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isValid: nextProps.isValid,
      value: nextProps.value,
      disabled: nextProps.disabled
    })
  }

  handleBlur(e) {
    this.handleTouch(e.target.value)
  }

  handleTouch(value) {
    const { touch, untouch, name } = this.props

    if (typeof touch === 'function' && typeof untouch === 'function') {
      if (value === '') {
        touch(name)
      } else {
        untouch(name)
      }
    }
  }

  handleChange(e) {
    const target = Number(e.target.id)
    let value = String(e.target.value)

    if (this.state.type === 'number') {
      value = value.replace(/[^\d]/g, '')
    }

    if (value !== '') {
      const input = this.state.input.slice()
      input[target] = value
      value = input.join('')

      if (value.length > 1) {
        value.split('').map((s, i) => {
          if (this.textInput[i]) {
            this.textInput[i].value = s
          }
          return false
        })
      }
      const newTarget = this.textInput[input.length === value.length ? value.length - 1 : value.length]

      if (newTarget) {
        newTarget.focus()
        newTarget.select()
      }

      this.setState({ value, input })
    }
    if ('onChange' in this.props) {
      if (value) {
        this.props.onChange(value)
      }
    }
    this.handleTouch(value)
  }

  onKeyDown(e) {
    const target = Number(e.target.id),
          prevTarget = this.textInput[target - 1]
    let input, value

    switch (e.keyCode) {
      case 8:
        e.preventDefault()
        this.textInput[target].value = ''
        input = this.state.input.slice()
        input[target] = ''
        value = input.join('')

        this.setState({ value, input })
        if (this.textInput[target].value === '') {
          if (prevTarget) {
            prevTarget.focus()
            prevTarget.select()
          }
        }
        break
      case 38:
        e.preventDefault()
        break
      case 40:
        e.preventDefault()
        break
      default:
        break
    }
    if ('onChange' in this.props) {
      if (value) {
        this.props.onChange(value)
      }
    }
    this.handleTouch(value)
  }

  render() {
    const { className, style = {}, inputStyle = {}, inputStyleInvalid = {}, type } = this.props,
          { disabled, input, isValid, defaultInputStyle } = this.state,
          styles = {
            container: style,
            input: isValid ? inputStyle : inputStyleInvalid
          }

    Object.assign(styles.container, {
        display: 'inline-block'
    })

    if (!className && Object.keys(inputStyle).length === 0) {
      Object.assign(inputStyle, {
        ...defaultInputStyle,
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'lightgrey'
      })
    }

    if (!className && Object.keys(inputStyleInvalid).length === 0) {
      Object.assign(inputStyleInvalid, {
        ...defaultInputStyle,
        color: '#b94a48',
        backgroundColor: '#f2dede',
        borderColor: '#eed3d7'
      })
    }

    if (disabled) {
      Object.assign(styles.input, {
        cursor: 'not-allowed',
        color: 'lightgrey',
        borderColor: 'lightgrey',
        backgroundColor: '#efeff1'
      })
    }

    return (
      <div className={classNames(className, 'react-code-input')} style={styles.container}>
       {input.map((value, i) => {
         return (
           <input
             ref={(ref) => {
               this.textInput[i] = ref
             }}
             id={i}
             autoFocus={(i === 0) ? 'autoFocus' : ''}
             defaultValue={value}
             key={`input_${i}`}
             type={type}
             min={0}
             max={9}
             maxLength={input.length === i + 1 ? 1 : input.length}
             style={styles.input}
             autoComplete="off"
             onFocus={(e) => e.target.select(e)}
             onBlur={(e) => this.handleBlur(e)}
             onChange={(e) => this.handleChange(e)}
             onKeyDown={(e) => this.onKeyDown(e)}
             disabled={disabled}
             data-valid={isValid}
            />
         )
       })}
      </div>
    )
  }
}

ReactCodeInput.defaultProps = {
  isValid: true,
  disabled: false,
  fields: 4,
  value: '',
  type: 'text'
}
ReactCodeInput.propTypes = {
  options: PropTypes.object,
  type: PropTypes.oneOf(['text', 'number', 'password', 'tel']),
  fields: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  touch: PropTypes.func,
  untouch: PropTypes.func,
  className: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  inputStyleInvalid: PropTypes.object
}

export default ReactCodeInput
