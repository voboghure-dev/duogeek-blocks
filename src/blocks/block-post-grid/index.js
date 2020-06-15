/**
 * BLOCK: Post and Page Grid
 */

// Import block dependencies and components
import edit from "./components/edit";

// Import CSS
import "./styles/style.scss";
import "./styles/editor.scss";

// Components
const { __ } = wp.i18n;

// Register block controls
const { registerBlockType } = wp.blocks;

// Register alignments
const validAlignments = ["center", "wide", "full"];

// Register the block
registerBlockType("dggb-blocks/dggb-post-grid", {
  title: __("Post and Page Grid", "dggb-blocks"),
  description: __(
    "Add a grid or list of customizable posts or pages.",
    "dggb-blocks"
  ),
  icon: "grid-view",
  category: "dggb-blocks",
  keywords: [
    __("post", "dggb-blocks"),
    __("page", "dggb-blocks"),
    __("grid", "dggb-blocks"),
  ],

  getEditWrapperProps(attributes) {
    const { align } = attributes;
    if (-1 !== validAlignments.indexOf(align)) {
      return { "data-align": align };
    }
  },

  edit,

  dggb_settings_data: {
    dggb_postgrid_postType: {
      title: __("Content Type", "dggb-blocks"),
    },
    dggb_postgrid_queryControls: {
      title: __("Query Controls", "dggb-blocks"),
    },
    dggb_postgrid_offset: {
      title: __("Post Offset", "dggb-blocks"),
    },
    dggb_postgrid_columns: {
      title: __("Columns", "dggb-blocks"),
    },
    dggb_postgrid_displaySectionTitle: {
      title: __("Display Section Title", "dggb-blocks"),
    },
    dggb_postgrid_sectionTitle: {
      title: __("Section Title", "dggb-blocks"),
    },
    dggb_postgrid_displayPostImage: {
      title: __("Display Featured Image", "dggb-blocks"),
    },
    dggb_postgrid_imageSizeValue: {
      title: __("Image Size", "dggb-blocks"),
    },
    dggb_postgrid_displayPostTitle: {
      title: __("Display Post Title", "dggb-blocks"),
    },
    dggb_postgrid_displayPostAuthor: {
      title: __("Display Post Author", "dggb-blocks"),
    },
    dggb_postgrid_displayPostDate: {
      title: __("Display Post Date", "dggb-blocks"),
    },
    dggb_postgrid_displayPostExcerpt: {
      title: __("Display Post Excerpt", "dggb-blocks"),
    },
    dggb_postgrid_excerptLength: {
      title: __("Excerpt Length", "dggb-blocks"),
    },
    dggb_postgrid_displayPostLink: {
      title: __("Display Continue Reading Link", "dggb-blocks"),
    },
    dggb_postgrid_readMoreText: {
      title: __("Read More Text", "dggb-blocks"),
    },
    dggb_postgrid_sectionTag: {
      title: __("Post Grid Section Tag", "dggb-blocks"),
    },
    dggb_postgrid_sectionTitleTag: {
      title: __("Section Title Heading Tag", "dggb-blocks"),
    },
    dggb_postgrid_postTitleTag: {
      title: __("Post Title Heading Tag", "dggb-blocks"),
    },
  },

  // Render via PHP
  save() {
    return null;
  },
});
