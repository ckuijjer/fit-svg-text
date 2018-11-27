import React, { Component } from 'react'
import { render } from 'react-dom'
import Resizable from 're-resizable'
import ContainerDimensions from 'react-container-dimensions'
import styled from 'react-emotion'

import './index.css'
import FitSVGText from '../../src'

const Page = styled('div')({
  backgroundColor: '#fbfbfb',
  minHeight: '100vh',
  fontFamily: 'Helvetica, Arial, sans-serif',
})

const Row = styled('div')({
  paddingTop: 24,
  display: 'flex',
  justifyContent: 'center',
})

const DocumentationContainer = styled('div')({
  maxWidth: 960,
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
})

class Demo extends Component {
  render() {
    return (
      <Page>
        <Row>
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
        </Row>
        <Row>
          <DocumentationContainer>
            The fit-svg-text react component renders, and potentially wraps,
            text with the maximally possible font size for a container with
            fixed dimensions.
            <h2>Install</h2>
            <code>npm install --save fit-svg-text</code>
            <h2>Usage</h2>
            <code>
              <div dangerouslySetInnerHTML={createUsage()} />
            </code>
          </DocumentationContainer>
        </Row>
      </Page>
    )
  }
}

const createUsage = () => ({
  __html:
    '&lt;FitSVGText width="300" height="200" text="Some example text" /&gt;',
})

render(<Demo />, document.querySelector('#demo'))
