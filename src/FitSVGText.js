import React from 'react';

export default class FitSVGText extends React.Component {
  state = {
    zoom: 1,
  };

  render() {
    const { width, height, children, ...restProps } = this.props;

    return (
      <text {...restProps}>
        {children}
      </text>
    );
  }
}
