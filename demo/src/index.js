import React, { Component } from 'react'
import { render } from 'react-dom'
import Resizable from 're-resizable'
import ContainerDimensions from 'react-container-dimensions'

import Example from '../../src'

class Demo extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#eee',
          minHeight: '100vh',
          padding: 72,
        }}
      >
        <Resizable
          defaultSize={{
            width: 300,
            height: 200,
          }}
          style={{ margin: '0 auto' }}
        >
          <ContainerDimensions>
            {({ width, height }) => (
              <Example width={width} height={height} text="Fit SVG Text" />
            )}
          </ContainerDimensions>
        </Resizable>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
