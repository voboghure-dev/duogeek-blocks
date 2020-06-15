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
const { InspectorControls, PanelColorSettings, MediaUpload } = wp.blockEditor;

// Import Inspector components
const { PanelBody, RangeControl, IconButton } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      containerPaddingTop,
      containerPaddingRight,
      containerPaddingBottom,
      containerPaddingLeft,
      containerMarginTop,
      containerMarginBottom,
      containerMaxWidth,
      containerBackgroundColor,
      containerDimRatio,
      containerImgURL,
      containerImgID,
    } = this.props.attributes;
    const { setAttributes } = this.props;

    const onSelectImage = (img) => {
      setAttributes({
        containerImgID: img.id,
        containerImgURL: img.url,
        containerImgAlt: img.alt,
      });
    };

    const onRemoveImage = () => {
      setAttributes({
        containerImgID: null,
        containerImgURL: null,
        containerImgAlt: null,
      });
    };

    // Update color values
    const onChangeBackgroundColor = (value) =>
      setAttributes({ containerBackgroundColor: value });

    return (
      <InspectorControls key="inspector">
        <RenderSettingControl id="dggb_container_containerOptions">
          <PanelBody
            title={__("Container Options", "dggb-blocks")}
            initialOpen={true}
          >
            <RangeControl
              label={__("Padding Top (%)", "dggb-blocks")}
              value={containerPaddingTop}
              onChange={(value) =>
                this.props.setAttributes({
                  containerPaddingTop: value,
                })
              }
              min={0}
              max={30}
              step={0.5}
            />

            <RangeControl
              label={__("Padding Bottom (%)", "dggb-blocks")}
              value={containerPaddingBottom}
              onChange={(value) =>
                this.props.setAttributes({
                  containerPaddingBottom: value,
                })
              }
              min={0}
              max={30}
              step={0.5}
            />

            <RangeControl
              label={__("Padding Left (%)", "dggb-blocks")}
              value={containerPaddingLeft}
              onChange={(value) =>
                this.props.setAttributes({
                  containerPaddingLeft: value,
                })
              }
              min={0}
              max={30}
              step={0.5}
            />

            <RangeControl
              label={__("Padding Right (%)", "dggb-blocks")}
              value={containerPaddingRight}
              onChange={(value) =>
                this.props.setAttributes({
                  containerPaddingRight: value,
                })
              }
              min={0}
              max={30}
              step={0.5}
            />

            <RangeControl
              label={__("Margin Top (%)", "dggb-blocks")}
              value={containerMarginTop}
              onChange={(value) =>
                this.props.setAttributes({
                  containerMarginTop: value,
                })
              }
              min={0}
              max={30}
              step={1}
            />

            <RangeControl
              label={__("Margin Bottom (%)", "dggb-blocks")}
              value={containerMarginBottom}
              onChange={(value) =>
                this.props.setAttributes({
                  containerMarginBottom: value,
                })
              }
              min={0}
              max={30}
              step={0.5}
            />

            <RangeControl
              label={__("Inside Container Max Width (px)", "dggb-blocks")}
              value={containerMaxWidth}
              onChange={(value) =>
                this.props.setAttributes({
                  containerMaxWidth: value,
                })
              }
              min={500}
              max={1600}
              step={1}
            />
          </PanelBody>
        </RenderSettingControl>

        <RenderSettingControl id="dggb_container_backgroundOptions">
          <PanelBody
            title={__("Background Options", "dggb-blocks")}
            initialOpen={false}
          >
            <p>{__("Select a background image:", "dggb-blocks")}</p>
            <MediaUpload
              onSelect={onSelectImage}
              type="image"
              value={containerImgID}
              render={({ open }) => (
                <div>
                  <IconButton
                    className="dggb-container-inspector-media"
                    label={__("Edit image", "dggb-blocks")}
                    icon="format-image"
                    onClick={open}
                  >
                    {__("Select Image", "dggb-blocks")}
                  </IconButton>

                  {containerImgURL && !!containerImgURL.length && (
                    <IconButton
                      className="dggb-container-inspector-media"
                      label={__("Remove Image", "dggb-blocks")}
                      icon="dismiss"
                      onClick={onRemoveImage}
                    >
                      {__("Remove", "dggb-blocks")}
                    </IconButton>
                  )}
                </div>
              )}
            ></MediaUpload>

            {containerImgURL && !!containerImgURL.length && (
              <RangeControl
                label={__("Image Opacity", "dggb-blocks")}
                value={containerDimRatio}
                onChange={(value) =>
                  this.props.setAttributes({
                    containerDimRatio: value,
                  })
                }
                min={0}
                max={100}
                step={10}
              />
            )}

            <PanelColorSettings
              title={__("Background Color", "dggb-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: containerBackgroundColor,
                  label: __("Background Color", "dggb-blocks"),
                  onChange: onChangeBackgroundColor,
                },
              ]}
            ></PanelColorSettings>
          </PanelBody>
        </RenderSettingControl>
      </InspectorControls>
    );
  }
}
