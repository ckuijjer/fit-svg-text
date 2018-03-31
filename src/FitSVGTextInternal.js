import React from 'react'

const FitSVGText = ({
  width,
  height,
  zoom = 1,
  linesOfText = [],
  ...restProps
}) => (
  <text {...restProps} transform={`scale(${zoom}, ${zoom})`}>
    {linesOfText.map((line, i) => (
      <tspan key={i} x={0} dy="1em">
        {line}
      </tspan>
    ))}
  </text>
)

export default FitSVGText
