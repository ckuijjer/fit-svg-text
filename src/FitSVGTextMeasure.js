import React, { Fragment } from 'react'
import getCompositions from './compositions'

import FitSVGText from './FitSVGText'

export default class FitSVGTextMeasure extends React.Component {
  textMeasurementElement = null

  state = {
    compositions: null,
  }

  componentDidMount() {
    this.handleTextChanged()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.handleTextChanged()
    }
  }

  handleTextChanged() {
    const { text } = this.props

    // get the height of the text
    const height = this.textMeasurementElement.getBBox().height

    // find the indices where words are, e.g. "hi you" => [[0, 1], [3, 5]]
    const indices = this.findWordIndices(text)

    // create all possible ways this can be split into lines, e.g. [[[[[0, 1]], [[3, 5]]], [[0, 1], [3, 5]]]
    const compositions = getCompositions(indices)

    compositions.forEach(lines => {
      lines.forEach(words => {
        const startOfFirstWord = words[0][0]
        const endOfLastWord = words[words.length - 1][1]
        const numberOfCharacters = endOfLastWord - startOfFirstWord

        const width = this.textMeasurementElement.getSubStringLength(
          startOfFirstWord,
          numberOfCharacters,
        )

        words.width = width
      })

      lines.height = height * lines.length
    })

    this.setState({
      compositions,
    })
  }

  findWordIndices = str => {
    const regex = /\S+/g

    const result = []
    let match
    while ((match = regex.exec(str))) {
      const start = match.index
      const end = start + match[0].length

      result.push([start, end])
    }

    return result
  }

  render() {
    const { width, height, text, ...restProps } = this.props

    let linesOfText = null
    let zoom = 1

    if (this.state.compositions) {
      // calculate the linesOfText
      // todo: this should be immutable
      this.state.compositions.forEach(lines => {
        lines.forEach(words => {
          words.maximumHorizontalZoom = width / Math.ceil(words.width)
        })
        lines.maximumVerticalZoom = height / Math.ceil(lines.height)
        lines.maximumHorizontalZoom = Math.min(
          ...lines.map(x => x.maximumHorizontalZoom),
        )
        lines.maximumZoom = Math.min(
          lines.maximumVerticalZoom,
          lines.maximumHorizontalZoom,
        )
      })

      this.state.compositions.sort((a, b) => b.maximumZoom - a.maximumZoom)
      const best = this.state.compositions[0] || []

      linesOfText = best.map(words => {
        const startOfFirstWord = words[0][0]
        const endOfLastWord = words[words.length - 1][1]

        return text.substring(startOfFirstWord, endOfLastWord)
      })
      zoom = best.maximumZoom
    }

    return (
      <Fragment>
        <text
          {...restProps}
          ref={c => (this.textMeasurementElement = c)}
          visibility="hidden"
        >
          {text}
        </text>
        {linesOfText && (
          <FitSVGText
            {...restProps}
            width={width}
            height={height}
            linesOfText={linesOfText}
            zoom={zoom}
          />
        )}
      </Fragment>
    )
  }
}
