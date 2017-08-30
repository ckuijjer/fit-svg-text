import React from 'react';
import getCompositions from './compositions';

export default class FitSVGText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 1,
      text: [this.props.children],
    };
  }

  componentDidMount() {
    this.fitText();
  }

  findWordIndices = str => {
    const regex = /\w+/g;

    const result = [];
    let match;
    while ((match = regex.exec(str))) {
      const start = match.index;
      const end = start + match[0].length;

      result.push([start, end]);
    }

    return result;
  };

  fitText() {
    // find the indices where words are, e.g. "hi you" => [[0, 1], [3, 5]]
    const indices = this.findWordIndices(this.props.children);

    // create all possible ways this can be split into lines, e.g. [[[[[0, 1]], [[3, 5]]], [[0, 1], [3, 5]]]
    const compositions = getCompositions(indices);

    const containerHeight = this.props.height;
    const containerWidth = this.props.width;

    const textHeight = this.textElement.getBBox().height;

    compositions.forEach(lines => {
      lines.forEach(words => {
        const startOfFirstWord = words[0][0];
        const endOfLastWord = words[words.length - 1][1];
        const numberOfCharacters = endOfLastWord - startOfFirstWord;

        const width = this.textElement.getSubStringLength(
          startOfFirstWord,
          numberOfCharacters
        );

        words.width = width;
        words.maximumHorizontalZoom = containerWidth / Math.ceil(width);
      });

      const height = textHeight * lines.length;

      lines.height = height;
      lines.maximumVerticalZoom = containerHeight / Math.ceil(height);
      lines.maximumHorizontalZoom = Math.min(
        ...lines.map(x => x.maximumHorizontalZoom)
      );
      lines.maximumZoom = Math.min(
        lines.maximumVerticalZoom,
        lines.maximumHorizontalZoom
      );
    });

    compositions.sort((a, b) => b.maximumZoom - a.maximumZoom);
    const best = compositions[0];

    this.setState({
      zoom: best.maximumZoom,
      text: best.map(words => {
        const startOfFirstWord = words[0][0];
        const endOfLastWord = words[words.length - 1][1];

        return this.props.children.substring(startOfFirstWord, endOfLastWord);
      }),
    });

    // [[[[[0, 1]], [[3, 5]]], [[0, 1], [3, 5]]]

    // get the length for each of the words

    // get the lineheight

    // get all possible compositions of words

    // get the maximum zoom in the vertical direction

    console.log(this.textElement.getComputedTextLength());
  }

  render() {
    const { width, height, children, ...restProps } = this.props;

    return (
      <text
        {...restProps}
        ref={c => (this.textElement = c)}
        transform={`scale(${this.state.zoom}, ${this.state.zoom})`}
      >
        {this.state.text.map((line, i) =>
          <tspan key={i} x={0} dy="1em">
            {line}
          </tspan>
        )}
      </text>
    );
  }
}
