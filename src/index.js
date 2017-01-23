import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export class ReactCodeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
      digits: props.digits || 4,
      type: props.type || 'text',
      input: [],
    }

    for (let i = 0; i < Number(this.state.digits); i += 1) {
      const value = [...this.state.value][i] || ''
      this.state.input.push(value)
    }

    this.handleChange = this.handleChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur(e) {
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
      this.props.onChange(value)
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
      this.props.onChange(value)
    }
    this.handleTouch(value)
  }

  render() {
    const { className, options = {} } = this.props

    const styles = {
      container: {
        display: 'inline-block'
      },
      input: {
        fontFamily: 'monospace',
        borderRadius: options.borderRadius || '6px',
        border: options.border || '1px solid lightgrey',
        boxShadow: options.boxShadow || '0px 0px 10px 0px rgba(0,0,0,.10)',
        margin: options.margin || '4px',
        paddingLeft: options.paddingLeft || '10px',
        width: options.width || '30px',
        height: options.height || '42px',
        fontSize: options.fontSize || '32px',
        backgroundColor: options.backgroundColor || 'white',
        color: options.color || 'black',
        MozAppearance: 'textfield'
      }
    }

    return (
      <div className={classNames(className, 'react-code-input')} style={styles.container}>
       {this.state.input.map((value, i) => {
         return (
           <input
             ref={i}
             id={i}
             autoFocus={(i === 0) ? 'autoFocus' : ''}
             defaultValue={value}
             key={`input_${i}`}
             type={this.props.type}
             min={0}
             max={9}
             maxLength={1}
             style={styles.input}
             autoComplete="off"
             onFocus={(e) => e.target.select()}
             onBlur={this.handleBlur}
             onChange={this.handleChange}
             onKeyDown={this.onKeyDown}
            />
         )
       })}
      </div>
    )
  }
}

ReactCodeInput.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'password']),
  options: PropTypes.shape({
    fontFamily: PropTypes.string,
    borderRadius: PropTypes.string,
    border: PropTypes.string,
    boxShadow: PropTypes.string,
    margin: PropTypes.string,
    paddingLeft: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    fontSize: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
  }),
  digits: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  touch: PropTypes.func,
  untouch: PropTypes.func,
  className: PropTypes.string
}

export default ReactCodeInput
