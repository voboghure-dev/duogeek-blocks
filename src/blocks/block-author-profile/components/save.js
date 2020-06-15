/**
 * Internal dependencies
 */
import classnames from "classnames";
import ProfileBox from "./profile";
import SocialIcons from "./social";
import AvatarColumn from "./avatar";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.blockEditor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      profileName,
      profileTitle,
      profileContent,
      profileImgURL,
      profileImgAlt,
      profileImgID,
      profileTextColor,
    } = this.props.attributes;

    return (
      /* Save the block markup for the front end */
      <ProfileBox {...this.props}>
        {profileImgURL && (
          <AvatarColumn {...this.props}>
            <figure className="dggb-profile-image-square">
              <img
                className={classnames(
                  "dggb-profile-avatar",
                  "wp-image-" + profileImgID
                )}
                src={profileImgURL}
                alt={profileImgAlt}
              />
            </figure>
          </AvatarColumn>
        )}

        <div
          className={classnames(
            "dggb-profile-column dggb-profile-content-wrap"
          )}
        >
          {profileName && (
            <RichText.Content
              tagName="h2"
              className="dggb-profile-name"
              style={{
                color: profileTextColor,
              }}
              value={profileName}
            />
          )}

          {profileTitle && (
            <RichText.Content
              tagName="p"
              className="dggb-profile-title"
              style={{
                color: profileTextColor,
              }}
              value={profileTitle}
            />
          )}

          {profileContent && (
            <RichText.Content
              tagName="div"
              className="dggb-profile-text"
              value={profileContent}
            />
          )}

          <SocialIcons {...this.props} />
        </div>
      </ProfileBox>
    );
  }
}
