/**
 * BLOCK: Author Profile
 */

/**
 * Internal dependencies
 */
import Edit from "./components/edit";
import Save from "./components/save";
import "./styles/style.scss";
import "./styles/editor.scss";
// import Deprecated from './deprecated/deprecated';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const blockAttributes = {
  profileName: {
    type: "array",
    source: "children",
    selector: ".dggb-profile-name",
  },
  profileTitle: {
    type: "array",
    source: "children",
    selector: ".dggb-profile-title",
  },
  profileContent: {
    type: "array",
    selector: ".dggb-profile-text",
    source: "children",
  },
  profileAlignment: {
    type: "string",
  },
  profileImgURL: {
    type: "string",
    source: "attribute",
    attribute: "src",
    selector: "img",
  },
  profileImgAlt: {
    type: "string",
    source: "attribute",
    selector: "figure img",
    attribute: "alt",
    default: "",
  },
  profileImgID: {
    type: "number",
  },
  profileBackgroundColor: {
    type: "string",
    default: "#f2f2f2",
  },
  profileTextColor: {
    type: "string",
    default: "#32373c",
  },
  profileLinkColor: {
    type: "string",
    default: "#392f43",
  },
  profileFontSize: {
    type: "number",
    default: 18,
  },
  profileAvatarShape: {
    type: "string",
    default: "square",
  },
  twitter: {
    type: "url",
  },
  facebook: {
    type: "url",
  },
  instagram: {
    type: "url",
  },
  pinterest: {
    type: "url",
  },
  google: {
    type: "url",
  },
  youtube: {
    type: "url",
  },
  github: {
    type: "url",
  },
  linkedin: {
    type: "url",
  },
  email: {
    type: "url",
  },
  wordpress: {
    type: "url",
  },
  website: {
    type: "url",
  },
};

/**
 * Register the block
 */
registerBlockType("dggb-blocks/dggb-author-profile", {
  title: __("Author Profile", "dggb-blocks"),
  description: __(
    "Add a profile box with bio info and social media links.",
    "dggb-blocks"
  ),
  icon: "admin-users",
  category: "duogeek-blocks",
  keywords: [
    __("author", "dggb-blocks"),
    __("profile", "dggb-blocks"),
    __("duogeek", "dggb-blocks"),
  ],

  /* Setup the block attributes */
  attributes: blockAttributes,

  dggb_settings_data: {
    dggb_author_profile_profileFontSize: {
      title: __("Font Size", "dggb-blocks"),
    },
    dggb_author_profile_profileAvatarShape: {
      title: __("Avatar Shape", "dggb-blocks"),
    },
    dggb_author_profile_profileBackgroundColor: {
      title: __("Background Color", "dggb-blocks"),
    },
    dggb_author_profile_profileTextColor: {
      title: __("Text Color", "dggb-blocks"),
    },
    dggb_author_profile_profileLinkColor: {
      title: __("Social Link Color", "dggb-blocks"),
    },
    dggb_author_profile_socialLinks: {
      title: __("Social Links", "dggb-blocks"),
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
