/**
 * Copyright (c) 2016 Konstantin Kulinicenko.
 * Licensed under the MIT License (MIT), see
 * https://github.com/40818419/react-code-input
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { uuidv4 } from './utils';

const BACKSPACE_KEY = 8;
const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;
const E_KEY = 69;

class ReactCodeInput extends Component {
  constructor(props) {
    super(props);

    const { fields, type, isValid, disabled, filterKeyCodes, forceUppercase } = props;
    let { value } = props;

    if (forceUppercase) {
      value = value.toUpperCase();
    }

    this.state = {
      value,
      fields,
      type,
      input: [],
      isValid,
      disabled,
      filterKeyCodes,
      defaultInputStyle: {
        fontFamily: 'monospace',
        MozAppearance: 'textfield',
        borderRadius: '6px',
        border: '1px solid',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,.10)',
        margin: '4px',
        paddingLeft: '8px',
        paddingRight: 0,
        width: '36px',
        height: '42px',
        fontSize: '32px',
        boxSizing: 'border-box',
      },
    };

    for (let i = 0; i < Number(this.state.fields); i += 1) {
      if (i < 32) {
        const value = this.state.value[i] || '';
        this.state.input.push(value);
      }
    }

    this.textInput = [];

    this.uuid = uuidv4();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isValid: nextProps.isValid,
      value: nextProps.value,
      disabled: nextProps.disabled,
    });
  }

  handleBlur(e) {
    this.handleTouch(e.target.value);
  }

  handleTouch(value) {
    const { touch, untouch, name } = this.props;

    if (typeof touch === 'function' && typeof untouch === 'function') {
      if (value === '') {
        touch(name);
      } else {
        untouch(name);
      }
    }
  }

  handleChange(e) {
    const { filterChars, filterCharsIsWhitelist } = this.props;

    let value = String(e.target.value);

    if (this.props.forceUppercase) {
      value = value.toUpperCase();
    }

    if (this.state.type === 'number') {
      value = value.replace(/[^\d]/g, '');
    }

    /** Filter Chars */
    value = value.split('').filter(currChar => {
      if (filterCharsIsWhitelist) {
        return filterChars.includes(currChar);
      }
      return !filterChars.includes(currChar);
    }).join('');

    let fullValue = value;

    if (value !== '') {
      const input = this.state.input.slice();

      if (value.length > 1) {
        value.split('').map((chart, i) => {
          if (Number(e.target.dataset.id) + i < this.props.fields) {
            input[Number(e.target.dataset.id) + i] = chart;
          }
          return false;
        });
      } else {
        input[Number(e.target.dataset.id)] = value;
      }

      input.map((s, i) => {
        if (this.textInput[i]) {
          this.textInput[i].value = s;
        }
        return false;
      });

      const newTarget = this.textInput[e.target.dataset.id < input.length
        ? Number(e.target.dataset.id) + 1
        : e.target.dataset.id];

      if (newTarget) {
        newTarget.focus();
        newTarget.select();
      }

      fullValue = input.join('');

      this.setState({ value: input.join(''), input });
    }

    if (this.props.onChange && fullValue) {
      this.props.onChange(fullValue);
    }

    this.handleTouch(fullValue);
  }

  handleKeyDown(e) {
    const target = Number(e.target.dataset.id),
      nextTarget = this.textInput[target + 1],
      prevTarget = this.textInput[target - 1];

    let input,
      value;

    if (this.state.filterKeyCodes.length > 0) {
      this.state.filterKeyCodes.map((item) => {
        if (item === e.keyCode) {
          e.preventDefault();
          return true;
        }
      });
    }

    switch (e.keyCode) {
      case BACKSPACE_KEY:
        e.preventDefault();
        this.textInput[target].value = '';
        input = this.state.input.slice();
        input[target] = '';
        value = input.join('');

        this.setState({ value, input });
        if (this.textInput[target].value === '') {
          if (prevTarget) {
            prevTarget.focus();
            prevTarget.select();
          }
        }
        if (this.props.onChange) {
          this.props.onChange(value);
        }
        break;

      case LEFT_ARROW_KEY:
        e.preventDefault();
        if (prevTarget) {
          prevTarget.focus();
          prevTarget.select();
        }
        break;

      case RIGHT_ARROW_KEY:
        e.preventDefault();
        if (nextTarget) {
          nextTarget.focus();
          nextTarget.select();
        }
        break;

      case UP_ARROW_KEY:
        e.preventDefault();
        break;

      case DOWN_ARROW_KEY:
        e.preventDefault();
        break;

      case E_KEY: // This case needs to be handled because of https://stackoverflow.com/questions/31706611/why-does-the-html-input-with-type-number-allow-the-letter-e-to-be-entered-in
        if (e.target.type === 'number') {
          e.preventDefault();
          break;
        }
        break;

      default:
        break;
    }

    this.handleTouch(value);
  }

  render() {
    const { className, style = {}, inputStyle = {}, inputStyleInvalid = {}, type, autoFocus, pattern, inputMode } = this.props,
      { disabled, input, isValid, defaultInputStyle } = this.state,
      styles = {
        container: { display: 'inline-block', ...style },
        input: isValid ? inputStyle : inputStyleInvalid,
      };

    if (!className && Object.keys(inputStyle).length === 0) {
      Object.assign(inputStyle, {
        ...defaultInputStyle,
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'lightgrey',
      });
    }

    if (!className && Object.keys(inputStyleInvalid).length === 0) {
      Object.assign(inputStyleInvalid, {
        ...defaultInputStyle,
        color: '#b94a48',
        backgroundColor: '#f2dede',
        borderColor: '#eed3d7',
      });
    }

    if (disabled) {
      Object.assign(styles.input, {
        cursor: 'not-allowed',
        color: 'lightgrey',
        borderColor: 'lightgrey',
        backgroundColor: '#efeff1',
      });
    }

    return (
      <div className={classNames(className, 'react-code-input')} style={styles.container}>
        {input.map((value, i) => {
          return (
            <input
              ref={(ref) => {
                this.textInput[i] = ref;
              }}
              id={`${this.uuid}-${i}`}
              data-id={i}
              autoFocus={autoFocus && (i === 0) ? 'autoFocus' : ''}
              value={value}
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
              onKeyDown={(e) => this.handleKeyDown(e)}
              disabled={disabled}
              data-valid={isValid}
              pattern={pattern}
              inputMode={inputMode}
            />
          );
        })}
      </div>
    );
  }
}

ReactCodeInput.defaultProps = {
  autoFocus: true,
  isValid: true,
  disabled: false,
  forceUppercase: false,
  fields: 4,
  value: '',
  type: 'text',
  filterKeyCodes: [189, 190],
  filterChars: ['-', '.'],
  filterCharsIsWhitelist: false,
};

ReactCodeInput.propTypes = {
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
  inputStyleInvalid: PropTypes.object,
  autoFocus: PropTypes.bool,
  forceUppercase: PropTypes.bool,
  filterKeyCodes: PropTypes.array,
  filterChars: PropTypes.array,
  filterCharsIsWhitelist: PropTypes.bool,
  pattern: PropTypes.string,
  inputMode: PropTypes.oneOf([
    'verbatim', 'latin', 'latin-name', 'latin-prose',
    'full-width-latin', 'kana', 'kana-name', 'katakana',
    'numeric', 'tel', 'email', 'url',
  ]),
};

export default ReactCodeInput;
