/**
 * Background image inspector settings.
 */

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const {
  PanelBody,
  RangeControl,
  IconButton,
  ButtonGroup,
  FocalPointPicker,
  ToggleControl,
  SelectControl,
} = wp.components;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;

class BackgroundImagePanel extends Component {
  render() {
    const { attributes, setAttributes } = this.props;

    const backgroundRepeatOptions = [
      { value: "no-repeat", label: __("No Repeat", "dggb-blocks") },
      { value: "repeat", label: __("Repeat", "dggb-blocks") },
      {
        value: "repeat-x",
        label: __("Repeat Horizontally", "dggb-blocks"),
      },
      {
        value: "repeat-y",
        label: __("Repeat Vertically", "dggb-blocks"),
      },
    ];

    const backgroundSizeOptions = [
      { value: "auto", label: __("Auto", "dggb-blocks") },
      { value: "cover", label: __("Cover", "dggb-blocks") },
      { value: "contain", label: __("Contain", "dggb-blocks") },
    ];

    let backgroundSizeHelp;

    if ("cover" === attributes.backgroundSize) {
      backgroundSizeHelp = __(
        "Scales the image as large as possible without stretching the image. Cropped either vertically or horizontally so that no empty space remains.",
        "dggb-blocks"
      );
    }
    if ("contain" === attributes.backgroundSize) {
      backgroundSizeHelp = __(
        "Scales the image as large as possible without cropping or stretching the image.",
        "dggb-blocks"
      );
    }
    if ("auto" === attributes.backgroundSize) {
      backgroundSizeHelp = __(
        "Scales the background image in the corresponding direction such that its intrinsic proportions are maintained.",
        "dggb-blocks"
      );
    }

    return (
      <Fragment>
        <PanelBody
          title={__("Background Image", "dggb-blocks")}
          initialOpen={false}
        >
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(img) => {
                setAttributes({
                  backgroundImgURL: img.url,
                });
              }}
              type="image"
              value={attributes.backgroundImgURL}
              render={({ open }) => (
                <div>
                  <ButtonGroup className="dggb-background-button-group">
                    <IconButton
                      className="dggb-inspector-icon-button dggb-background-add-button is-button is-default"
                      label={__("Edit image", "dggb-blocks")}
                      icon="format-image"
                      onClick={open}
                    >
                      {__("Select Image", "dggb-blocks")}
                    </IconButton>

                    {attributes.backgroundImgURL && (
                      <IconButton
                        className="dggb-inspector-icon-button dggb-background-remove-button is-button is-default"
                        label={__("Remove Image", "dggb-blocks")}
                        icon="dismiss"
                        onClick={() =>
                          setAttributes({
                            backgroundImgURL: null,
                          })
                        }
                      >
                        {__("Remove", "dggb-blocks")}
                      </IconButton>
                    )}
                  </ButtonGroup>
                </div>
              )}
            ></MediaUpload>
          </MediaUploadCheck>

          {attributes.backgroundImgURL && (
            <Fragment>
              <FocalPointPicker
                label={__("Focal Point", "dggb-blocks")}
                url={attributes.backgroundImgURL}
                value={attributes.focalPoint}
                onChange={(value) => setAttributes({ focalPoint: value })}
              />

              <RangeControl
                label={__("Image Opacity", "dggb-blocks")}
                value={attributes.backgroundDimRatio}
                onChange={(value) =>
                  this.props.setAttributes({
                    backgroundDimRatio: value,
                  })
                }
                min={0}
                max={100}
                step={10}
              />

              <ToggleControl
                label={__("Fixed Background", "dggb-blocks")}
                checked={attributes.hasParallax}
                onChange={() => {
                  setAttributes({
                    hasParallax: !attributes.hasParallax,
                    ...(!attributes.hasParallax
                      ? { focalPoint: undefined }
                      : {}),
                  });
                }}
              />

              <SelectControl
                className="dggb-inspector-help-text"
                label={__("Image Display", "dggb-blocks")}
                value={attributes.backgroundSize}
                help={backgroundSizeHelp}
                options={backgroundSizeOptions}
                onChange={(value) =>
                  this.props.setAttributes({
                    backgroundSize: value,
                  })
                }
              />

              {"cover" !== attributes.backgroundSize && (
                <SelectControl
                  label={__("Image Repeat", "dggb-blocks")}
                  value={attributes.backgroundRepeat}
                  options={backgroundRepeatOptions}
                  onChange={(value) =>
                    this.props.setAttributes({
                      backgroundRepeat: value,
                    })
                  }
                />
              )}
            </Fragment>
          )}
        </PanelBody>
      </Fragment>
    );
  }
}

export default BackgroundImagePanel;
