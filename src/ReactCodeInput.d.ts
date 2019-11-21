// Type definitions for react-code-input 3.8.2
// Project: React Code Input
// Definitions by: Siraj Alam https://github.com/sirajalam049

import React, { Component } from 'react';

export type InputModeTypes =
    'verbatim' | 'latin' | 'latin-name' | 'latin-prose' |
    'full-width-latin' | 'kana' | 'kana-name' | 'katakana' |
    'numeric' | 'tel' | 'email' | 'url'

export interface ReactCodeInputProps {

    // Type of input accept
    type?: 'text' | 'number' | 'password' | 'tel'

    // Allowed amount of characters to enter.
    fields?: number

    // Value of the input
    value?: string

    // Get the full value of the input on every change
    onChange?: (value: string) => void

    // Setting the name of component. 
    name: string

    // Marks the given fields as "touched" to show errors. 
    touch?: (name: string) => void

    // Clears the "touched" flag for the given fields. 
    untouch?: (name: string) => void

    // Add classname to the root element.
    className?: string

    isValid?: boolean

    // When present, it specifies that the element should be disabled. 
    disabled?: boolean

    // Setting the styles of container element.
    style?: React.CSSProperties

    // Setting the styles of each input field.
    inputStyle?: React.CSSProperties

    // Setting the styles of each input field if isValid prop is false.
    inputStyleInvalid?: React.CSSProperties

    // Setup autofocus on the first input, true by default. 
    autoFocus?: boolean

    // 
    forceUppercase?: boolean

    // Filter characters on key down.
    filterKeyCodes?: Array<number>

    // Filter characters.
    filterChars?: Array<string>

    // Filter above acts as blacklist if false, whitelist if true; false by default.
    filterCharsIsWhitelist?: boolean;

    // The pattern prop specifies a regular expression that the element's value is checked against.
    pattern?: string

    // The inputMode prop tells the browser on devices with dynamic keyboards which keyboard to display.
    inputMode: InputModeTypes

}

declare class ReactCodeInput extends Component<ReactCodeInputProps, any> {
    constructor(props: ReactCodeInputProps);
}

export default ReactCodeInput