/**
 * BLOCK: Sharing
 */

// Import
import Edit from "./components/edit";
import "./styles/style.scss";
import "./styles/editor.scss";

// Components
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("dggb-blocks/dggb-sharing", {
  title: __("Sharing", "dggb-blocks"),
  description: __(
    "Add sharing buttons to your posts and pages.",
    "dggb-blocks"
  ),
  icon: "share",
  category: "dggb-blocks",
  keywords: [
    __("sharing", "dggb-blocks"),
    __("social", "dggb-blocks"),
    __("duogeek", "dggb-blocks"),
  ],

  ab_settings_data: {
    ab_sharing_links: {
      title: __("Sharing Links", "dggb-blocks"),
    },
    ab_sharing_shareButtonStyle: {
      title: __("Button Style", "dggb-blocks"),
    },
    ab_sharing_shareButtonShape: {
      title: __("Button Shape", "dggb-blocks"),
    },
    ab_sharing_shareButtonSize: {
      title: __("Button Size", "dggb-blocks"),
    },
    ab_sharing_shareButtonColor: {
      title: __("Button Color", "dggb-blocks"),
    },
  },

  // Render the block components
  edit: (props) => {
    return <Edit {...props} />;
  },

  // Render via PHP
  save() {
    return null;
  },
});
