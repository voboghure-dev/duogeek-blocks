/**
 * Inspector Controls
 */

import RenderSettingControl from "../../../utils/components/settings/renderSettingControl";

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const { PanelBody, SelectControl, ToggleControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  render() {
    // Button style values
    const buttonStyleOptions = [
      {
        value: "dggb-share-icon-text",
        label: __("Icon and Text", "dggb-blocks"),
      },
      {
        value: "dggb-share-icon-only",
        label: __("Icon Only", "dggb-blocks"),
      },
      {
        value: "dggb-share-text-only",
        label: __("Text Only", "dggb-blocks"),
      },
    ];

    // Button shape values
    const buttonShapeOptions = [
      {
        value: "dggb-share-shape-square",
        label: __("Square", "dggb-blocks"),
      },
      {
        value: "dggb-share-shape-rounded",
        label: __("Rounded Square", "dggb-blocks"),
      },
      {
        value: "dggb-share-shape-circular",
        label: __("Circular", "dggb-blocks"),
      },
    ];

    // Button size values
    const shareButtonSizeOptions = [
      {
        value: "dggb-share-size-small",
        label: __("Small", "dggb-blocks"),
      },
      {
        value: "dggb-share-size-medium",
        label: __("Medium", "dggb-blocks"),
      },
      {
        value: "dggb-share-size-large",
        label: __("Large", "dggb-blocks"),
      },
    ];

    // Button color values
    const shareButtonColorOptions = [
      {
        value: "dggb-share-color-standard",
        label: __("Standard", "dggb-blocks"),
      },
      {
        value: "dggb-share-color-social",
        label: __("Social Colors", "dggb-blocks"),
      },
    ];

    return (
      <InspectorControls key="inspector">
        <RenderSettingControl id="dggb_sharing_links">
          <PanelBody>
            <p>
              {__("Enable or disable the sharing links you want to output.")}
            </p>

            <ToggleControl
              label={__("Twitter", "dggb-blocks")}
              checked={!!this.props.attributes.twitter}
              onChange={() =>
                this.props.setAttributes({
                  twitter: !this.props.attributes.twitter,
                })
              }
            />
            <ToggleControl
              label={__("Facebook", "dggb-blocks")}
              checked={!!this.props.attributes.facebook}
              onChange={() =>
                this.props.setAttributes({
                  facebook: !this.props.attributes.facebook,
                })
              }
            />
            <ToggleControl
              label={__("Pinterest", "dggb-blocks")}
              checked={!!this.props.attributes.pinterest}
              onChange={() =>
                this.props.setAttributes({
                  pinterest: !this.props.attributes.pinterest,
                })
              }
            />
            <ToggleControl
              label={__("LinkedIn", "dggb-blocks")}
              checked={!!this.props.attributes.linkedin}
              onChange={() =>
                this.props.setAttributes({
                  linkedin: !this.props.attributes.linkedin,
                })
              }
            />
            <ToggleControl
              label={__("Reddit", "dggb-blocks")}
              checked={!!this.props.attributes.reddit}
              onChange={() =>
                this.props.setAttributes({
                  reddit: !this.props.attributes.reddit,
                })
              }
            />
            <ToggleControl
              label={__("Email", "dggb-blocks")}
              checked={!!this.props.attributes.email}
              onChange={() =>
                this.props.setAttributes({
                  email: !this.props.attributes.email,
                })
              }
            />
          </PanelBody>
        </RenderSettingControl>

        <PanelBody
          title={__("Sharing Button Options", "dggb-blocks")}
          initialOpen={false}
        >
          <RenderSettingControl id="dggb_sharing_shareButtonStyle">
            <SelectControl
              label={__("Button Style", "dggb-blocks")}
              value={this.props.attributes.shareButtonStyle}
              options={buttonStyleOptions.map(({ value, label }) => ({
                value,
                label,
              }))}
              onChange={(value) => {
                this.props.setAttributes({
                  shareButtonStyle: value,
                });
              }}
            />
          </RenderSettingControl>
          <RenderSettingControl id="dggb_sharing_shareButtonShape">
            <SelectControl
              label={__("Button Shape", "dggb-blocks")}
              value={this.props.attributes.shareButtonShape}
              options={buttonShapeOptions.map(({ value, label }) => ({
                value,
                label,
              }))}
              onChange={(value) => {
                this.props.setAttributes({
                  shareButtonShape: value,
                });
              }}
            />
          </RenderSettingControl>
          <RenderSettingControl id="dggb_sharing_shareButtonSize">
            <SelectControl
              label={__("Button Size", "dggb-blocks")}
              value={this.props.attributes.shareButtonSize}
              options={shareButtonSizeOptions.map(({ value, label }) => ({
                value,
                label,
              }))}
              onChange={(value) => {
                this.props.setAttributes({
                  shareButtonSize: value,
                });
              }}
            />
          </RenderSettingControl>
          <RenderSettingControl id="dggb_sharing_shareButtonColor">
            <SelectControl
              label={__("Button Color", "dggb-blocks")}
              value={this.props.attributes.shareButtonColor}
              options={shareButtonColorOptions.map(({ value, label }) => ({
                value,
                label,
              }))}
              onChange={(value) => {
                this.props.setAttributes({
                  shareButtonColor: value,
                });
              }}
            />
          </RenderSettingControl>
        </PanelBody>
      </InspectorControls>
    );
  }
}
