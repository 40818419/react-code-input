import React, { Component, PropTypes } from 'react'
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
        paddingLeft: '10px',
        width: '30px',
        height: '42px',
        fontSize: '32px'
      }
    }
    for (let i = 0; i < Number(this.state.fields); i += 1) {
      if (i < 32) {
        const value = [...this.state.value][i] || ''
        this.state.input.push(value)
      }
    }
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

    if (value !== '') {
      if (this.state.type === 'number') {
        if (!value.match(/(\d)/g)) {
          return
        }
        if (value.length > 1) {
          this.refs[target].value = value.slice(-1)
        }
      }

      const input = this.state.input.slice()
      input[target] = this.refs[target].value
      value = input.join('')

      this.setState({ value, input })

      const newTarget = this.refs[target + 1]
      if (newTarget) {
        newTarget.focus()
        newTarget.select()
      }
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
          prevTarget = this.refs[target - 1]
    let input, value

    switch (e.keyCode) {
      case 8:
        e.preventDefault()
        this.refs[target].value = ''
        input = this.state.input.slice()
        input[target] = ''
        value = input.join('')

        this.setState({ value, input })
        if (this.refs[target].value === '') {
          if (prevTarget) {
            prevTarget.focus()
            prevTarget.select()
          }
        }
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
             ref={i}
             id={i}
             autoFocus={(i === 0) ? 'autoFocus' : ''}
             defaultValue={value}
             key={`input_${i}`}
             type={type}
             min={0}
             max={9}
             maxLength={1}
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
  type: PropTypes.oneOf(['text', 'number', 'password']),
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
