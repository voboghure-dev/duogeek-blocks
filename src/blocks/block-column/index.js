/**
 * BLOCK: Advanced Columns.
 */

/**
 * Components and dependencies.
 */
import Edit from "./components/edit";
import Save from "./components/save";
import BackgroundAttributes from "./../../utils/components/background-image/attributes";

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register advanced columns block InnerBlocks.
 */
registerBlockType("dggb-blocks/dggb-columns", {
  title: __("Advanced Columns", "dggb-blocks"),
  description: __("Add a pre-defined column layout.", "dggb-blocks"),
  icon: "editor-table",
  category: "dggb-blocks",
  keywords: [
    __("column", "dggb-blocks"),
    __("grid", "dggb-blocks"),
    __("row", "dggb-blocks"),
    __("duogeek", "dggb-blocks"),
  ],
  attributes: {
    ...BackgroundAttributes,
    columns: {
      type: "number",
    },
    layout: {
      type: "string",
    },
    columnsGap: {
      type: "number",
      default: 2,
    },
    align: {
      type: "string",
    },
    responsiveToggle: {
      type: "boolean",
      default: true,
    },
    marginSync: {
      type: "boolean",
      default: false,
    },
    margin: {
      type: "number",
      default: 0,
    },
    marginTop: {
      type: "number",
      default: 0,
    },
    marginBottom: {
      type: "number",
      default: 0,
    },
    marginUnit: {
      type: "string",
      default: "px",
    },
    paddingSync: {
      type: "boolean",
      default: false,
    },
    padding: {
      type: "number",
      default: 0,
    },
    paddingTop: {
      type: "number",
      default: 0,
    },
    paddingRight: {
      type: "number",
      default: 0,
    },
    paddingBottom: {
      type: "number",
      default: 0,
    },
    paddingLeft: {
      type: "number",
      default: 0,
    },
    paddingUnit: {
      type: "string",
      default: "px",
    },
    textColor: {
      type: "string",
    },
    customTextColor: {
      type: "string",
    },
    backgroundColor: {
      type: "string",
    },
    customBackgroundColor: {
      type: "string",
    },
    columnMaxWidth: {
      type: "number",
    },
    centerColumns: {
      type: "boolean",
      default: true,
    },
  },

  dggb_settings_data: {
    dggb_column_columns: {
      title: __("Column Count", "dggb-blocks"),
    },
    dggb_column_columnLayouts: {
      title: __("Column Layout", "dggb-blocks"),
    },
    dggb_column_columnsGap: {
      title: __("Column Gap", "dggb-blocks"),
    },
    dggb_column_columnMaxWidth: {
      title: __("Column Inner Max Width", "dggb-blocks"),
    },
    dggb_column_centerColumns: {
      title: __("Center Columns In Container", "dggb-blocks"),
    },
    dggb_column_responsiveToggle: {
      title: __("Responsive Columns", "dggb-blocks"),
    },
    dggb_column_marginPadding: {
      title: __("Margin / Padding", "dggb-blocks"),
    },
    dggb_column_colorSettings: {
      title: __("Color Settings", "dggb-blocks"),
    },
    dggb_column_backgroundImagePanel: {
      title: __("Background Settings", "dggb-blocks"),
    },
  },

  /* Add alignment to block wrapper. */
  getEditWrapperProps({ align }) {
    if (
      "left" === align ||
      "right" === align ||
      "full" === align ||
      "wide" === align
    ) {
      return { "data-align": align };
    }
  },

  /* Render the block components. */
  edit: (props) => {
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    return <Save {...props} />;
  },
});
