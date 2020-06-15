/**
 * Avatar Column Wrapper
 */

/* Setup the block */
const { Component } = wp.element;

/* Create an SocialIcons wrapper Component */
export default class AvatarColumn extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    return (
      <div className="dggb-profile-column dggb-profile-avatar-wrap">
        <div className="dggb-profile-image-wrap">{this.props.children}</div>
      </div>
    );
  }
}
