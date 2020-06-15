/**
 * Internal dependencies
 */
import Testimonial from "./testimonial";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.blockEditor;

export default class Save extends Component {
  render() {
    const {
      testimonialName,
      testimonialTitle,
      testimonialContent,
      testimonialAlignment,
      testimonialImgURL,
      testimonialTextColor,
    } = this.props.attributes;

    return (
      <Testimonial {...this.props}>
        <RichText.Content
          tagName="div"
          className="dggb-testimonial-text"
          style={{
            textAlign: testimonialAlignment,
          }}
          value={testimonialContent}
        />

        <div className="dggb-testimonial-info">
          {testimonialImgURL && (
            <div className="dggb-testimonial-avatar-wrap">
              <div className="dggb-testimonial-image-wrap">
                <img
                  className="dggb-testimonial-avatar"
                  src={testimonialImgURL}
                  alt="avatar"
                />
              </div>
            </div>
          )}

          {testimonialName && (
            <RichText.Content
              tagName="h2"
              className="dggb-testimonial-name"
              style={{
                color: testimonialTextColor ? testimonialTextColor : "#32373c",
              }}
              value={testimonialName}
            />
          )}

          {testimonialTitle && (
            <RichText.Content
              tagName="small"
              className="dggb-testimonial-title"
              style={{
                color: testimonialTextColor ? testimonialTextColor : "#32373c",
              }}
              value={testimonialTitle}
            />
          )}
        </div>
      </Testimonial>
    );
  }
}
