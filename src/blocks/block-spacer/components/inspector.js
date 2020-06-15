/**
 * Inspector Controls
 */

import RenderSettingControl from "../../../utils/components/settings/renderSettingControl";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  render() {
    // Setup the attributes
    const {
      attributes: {
        spacerHeight,
        spacerDivider,
        spacerDividerStyle,
        spacerDividerColor,
        spacerDividerHeight,
      },
      setAttributes,
    } = this.props;

    // Button size values
    const spacerStyleOptions = [
      {
        value: "dggb-divider-solid",
        label: __("Solid", "dggb-blocks"),
      },
      {
        value: "dggb-divider-dashed",
        label: __("Dashed", "dggb-blocks"),
      },
      {
        value: "dggb-divider-dotted",
        label: __("Dotted", "dggb-blocks"),
      },
    ];

    // Divider color
    const dividerColor = [
      { color: "#ddd", name: "white" },
      { color: "#333", name: "black" },
      { color: "#3373dc", name: "royal blue" },
      { color: "#22d25f", name: "green" },
      { color: "#ffdd57", name: "yellow" },
      { color: "#ff3860", name: "pink" },
      { color: "#7941b6", name: "purple" },
    ];

    // Update color values
    const onChangeDividerColor = (value) =>
      setAttributes({ spacerDividerColor: value });

    return (
      <InspectorControls key="inspector">
        <PanelBody>
          <RenderSettingControl id="dggb_spacer_spacerHeight">
            <RangeControl
              label={__("Spacer Height", "dggb-blocks")}
              value={spacerHeight || ""}
              onChange={(value) =>
                this.props.setAttributes({
                  spacerHeight: value,
                })
              }
              min={30}
              max={600}
            />
          </RenderSettingControl>
          <RenderSettingControl id="dggb_spacer_spacerDivider">
            <ToggleControl
              label={__("Add Divider", "dggb-blocks")}
              checked={spacerDivider}
              onChange={() =>
                this.props.setAttributes({
                  spacerDivider: !spacerDivider,
                })
              }
            />
          </RenderSettingControl>
        </PanelBody>
        {spacerDivider ? (
          <Fragment>
            <PanelBody>
              <RenderSettingControl id="dggb_spacer_spacerDividerStyle">
                <SelectControl
                  label={__("Divider Style", "dggb-blocks")}
                  value={spacerDividerStyle}
                  options={spacerStyleOptions.map(({ value, label }) => ({
                    value,
                    label,
                  }))}
                  onChange={(value) => {
                    this.props.setAttributes({
                      spacerDividerStyle: value,
                    });
                  }}
                />
              </RenderSettingControl>
              <RenderSettingControl id="dggb_spacer_spacerDividerHeight">
                <RangeControl
                  label={__("Divider Height", "dggb-blocks")}
                  value={spacerDividerHeight || ""}
                  onChange={(value) =>
                    this.props.setAttributes({
                      spacerDividerHeight: value,
                    })
                  }
                  min={1}
                  max={5}
                />
              </RenderSettingControl>
            </PanelBody>
            <RenderSettingControl id="dggb_spacer_dividerColor">
              <PanelColorSettings
                title={__("Divider Color", "dggb-blocks")}
                initialOpen={false}
                colorSettings={[
                  {
                    colors: dividerColor,
                    value: spacerDividerColor,
                    onChange: onChangeDividerColor,
                    label: __("Divider Color", "dggb-blocks"),
                  },
                ]}
              ></PanelColorSettings>
            </RenderSettingControl>
          </Fragment>
        ) : null}
      </InspectorControls>
    );
  }
}
