import React from 'react';

import { storiesOf }                                        from '@storybook/react';
import { action }                                           from '@storybook/addon-actions';
import { withKnobs, boolean, object, text, select, number } from '@storybook/addon-knobs';
import { withInfo }                                         from '@storybook/addon-info';

import ReactCodeInput from './ReactCodeInput.js';
import CodeInputField from "./ReactCodeInput";

const stories = storiesOf('ReactCodeInput', module);
const propVariantStories = storiesOf('ReactCodeInput/Props', module);

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

const darkStyle = {
  fontFamily:      'monospace',
  MozAppearance:   'textfield',
  borderRadius:    '3px',
  border:          '1px solid',
  margin:          '4px',
  paddingLeft:     '7px',
  width:           '15px',
  height:          '26px',
  fontSize:        '14px',
  color:           'lightskyblue',
  backgroundColor: 'black',
  borderColor:     'lightskyblue',
};

// Creation of Stories
stories.addDecorator((story, context) => withInfo('Details')(story)(context));
stories.addDecorator(withKnobs);

// Stories for Input Field
stories
  .add(
    'Default', () =>
      <ReactCodeInput />
  )
  .add(
    'Dark Themed', () =>
      <div style={{ background: '#222', padding: '10px', width: '140px' }}>
        <ReactCodeInput inputStyle={darkStyle} type="number" />
      </div>
  )
  .add(
    'Force Uppercase', () =>
      <CodeInputField fields={4} type="text" forceUppercase value="test" onChange={action('onChange')} />
  );

// Creation of Props
propVariantStories.addDecorator((story, context) => withInfo('Details')(story)(context));
propVariantStories.addDecorator(withKnobs);

propVariantStories
  .add('type', () =>
    <ReactCodeInput type={select(typeLabel, typeOptions, typeDefaultValue, typeGroupId)} />
  )
  .add('fields', () =>
    <ReactCodeInput fields={number('fields', 6)} />
  )
  .add('inputStyle', () =>
    <ReactCodeInput inputStyle={object('inputStyle', inputStyle)} />
  )
  .add('value', () =>
    <ReactCodeInput value={text('value', '1234')} />
  )
  .add('isValid', () =>
    <ReactCodeInput isValid={boolean('isValid', false)} />
  )
  .add('inputMode', () =>
    <ReactCodeInput inputMode={select('inputMode', inputModeOptions)} />
  )
  .add('onChange', () =>
    <ReactCodeInput onChange={action('onChange')} />
  )
  .add('pattern', () =>
    <form>
      <ReactCodeInput value={text('value', '123')} pattern={text('pattern', '[A-Z]')} />
        <input style={{ ...inputStyle, width: 'auto', backgroundColor: 'lightgray' }} type="submit" value="Submit" />
    </form>
  )
  .add('touch', () =>
    <ReactCodeInput touch={action('touch')} />
  )
  .add('untouch', () =>
    <ReactCodeInput untouch={action('untouch')} />
  )
  .add('disabled', () =>
    <ReactCodeInput disabled={boolean('disabled', true)} />
  );
