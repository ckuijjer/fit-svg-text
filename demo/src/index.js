import React, { Component } from 'react'
import { render } from 'react-dom'
import Resizable from 're-resizable'
import ContainerDimensions from 'react-container-dimensions'
import styled from 'react-emotion'

import FitSVGText from '../../src'

const Page = styled('div')({
  backgroundColor: '#fbfbfb',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
})

const ResizableHandle = styled('div')({
  position: 'absolute',
  left: 7,
  top: 7,
  width: 4,
  height: 4,
  border: '1px solid #aaa',
  backgroundColor: '#fff',
  boxShadow: '1px 1px 1px 0px rgba(153,153,153,0.5)',
})

const StyledResizable = styled(Resizable)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `solid 1px #ccc`,
  background: '#f0f0f0',
  marginTop: 40,
  fontFamily: 'Helvetica',
})

class Demo extends Component {
  render() {
    return (
      <Page>
        <StyledResizable
          defaultSize={{
            width: 300,
            height: 200,
          }}
          handleComponent={{
            topLeft: ResizableHandle,
            topRight: ResizableHandle,
            bottomRight: ResizableHandle,
            bottomLeft: ResizableHandle,
          }}
        >
          <ContainerDimensions>
            {({ width, height }) => (
              <FitSVGText
                width={width - 2}
                height={height - 2}
                text="Fit SVG Text"
              />
            )}
          </ContainerDimensions>
        </StyledResizable>
      </Page>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
