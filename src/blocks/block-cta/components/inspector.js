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
const {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
  IconButton,
} = wp.components;

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
      buttonBackgroundColor,
      buttonTextColor,
      buttonSize,
      buttonShape,
      buttonTarget,
      titleFontSize,
      ctaTextFontSize,
      ctaBackgroundColor,
      ctaTextColor,
      dimRatio,
      imgURL,
      imgID,
    } = this.props.attributes;
    const { setAttributes } = this.props;

    // Button size values
    const buttonSizeOptions = [
      { value: "dggb-button-size-small", label: __("Small", "dggb-blocks") },
      { value: "dggb-button-size-medium", label: __("Medium", "dggb-blocks") },
      { value: "dggb-button-size-large", label: __("Large", "dggb-blocks") },
      {
        value: "dggb-button-size-extralarge",
        label: __("Extra Large", "dggb-blocks"),
      },
    ];

    // Button shape
    const buttonShapeOptions = [
      { value: "dggb-button-shape-square", label: __("Square", "dggb-blocks") },
      {
        value: "dggb-button-shape-rounded",
        label: __("Rounded Square", "dggb-blocks"),
      },
      {
        value: "dggb-button-shape-circular",
        label: __("Circular", "dggb-blocks"),
      },
    ];

    // Change the image
    const onSelectImage = (img) => {
      setAttributes({
        imgID: img.id,
        imgURL: img.url,
        imgAlt: img.alt,
      });
    };

    // Clear the image
    const onRemoveImage = () => {
      setAttributes({
        imgID: null,
        imgURL: null,
        imgAlt: null,
      });
    };

    // Update color values
    const onChangeBackgroundColor = (value) =>
      setAttributes({ ctaBackgroundColor: value });
    const onChangeTextColor = (value) => setAttributes({ ctaTextColor: value });
    const onChangeButtonColor = (value) =>
      setAttributes({ buttonBackgroundColor: value });
    const onChangeButtonTextColor = (value) =>
      setAttributes({ buttonTextColor: value });

    return (
      <InspectorControls key="inspector">
        <RenderSettingControl id="dggb_cta_textOptions">
          <PanelBody
            title={__("Text Options", "dggb-blocks")}
            initialOpen={true}
          >
            <RangeControl
              label={__("Title Font Size", "dggb-blocks")}
              value={titleFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  titleFontSize: value,
                })
              }
              min={24}
              max={60}
              step={2}
            />

            <RangeControl
              label={__("Text Font Size", "dggb-blocks")}
              value={ctaTextFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaTextFontSize: value,
                })
              }
              min={14}
              max={24}
              step={2}
            />

            <PanelColorSettings
              title={__("Text Color", "dggb-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: ctaTextColor,
                  onChange: onChangeTextColor,
                  label: __("Text Color", "dggb-blocks"),
                },
              ]}
            ></PanelColorSettings>
          </PanelBody>
        </RenderSettingControl>

        <RenderSettingControl id="dggb_cta_backgroundOptions">
          <PanelBody
            title={__("Background Options", "dggb-blocks")}
            initialOpen={false}
          >
            <p>{__("Select a background image:", "dggb-blocks")}</p>
            <MediaUpload
              onSelect={onSelectImage}
              type="image"
              value={imgID}
              render={({ open }) => (
                <div>
                  <IconButton
                    className="ab-cta-inspector-media"
                    label={__("Edit image", "dggb-blocks")}
                    icon="format-image"
                    onClick={open}
                  >
                    {__("Select Image", "dggb-blocks")}
                  </IconButton>

                  {imgURL && !!imgURL.length && (
                    <IconButton
                      className="ab-cta-inspector-media"
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

            {imgURL && !!imgURL.length && (
              <RangeControl
                label={__("Image Opacity", "dggb-blocks")}
                value={dimRatio}
                onChange={(value) =>
                  this.props.setAttributes({
                    dimRatio: value,
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
                  value: ctaBackgroundColor,
                  onChange: onChangeBackgroundColor,
                  label: __("Overlay Color", "dggb-blocks"),
                },
              ]}
            ></PanelColorSettings>
          </PanelBody>
        </RenderSettingControl>

        <RenderSettingControl id="dggb_cta_buttonOptions">
          <PanelBody
            title={__("Button Options", "dggb-blocks")}
            initialOpen={false}
          >
            <ToggleControl
              label={__("Open link in new window", "dggb-blocks")}
              checked={buttonTarget}
              onChange={() =>
                this.props.setAttributes({
                  buttonTarget: !buttonTarget,
                })
              }
            />

            <SelectControl
              label={__("Button Size", "dggb-blocks")}
              value={buttonSize}
              options={buttonSizeOptions.map(({ value, label }) => ({
                value,
                label,
              }))}
              onChange={(value) => {
                this.props.setAttributes({
                  buttonSize: value,
                });
              }}
            />

            <SelectControl
              label={__("Button Shape", "dggb-blocks")}
              value={buttonShape}
              options={buttonShapeOptions.map(({ value, label }) => ({
                value,
                label,
              }))}
              onChange={(value) => {
                this.props.setAttributes({
                  buttonShape: value,
                });
              }}
            />

            <PanelColorSettings
              title={__("Button Color", "dggb-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: buttonBackgroundColor,
                  onChange: onChangeButtonColor,
                  label: __("Button Color", "dggb-blocks"),
                },
              ]}
            ></PanelColorSettings>

            <PanelColorSettings
              title={__("Button Text Color", "dggb-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: buttonTextColor,
                  onChange: onChangeButtonTextColor,
                  label: __("Button Text Color", "dggb-blocks"),
                },
              ]}
            ></PanelColorSettings>
          </PanelBody>
        </RenderSettingControl>
      </InspectorControls>
    );
  }
}
