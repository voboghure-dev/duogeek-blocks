/**
 * BLOCK: Container
 */

// Import block dependencies and components
import Inspector from "./components/inspector";
import Container from "./components/container";

// Import CSS
import "./styles/style.scss";
import "./styles/editor.scss";

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { InnerBlocks } = wp.blockEditor;

const blockAttributes = {
  containerPaddingTop: {
    type: "number",
  },
  containerPaddingRight: {
    type: "number",
  },
  containerPaddingBottom: {
    type: "number",
  },
  containerPaddingLeft: {
    type: "number",
  },
  containerMarginTop: {
    type: "number",
  },
  containerMarginBottom: {
    type: "number",
  },
  containerWidth: {
    type: "string",
  },
  containerMaxWidth: {
    type: "number",
  },
  containerBackgroundColor: {
    type: "string",
  },
  containerImgURL: {
    type: "string",
    source: "attribute",
    attribute: "src",
    selector: "img",
  },
  containerImgID: {
    type: "number",
  },
  containerImgAlt: {
    type: "string",
    source: "attribute",
    attribute: "alt",
    selector: "img",
  },
  containerDimRatio: {
    type: "number",
    default: 50,
  },
};

class DGGBContainerBlock extends Component {
  render() {
    // Setup the attributes
    const { setAttributes } = this.props;

    return [
      // Show the block controls on focus
      <Inspector
        key={"dggb-container-inspector-" + this.props.clientId}
        {...{ setAttributes, ...this.props }}
      />,

      // Show the container markup in the editor
      <Container key={"dggb-container-" + this.props.clientId} {...this.props}>
        <InnerBlocks />
      </Container>,
    ];
  }
}

// Register the block
registerBlockType("dggb-blocks/dggb-container", {
  title: __("Container", "dggb-blocks"),
  description: __(
    "Add a container block to wrap several blocks in a parent container.",
    "dggb-blocks"
  ),
  icon: "editor-contract",
  category: "duogeek-blocks",
  keywords: [
    __("container", "dggb-blocks"),
    __("section", "dggb-blocks"),
    __("duogeek", "dggb-blocks"),
  ],

  supports: {
    align: ["center", "wide", "full"],
  },

  attributes: blockAttributes,

  dggb_settings_data: {
    dggb_container_containerOptions: {
      title: __("Container Options", "dggb-blocks"),
    },
    dggb_container_backgroundOptions: {
      title: __("Background Options", "dggb-blocks"),
    },
  },

  // Render the block components
  edit: DGGBContainerBlock,

  // Save the attributes and markup
  save(props) {
    // Save the block markup for the front end
    return (
      <Container {...props}>
        <InnerBlocks.Content />
      </Container>
    );
  },
  getEditWrapperProps({ containerWidth }) {
    if (
      "center" === containerWidth ||
      "wide" === containerWidth ||
      "full" === containerWidth
    ) {
      return { "data-align": containerWidth };
    }
  },
});
