/**
 * BLOCK: Testimonial
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/editor.scss";

// Internationalization
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("dggb-blocks/dggb-testimonial", {
  title: __("Testimonial", "dggb-blocks"),
  description: __(
    "Add a user testimonial with a name and title.",
    "dggb-blocks"
  ),
  icon: "format-quote",
  category: "dggb-blocks",
  keywords: [
    __("testimonial", "dggb-blocks"),
    __("quote", "dggb-blocks"),
    __("duogeek", "dggb-blocks"),
  ],
  attributes: {
    testimonialName: {
      type: "array",
      selector: ".dggb-testimonial-name",
      source: "children",
    },
    testimonialTitle: {
      type: "array",
      selector: ".dggb-testimonial-title",
      source: "children",
    },
    testimonialContent: {
      type: "array",
      selector: ".dggb-testimonial-text",
      source: "children",
    },
    testimonialAlignment: {
      type: "string",
    },
    testimonialImgURL: {
      type: "string",
      source: "attribute",
      attribute: "src",
      selector: "img",
    },
    testimonialImgID: {
      type: "number",
    },
    testimonialBackgroundColor: {
      type: "string",
      default: "#f2f2f2",
    },
    testimonialTextColor: {
      type: "string",
      default: "#32373c",
    },
    testimonialFontSize: {
      type: "number",
      default: 18,
    },
    testimonialCiteAlign: {
      type: "string",
      default: "left-aligned",
    },
  },
  dggb_settings_data: {
    dggb_testimonial_testimonialFontSize: {
      title: __("Font Size", "dggb-blocks"),
    },
    dggb_testimonial_testimonialCiteAlign: {
      title: __("Cite Alignment", "dggb-blocks"),
    },
    dggb_testimonial_testimonialBackgroundColor: {
      title: __("Background Color", "dggb-blocks"),
    },
    dggb_testimonial_testimonialTextColor: {
      title: __("Text Color", "dggb-blocks"),
    },
  },

  /* Render the block in the editor. */
  edit: (props) => {
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    return <Save {...props} />;
  },
});
