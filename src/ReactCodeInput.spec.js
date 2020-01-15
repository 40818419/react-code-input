import React from 'react';
import CodeInputField from './ReactCodeInput.js';

const numbers = '123456',
  chars = '123FE3';

describe('CodeInputField', () => {
  test('renders without error', () => {
    const wrapper = shallow(<CodeInputField/>);

    expect(wrapper.exists()).toBe(true);
  });

  test('renders field without any values', () => {
    const wrapper = shallow(<CodeInputField/>);

    expect(wrapper.find('input')).toHaveLength(4);
    expect(wrapper.state().fields).toEqual(4);
    expect(wrapper.state().value).toEqual('');
    expect(wrapper.state().type).toEqual('text');
    expect(wrapper.state().input).toBeInstanceOf(Array);
    expect(wrapper.find('div').hasClass('react-code-input')).toBeTruthy();
    expect(wrapper.type()).toEqual('div');
  });

  test(`renders component with value: ${numbers}`, () => {
    const wrapper = render(<CodeInputField value={numbers} fields={6} type="number"/>),
      val = [];
    for (let i = 0; i < numbers.length; i += 1) {
      val.push(wrapper.find('input')[i].attribs.value);
    }
    expect(val.join('')).toEqual(numbers);
  });

  test(`renders component with value: ${chars}`, () => {
    const wrapper = render(<CodeInputField value={chars} fields={6} type="text"/>),
      val = [];
    for (let i = 0; i < chars.length; i += 1) {
      val.push(wrapper.find('input')[i].attribs.value);
    }
    expect(val.join('')).toEqual(chars);
  });

  test('mount component with props: "fields={6}"', () => {
    const wrapper = mount(<CodeInputField fields={6}/>);
    expect(wrapper.props().fields).toEqual(6);
  });

  test('should have 4 input felds', () => {
    const wrapper = shallow(<CodeInputField/>);
    expect(wrapper.find('input')).toHaveLength(4);
  });

  test('simulates onKeydown events', () => {
    const onChange = jest.fn();
    const wrapper = mount(<CodeInputField onChange={onChange} fields={3} value="123" type="number"/>);
    const element = wrapper.find('input').at(0);
    element.simulate('change');
    element.simulate('keydown', { keyCode: 8 });  // "backspace"
    element.simulate('keydown', { keyCode: 13 });
    element.simulate('keydown', { keyCode: 65 }); // "a"
    element.simulate('keydown', { keyCode: 69 }); // "e"
    expect(wrapper.state().value).toEqual('23');
  });

  test('simulates onKeydown events; start at 2nd input', () => {
    const onChange = jest.fn();
    const wrapper = mount(<CodeInputField onChange={onChange} fields={3} value="123" type="number"/>);
    const element = wrapper.find('input').at(1);
    element.simulate('change');
    element.simulate('keydown', { keyCode: 8 });  // "backspace"
    element.simulate('keydown', { keyCode: 13 });
    element.simulate('keydown', { keyCode: 65 }); // "a"
    element.simulate('keydown', { keyCode: 69 }); // "e"
    expect(wrapper.state().value).toEqual('13');
    expect(wrapper.find('input').at(0).instance()).toEqual(document.activeElement);
  });

  test('simulates onChange from paste type=text', () => {
    const onChange = jest.fn();
    const wrapper = mount(<CodeInputField onChange={onChange} fields={6} type="text"/>);
    const element = wrapper.find('input').at(0);
    const target = element.instance();
    target.value = chars;
    element.simulate('change', { target });
    expect(wrapper.state().value).toEqual(chars);
  });

  test('simulates onChange from paste type=number', () => {
    const onChange = jest.fn();
    const wrapper = mount(<CodeInputField onChange={onChange} fields={6} type="number"/>);
    const element = wrapper.find('input').at(0);
    const target = element.instance();
    target.value = numbers;
    element.simulate('change', { target });

    expect(wrapper.state().value).toEqual(numbers);
  });

  test('mount component with type="number" but string provided', () => {
    const onChange = jest.fn();
    const wrapper = mount(<CodeInputField onChange={onChange} fields={3} value="a23" type="number"/>);
    const element = wrapper.find('input').at(0);
    element.simulate('change');

    expect(wrapper.state().value).toEqual('a23');
  });

  test('simulates focus and blur', () => {
    const wrapper = mount(<CodeInputField fields={33} value="1234"/>);
    const element = wrapper.find('input').at(0);
    element.simulate('focus');
    element.simulate('blur');

    expect(element.instance()).toEqual(document.activeElement);
  });

  test('focuses next on right arrow key press', () => {
    const wrapper = mount(<CodeInputField fields={4} value="abc"/>);
    const element = wrapper.find('input').at(1);
    element.simulate('keydown', { keyCode: 39 });

    expect(wrapper.find('input').at(2).instance()).toEqual(document.activeElement);
  });

  test('focuses previous on left arrow key press', () => {
    const wrapper = mount(<CodeInputField fields={4} value="ab"/>);
    const element = wrapper.find('input').at(2);
    element.simulate('keydown', { keyCode: 37 });
    expect(wrapper.find('input').at(1).instance()).toEqual(document.activeElement);
  });

  test('on down arrow key press', () => {
    const wrapper = mount(<CodeInputField fields={4} value="123" type="number"/>);
    const element = wrapper.find('input').at(0);
    element.simulate('keydown', { keyCode: 40 });
    element.simulate('focus');
    element.simulate('blur');
    expect(element.instance()).toEqual(document.activeElement);
  });

  test('on up arrow key press', () => {
    const wrapper = mount(<CodeInputField fields={4} value="123" type="number"/>);
    const element = wrapper.find('input').at(0);
    element.simulate('keydown', { keyCode: 38 });
    element.simulate('focus');
    element.simulate('blur');
    expect(element.instance()).toEqual(document.activeElement);
  });

  test('should receive props', () => {
    const wrapper = mount(<CodeInputField fields={4} value="123" type="number"/>);
    expect(wrapper.state().value).toEqual("123");
    wrapper.setProps({ value: "321" });
    expect(wrapper.state().value).toEqual("321");
  });

  test('should be disabled', () => {
    const wrapper = mount(<CodeInputField fields={4} value="123" type="number" disabled/>);
    expect(wrapper.state().disabled).toBe(true);
  });

  test('should render with inputStyleInvalid', () => {
    const inputStyleInvalid = {
      color: "black",
    };
    const wrapper = mount(<CodeInputField fields={4} value="123" type="number" inputStyleInvalid={inputStyleInvalid}/>);
    expect(wrapper.props().inputStyleInvalid.color).toBe("black");
  });

  test('should only use uppercase letters', () => {
    const wrapper = mount(<CodeInputField fields={3} type="text" forceUppercase/>);
    const element = wrapper.find('input').at(0);
    const target = element.instance();
    target.value = 'abc';
    element.simulate('change', { target });
    expect(wrapper.state().value).toEqual("ABC");
  });

  test('should render with inputStyle', () => {
    const inputStyle = {
      color: "black",
    };
    const wrapper = mount(<CodeInputField fields={4} value="123" type="number" inputStyle={inputStyle}/>);
    expect(wrapper.props().inputStyle.color).toBe("black");
  });

  test('should filter characters on key down 190', () => {
    const wrapper = mount(<CodeInputField fields={4} value="123" type="number"/>);
    const element = wrapper.find('input').at(0);
    element.simulate('keydown', { keyCode: 190 });
    element.simulate('focus');
    element.simulate('blur');
    expect(element.instance()).toEqual(document.activeElement);
  });

  test('should block characters that are in filter; default', () => {
    const wrapper = mount(<CodeInputField fields={6} type="text" filterChars={['1', '2', '3', '4', '5', '6']}/>);
    const element = wrapper.find('input').at(0);
    const target = element.instance();
    target.value = 'ab12cd3e4f56';
    element.simulate('change', { target });
    expect(wrapper.state().value).toEqual("abcdef");
  });

  test('should block characters that are in filter; flag set to false', () => {
    const wrapper = mount(<CodeInputField fields={6} type="text" filterChars={['1', '2', '3', '4', '5', '6']} filterCharsIsWhitelist={false} />);
    const element = wrapper.find('input').at(0);
    const target = element.instance();
    target.value = 'ab12cd3e4f56';
    element.simulate('change', { target });
    expect(wrapper.state().value).toEqual("abcdef");
  });

  test('should only allow characters that are in filter; flag set to true', () => {
    const wrapper = mount(<CodeInputField fields={6} type="text" filterChars={['1', '2', '3', '4', '5', '6']} filterCharsIsWhitelist />);
    const element = wrapper.find('input').at(0);
    const target = element.instance();
    target.value = 'ab12cd3e4f56';
    element.simulate('change', { target });
    expect(wrapper.state().value).toEqual("123456");
  });
});
