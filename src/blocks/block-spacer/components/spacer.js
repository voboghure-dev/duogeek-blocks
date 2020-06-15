/**
 * Spacer Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from "classnames";

/**
 * Create a Spacer wrapper Component
 */
export default class Spacer extends Component {
  render() {
    // Setup the attributes
    const {
      spacerDivider,
      spacerDividerStyle,
      spacerDividerColor,
      spacerDividerHeight,
    } = this.props.attributes;

    return (
      <div
        style={{
          color: spacerDividerColor,
        }}
        className={classnames(
          this.props.className,
          "dggb-block-spacer",
          spacerDividerStyle,
          { "dggb-spacer-divider": spacerDivider },
          "dggb-divider-size-" + spacerDividerHeight
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
