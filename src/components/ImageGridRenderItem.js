import React, { PureComponent } from 'react'

export default class ImageGridRenderItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}
