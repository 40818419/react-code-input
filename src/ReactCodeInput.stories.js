import React from 'react';

import { storiesOf }                                        from '@storybook/react';
import { action }                                           from '@storybook/addon-actions';
import { withKnobs, boolean, object, text, select, number } from '@storybook/addon-knobs';
import { withInfo }                                         from '@storybook/addon-info';

import ReactCodeInput from './ReactCodeInput.js';

const stories = storiesOf('ReactCodeInput', module);
stories.addDecorator((story, context) => withInfo('Details')(story)(context));
stories.addDecorator(withKnobs);
stories.add('Default', () => <ReactCodeInput />);

const propVariantStories = storiesOf('ReactCodeInput/Props', module);
propVariantStories.addDecorator((story, context) => withInfo('Details')(story)(context));
propVariantStories.addDecorator(withKnobs);

const typeLabel = 'Type';
const typeOptions = ['text', 'number', 'password', 'tel'];
const typeDefaultValue = 'text';
const typeGroupId = 'Type';

const inputModeOptions = [
  'verbatim', 'latin', 'latin-name', 'latin-prose',
  'full-width-latin', 'kana', 'kana-name', 'katakana',
  'numeric', 'tel', 'email', 'url',
];

const inputStyle = {
  fontFamily:      'monospace',
  MozAppearance:   'textfield',
  borderRadius:    '6px',
  border:          '1px solid',
  boxShadow:       '0px 0px 10px 0px rgba(0,0,0,.10)',
  margin:          '4px',
  paddingLeft:     '8px',
  width:           '36px',
  height:          '42px',
  fontSize:        '32px',
  boxSizing:       'border-box',
  color:           'black',
  backgroundColor: 'white',
  borderColor:     'lightgrey',
};

propVariantStories.add('type', () => <ReactCodeInput
  type={select(typeLabel, typeOptions, typeDefaultValue, typeGroupId)} />)
                  .add('fields', () => <ReactCodeInput fields={number('fields', 6)} />)
                  .add('inputStyle', () => <ReactCodeInput inputStyle={object('inputStyle', inputStyle)} />)
                  .add('value', () => <ReactCodeInput value={text('value', '1234')} />)
                  .add('isValid', () => <ReactCodeInput isValid={boolean('isValid', false)} />)
                  .add('inputMode', () => <ReactCodeInput inputMode={select('inputMode', inputModeOptions)} />)
                  .add('onChange', () => <ReactCodeInput onChange={action('onChange')} />)
                  .add('pattern', () => <form><ReactCodeInput value={text('value', '123')}
                                                              pattern={text('pattern', '[A-Z]')} /><input
                    style={{ ...inputStyle, width: 'auto', backgroundColor: 'lightgray' }} type="submit"
                    value="Submit" /></form>)
                  .add('touch', () => <ReactCodeInput touch={action('touch')} />)
                  .add('untouch', () => <ReactCodeInput untouch={action('untouch')} />)
                  .add('disabled', () => <ReactCodeInput disabled={boolean('disabled', true)} />);

