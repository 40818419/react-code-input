import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class ReactCodeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
      digits: props.digits,
      type: props.type || 'text',
      input: [],
      isValid: props.isValid,
      disabled: props.disabled
    }

    for (let i = 0; i < Number(this.state.digits); i += 1) {
      const value = [...this.state.value][i] || ''
      this.state.input.push(value)
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isValid: nextProps.isValid,
      value: nextProps.value
    })
  }

  handleBlur(e) {
    if (!e.target) {
      return true
    }

    this.handleTouch(e.target.value)
  }

  handleTouch(value) {
    if (typeof this.props.touch === 'function' && typeof this.props.untouch === 'function') {
      if (value === '') {
        this.props.touch(this.props.name)
      } else {
        this.props.untouch(this.props.name)
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
    const { className, options = {}, type } = this.props,
          { disabled, input, isValid } = this.state

    const styles = {
      container: {
        display: 'inline-block'
      },
      input: {
        fontFamily: 'monospace',
        borderRadius: options.borderRadius || '6px',
        border: options.border || '1px solid',
        boxShadow: options.boxShadow || '0px 0px 10px 0px rgba(0,0,0,.10)',
        margin: options.margin || '4px',
        paddingLeft: options.paddingLeft || '10px',
        width: options.width || '30px',
        height: options.height || '42px',
        fontSize: options.fontSize || '32px',
        backgroundColor: options.backgroundColor || 'white',
        color: options.color || 'black',
        MozAppearance: 'textfield',
        borderColor: options.borderColor || 'lightgrey'
      }
    }

    if (disabled) {
      Object.assign(styles.input, { cursor: 'not-allowed' })
    }

    if (isValid === false) {
      Object.assign(styles.input, {
        color: options.colorInvalid || '#b94a48',
        backgroundColor: options.backgroundColorInvalid || '#f2dede',
        borderColor: options.borderColorInvalid || '#eed3d7'
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
  digits: 4
}
ReactCodeInput.propTypes = {
  options: PropTypes.object,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  digits: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  touch: PropTypes.func,
  untouch: PropTypes.func,
  className: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool
}

export default ReactCodeInput
