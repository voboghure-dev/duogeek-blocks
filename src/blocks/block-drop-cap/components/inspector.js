/**
 * Inspector Controls
 */

/**
 * Internal dependencies.
 */
import RenderSettingControl from "../../../utils/components/settings/renderSettingControl";

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const { RangeControl, SelectControl, PanelBody } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const { dropCapFontSize, dropCapStyle } = this.props.attributes;

    // Drop cap style options
    const dropCapOptions = [
      { value: "dggb-drop-cap-letter", label: __("Letter", "dggb-blocks") },
      { value: "dggb-drop-cap-square", label: __("Square", "dggb-blocks") },
      { value: "dggb-drop-cap-border", label: __("Border", "dggb-blocks") },
    ];

    return (
      <InspectorControls key="inspector">
        <PanelBody>
          <RenderSettingControl id="dggb_dropcap_dropCapFontSize">
            <RangeControl
              label={__("Drop Cap Size", "dggb-blocks")}
              value={dropCapFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  dropCapFontSize: value,
                })
              }
              min={1}
              max={6}
              step={1}
            />
          </RenderSettingControl>

          <RenderSettingControl id="dggb_dropcap_dropCapStyle">
            <SelectControl
              label={__("Drop Cap Style", "dggb-blocks")}
              description={__(
                "Choose the style of the drop cap in your paragraph.",
                "dggb-blocks"
              )}
              options={dropCapOptions}
              value={dropCapStyle}
              onChange={(value) =>
                this.props.setAttributes({
                  dropCapStyle: value,
                })
              }
            />
          </RenderSettingControl>
        </PanelBody>
      </InspectorControls>
    );
  }
}
