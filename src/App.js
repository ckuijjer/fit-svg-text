import React, { Component } from 'react'
import FitSVGTextRect from './FitSVGTextRect'

class App extends Component {
  render() {
    return (
      <div>
        <FitSVGTextRect width="200" height="300" text="Some text here" />
        <FitSVGTextRect width="200" height="150" text="Some text here" />
        <FitSVGTextRect width="200" height="100" text="Some text here" />
        <FitSVGTextRect width="200" height="60" text="Some text here" />
        <FitSVGTextRect width="200" height="100" text="Some text here" />
        <FitSVGTextRect width="20" height="10" text="Some text here" />
        <FitSVGTextRect
          width="100"
          height="100"
          text="It starts failing if you put a lot of text though"
        />
        <FitSVGTextRect
          width="150"
          height="100"
          text="It starts failing if you put a lot of text though"
        />
        <FitSVGTextRect width="150" height="100" text="Single" />
      </div>
    )
    return
  }
}

export default App
