import React from 'react'
import chai, { expect } from 'chai'
import { render } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'

import CodeInputField from '../src/index.js'

chai.use(chaiEnzyme())

const VALUE = "123456"

describe("CodeInputField", () => {

  it("render field with values", () => {
    const codeInputField = render(<CodeInputField value={VALUE} digits={6} type="number" />)
    const val = []
    for (let i = 0; i < VALUE.length; i += 1) {
      val.push(codeInputField.find("input")[i].attribs.value)
    }
    expect(val.join("")).to.eql(VALUE)
  })

})
