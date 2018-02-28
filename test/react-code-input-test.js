import 'jsdom-global/register'
import React from 'react'
import chai, { expect } from 'chai'
import { configure, render, shallow, mount } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import CodeInputField from '../src/ReactCodeInput.js'

configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

const numbers = "123456",
      chars = "123FE3"

describe("CodeInputField", () => {
  it(`renders without error`, (done) => {
    shallow(<CodeInputField />)
    done()
  })

  it(`renders field without any values`, () => {
    const wrapper = shallow(<CodeInputField />)
    expect(wrapper.find('input')).to.have.length(4)
    expect(wrapper.state().fields).to.equal(4)
    expect(wrapper.state().value).to.equal("")
    expect(wrapper.state().type).to.equal("text")
    expect(wrapper.state().input).to.be.instanceof(Array)
    expect(wrapper.find('div')).to.have.className("react-code-input")
    expect(wrapper.type()).to.eql('div')
  })

  it(`renders component with value: ${numbers}`, () => {
    const wrapper = render(<CodeInputField value={numbers} fields={6} type="number" />),
          val = []
    for (let i = 0; i < numbers.length; i += 1) {
      val.push(wrapper.find("input")[i].attribs.value)
    }
    expect(val.join("")).to.eql(numbers)
    expect(Number(val.join(""))).to.be.an('number')
  })

  it(`renders component with value: ${chars}`, () => {
    const wrapper = render(<CodeInputField value={chars} fields={6} type="text" />),
          val = []
    for (let i = 0; i < chars.length; i += 1) {
      val.push(wrapper.find("input")[i].attribs.value)
    }
    expect(val.join("")).to.eql(chars)
    expect(val.join("")).to.be.an('string')
  })

  it(`mount component with props: "fields={6}"`, () => {
    const wrapper = mount(<CodeInputField fields={6} />)
    expect(wrapper.props().fields).to.eql(6)
  })

  it(`should have 4 input felds`, () => {
   const wrapper = shallow(<CodeInputField/>)
   expect(wrapper.find('input')).to.have.length(4)
  })

  it(`simulates onChange events`, () => {
    const onChange = sinon.spy()
    const wrapper = mount(<CodeInputField onChange={onChange} fields={3} value="123" type="number" />)
    const element = wrapper.find('input').at(0)
    element.simulate('change')
    element.simulate('keydown', { keyCode: 8 })
    element.simulate('keydown', { keyCode: 13 })
    element.simulate('keydown', { keyCode: 65 }) // "a"
    expect(wrapper.state().value).to.equal('23')
  })

  it(`simulates onChange from paste type=text`, () => {
    const onChange = sinon.spy()
    const wrapper = mount(<CodeInputField onChange={onChange} fields={6} type="text" />)
    const element = wrapper.find('input').at(0)
    const target = element.instance()
    target.value = chars
    element.simulate('change', { target })
    expect(wrapper.state().value).to.equal(chars)
  })

  it(`simulates onChange from paste type=number`, () => {
    const onChange = sinon.spy()
    const wrapper = mount(<CodeInputField onChange={onChange} fields={6} type="number" />)
    const element = wrapper.find('input').at(0)
    const target = element.instance()
    target.value = numbers
    element.simulate('change', { target })
    expect(wrapper.state().value).to.equal(numbers)
  })

  it(`simulates onChange from paste type=number strip non-numeric characters`, () => {
    const onChange = sinon.spy()
    const wrapper = mount(<CodeInputField onChange={onChange} fields={6} type="number" />)
    const element = wrapper.find('input').at(0)
    const target = element.instance()
    target.value = chars
    element.simulate('change', { target })
    expect(wrapper.state().value).to.equal(chars.replace(/[^\d]/g, ''))
  })

  it(`mount component with type="number" but string provided`, () => {
    const onChange = sinon.spy()
    const wrapper = mount(<CodeInputField onChange={onChange} fields={3} value="a23" type="number" />)
    const element = wrapper.find('input').at(0)
    element.simulate('change')
    expect(wrapper.state().value).to.equal('a23')
  })

  it(`simulates focus and blur`, () => {
    const wrapper = mount(<CodeInputField fields={4} value="1234" />)
    const element = wrapper.find('input').at(0)
    element.simulate('focus')
    element.simulate('blur')
    expect(element.instance()).to.be.eql(document.activeElement)
  })

})
