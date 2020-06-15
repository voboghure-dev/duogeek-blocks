/**
 * BLOCK: Drop Cap
 */

// Import block dependencies and components
import classnames from "classnames";
import Inspector from "./components/inspector";
import DropCap from "./components/dropcap";

// Import CSS
import "./styles/style.scss";
import "./styles/editor.scss";

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, AlignmentToolbar, BlockControls } = wp.blockEditor;

class DGGBDropCapBlock extends Component {
  render() {
    // Setup the attributes
    const {
      attributes: { dropCapContent, dropCapAlignment, dropCapFontSize },
    } = this.props;

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={dropCapAlignment}
          onChange={(value) =>
            this.props.setAttributes({ dropCapAlignment: value })
          }
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector
        key={"dggb-drop-cap-inspector-" + this.props.clientId}
        {...this.props}
      />,

      // Show the block markup in the editor
      <DropCap key={"dggb-drop-cap-" + this.props.clientId} {...this.props}>
        <RichText
          tagName="div"
          multiline="p"
          placeholder={__("Add paragraph text...", "dggb-blocks")}
          keepPlaceholderOnFocus
          value={dropCapContent}
          formattingControls={["bold", "italic", "strikethrough", "link"]}
          className={classnames(
            "dggb-drop-cap-text",
            "dggb-font-size-" + dropCapFontSize
          )}
          onChange={(value) =>
            this.props.setAttributes({ dropCapContent: value })
          }
        />
      </DropCap>,
    ];
  }
}

// Register the block
registerBlockType("dggb-blocks/dggb-drop-cap", {
  title: __("Drop Cap", "dggb-blocks"),
  description: __(
    "Add a styled drop cap to the beginning of your paragraph.",
    "dggb-blocks"
  ),
  icon: "id",
  category: "dggb-blocks",
  keywords: [
    __("drop cap", "dggb-blocks"),
    __("quote", "dggb-blocks"),
    __("duogeek", "dggb-blocks"),
  ],
  attributes: {
    dropCapContent: {
      type: "array",
      selector: ".dggb-drop-cap-text",
      source: "children",
    },
    dropCapAlignment: {
      type: "string",
    },
    dropCapBackgroundColor: {
      type: "string",
      default: "#f2f2f2",
    },
    dropCapTextColor: {
      type: "string",
      default: "#32373c",
    },
    dropCapFontSize: {
      type: "number",
      default: 3,
    },
    dropCapStyle: {
      type: "string",
      default: "drop-cap-letter",
    },
  },

  dggb_settings_data: {
    dggb_dropcap_dropCapFontSize: {
      title: __("Drop Cap Size", "dggb-blocks"),
    },
    dggb_dropcap_dropCapStyle: {
      title: __("Drop Cap Style", "dggb-blocks"),
    },
  },

  // Render the block components
  edit: DGGBDropCapBlock,

  // Save the attributes and markup
  save(props) {
    const { dropCapContent } = props.attributes;

    // Save the block markup for the front end
    return (
      <DropCap {...props}>
        {// Check if there is text and output
        dropCapContent && (
          <RichText.Content
            tagName="div"
            className="dggb-drop-cap-text"
            value={dropCapContent}
          />
        )}
      </DropCap>
    );
  },
});
