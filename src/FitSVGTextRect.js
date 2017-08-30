import React from 'react';
import FitSVGText from './FitSVGText';

const FitSVGTextRect = ({ width, height, text }) =>
  <svg width={width} height={height}>
    <g>
      <rect x="0" y="0" width={width} height={height} fill="#f99" />
      <FitSVGText
        x="0"
        y="0"
        stroke="#000"
        dy="1em"
        width={width}
        height={height}
      >
        {text}
      </FitSVGText>
    </g>
  </svg>;

export default FitSVGTextRect;
