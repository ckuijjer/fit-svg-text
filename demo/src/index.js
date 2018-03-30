import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>fit-svg-text Demo</h1>
        <div style={{ border: '1px solid #ccc', display: 'inline-block' }}>
          <Example
            width="200"
            height="300"
            text="This text will maximally fill the block"
          />
        </div>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
