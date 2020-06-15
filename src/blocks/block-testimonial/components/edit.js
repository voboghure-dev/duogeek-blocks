/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Testimonial from "./testimonial";
import icons from "./../../../utils/components/icons";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  MediaUpload,
} = wp.blockEditor;
const { Button, Dashicon } = wp.components;

const ALLOWED_MEDIA_TYPES = ["image"];

export default class Edit extends Component {
  render() {
    // Setup the attributes
    const {
      attributes: {
        testimonialName,
        testimonialTitle,
        testimonialContent,
        testimonialAlignment,
        testimonialImgURL,
        testimonialImgID,
        testimonialTextColor,
      },
      setAttributes,
    } = this.props;

    const onRemoveImage = () => {
      setAttributes({
        testimonialImgURL: null,
        testimonialImgID: null,
      });
    };

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={testimonialAlignment}
          onChange={(value) => setAttributes({ testimonialAlignment: value })}
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector
        key={"dggb-testimonial-inspector-" + this.props.clientId}
        {...{ setAttributes, ...this.props }}
      />,

      // Show the block markup in the editor
      <Testimonial
        key={"dggb-testimonial-editor-" + this.props.clientId}
        {...this.props}
      >
        <RichText
          tagName="div"
          multiline="p"
          placeholder={__("Add testimonial text...", "dggb-blocks")}
          keepPlaceholderOnFocus
          value={testimonialContent}
          formattingControls={["bold", "italic", "strikethrough", "link"]}
          className={classnames("dggb-testimonial-text")}
          style={{
            textAlign: testimonialAlignment,
          }}
          onChange={(value) => setAttributes({ testimonialContent: value })}
        />

        <div className="dggb-testimonial-info">
          <div className="dggb-testimonial-avatar-wrap">
            <div className="dggb-testimonial-image-wrap">
              <MediaUpload
                buttonProps={{
                  className: "change-image",
                }}
                onSelect={(img) =>
                  setAttributes({
                    testimonialImgID: img.id,
                    testimonialImgURL: img.url,
                  })
                }
                allowed={ALLOWED_MEDIA_TYPES}
                type="image"
                value={testimonialImgID}
                render={({ open }) => (
                  <Fragment>
                    <Button
                      className={
                        testimonialImgID
                          ? "dggb-change-image"
                          : "dggb-add-image"
                      }
                      onClick={open}
                    >
                      {!testimonialImgID ? (
                        icons.upload
                      ) : (
                        <img
                          className="dggb-testimonial-avatar"
                          src={testimonialImgURL}
                          alt="avatar"
                        />
                      )}
                    </Button>
                    {testimonialImgID && (
                      <Button
                        className="dggb-remove-image"
                        onClick={onRemoveImage}
                      >
                        <Dashicon icon={"dismiss"} />
                      </Button>
                    )}
                  </Fragment>
                )}
              ></MediaUpload>
            </div>
          </div>

          <RichText
            tagName="h2"
            placeholder={__("Add name", "dggb-blocks")}
            keepPlaceholderOnFocus
            value={testimonialName}
            className="dggb-testimonial-name"
            style={{
              color: testimonialTextColor,
            }}
            onChange={(value) =>
              this.props.setAttributes({
                testimonialName: value,
              })
            }
          />

          <RichText
            tagName="small"
            placeholder={__("Add title", "dggb-blocks")}
            keepPlaceholderOnFocus
            value={testimonialTitle}
            className="dggb-testimonial-title"
            style={{
              color: testimonialTextColor,
            }}
            onChange={(value) =>
              this.props.setAttributes({
                testimonialTitle: value,
              })
            }
          />
        </div>
      </Testimonial>,
    ];
  }
}
