/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import ShareLinks from "./sharing";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;

export default class Edit extends Component {
  render() {
    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={this.props.attributes.shareAlignment}
          onChange={(value) =>
            this.props.setAttributes({ shareAlignment: value })
          }
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector
        key={"dggb-share-inspector-" + this.props.clientId}
        {...this.props}
      />,

      // Show the button markup in the editor
      <ShareLinks
        key={"dggb-share-links-" + this.props.clientId}
        {...this.props}
      >
        <ul className="dggb-share-list">
          {this.props.attributes.twitter && (
            <li>
              <a className="dggb-share-twitter">
                <i className="fab fa-twitter"></i>
                <span className={"dggb-social-text"}>
                  {__("Share on Twitter", "dggb-blocks")}
                </span>
              </a>
            </li>
          )}

          {this.props.attributes.facebook && (
            <li>
              <a className="dggb-share-facebook">
                <i className="fab fa-facebook-f"></i>
                <span className={"dggb-social-text"}>
                  {__("Share on Facebook", "dggb-blocks")}
                </span>
              </a>
            </li>
          )}

          {this.props.attributes.pinterest && (
            <li>
              <a className="dggb-share-pinterest">
                <i className="fab fa-pinterest-p"></i>
                <span className={"dggb-social-text"}>
                  {__("Share on Pinterest", "dggb-blocks")}
                </span>
              </a>
            </li>
          )}

          {this.props.attributes.linkedin && (
            <li>
              <a className="dggb-share-linkedin">
                <i className="fab fa-linkedin"></i>
                <span className={"dggb-social-text"}>
                  {__("Share on LinkedIn", "dggb-blocks")}
                </span>
              </a>
            </li>
          )}

          {this.props.attributes.reddit && (
            <li>
              <a className="dggb-share-reddit">
                <i className="fab fa-reddit-alien"></i>
                <span className={"dggb-social-text"}>
                  {__("Share on reddit", "dggb-blocks")}
                </span>
              </a>
            </li>
          )}

          {this.props.attributes.email && (
            <li>
              <a className="dggb-share-email">
                <i className="fas fa-envelope"></i>
                <span className={"dggb-social-text"}>
                  {__("Share via Email", "dggb-blocks")}
                </span>
              </a>
            </li>
          )}
        </ul>
      </ShareLinks>,
    ];
  }
}
