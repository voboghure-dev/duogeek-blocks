/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import compact from "lodash/compact";
import map from "lodash/map";
import RenderSettingControl from "../../../utils/components/settings/renderSettingControl";
import Select from "react-select";

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const {
  PanelBody,
  QueryControls,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
} = wp.components;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor() {
    super(...arguments);
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.stillMounted = true;
    this.fetchRequest = apiFetch({
      path: addQueryArgs("/wp/v2/categories", { per_page: -1 }),
    })
      .then((categoriesList) => {
        if (this.stillMounted) {
          this.setState({ categoriesList });
        }
      })
      .catch(() => {
        if (this.stillMounted) {
          this.setState({ categoriesList: [] });
        }
      });
  }

  componentWillUnmount() {
    this.stillMounted = false;
  }

  /* Get the available image sizes */
  imageSizeSelect() {
    const getSettings = wp.data.select("core/editor").getEditorSettings();

    return compact(
      map(getSettings.imageSizes, ({ name, slug }) => {
        return {
          value: slug,
          label: name,
        };
      })
    );
  }

  /* Get the page list */
  pageSelect() {
    const getPages = wp.data
      .select("core")
      .getEntityRecords("postType", "page", { per_page: -1 });

    return compact(
      map(getPages, ({ id, title }) => {
        return {
          value: id,
          label: title.raw,
        };
      })
    );
  }

  render() {
    // Setup the attributes
    const { attributes, setAttributes, latestPosts } = this.props;

    const { order, orderBy } = attributes;

    const { categoriesList } = this.state;

    // Post type options
    const postTypeOptions = [
      { value: "post", label: __("Post", "dggb-blocks") },
      { value: "page", label: __("Page", "dggb-blocks") },
    ];

    // Section title tags
    const sectionTags = [
      { value: "div", label: __("div", "dggb-blocks") },
      { value: "header", label: __("header", "dggb-blocks") },
      { value: "section", label: __("section", "dggb-blocks") },
      { value: "article", label: __("article", "dggb-blocks") },
      { value: "main", label: __("main", "dggb-blocks") },
      { value: "aside", label: __("aside", "dggb-blocks") },
      { value: "footer", label: __("footer", "dggb-blocks") },
    ];

    // Section title tags
    const sectionTitleTags = [
      { value: "h2", label: __("H2", "dggb-blocks") },
      { value: "h3", label: __("H3", "dggb-blocks") },
      { value: "h4", label: __("H4", "dggb-blocks") },
      { value: "h5", label: __("H5", "dggb-blocks") },
      { value: "h6", label: __("H6", "dggb-blocks") },
    ];

    // Check for posts
    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;

    // Check the post type
    const isPost = "post" === attributes.postType;

    // Add instruction text to the select
    const dggbImageSizeSelect = {
      value: "selectimage",
      label: __("Select image size", "dggb-blocks"),
    };

    // Add the landscape image size to the select
    const dggbImageSizeLandscape = {
      value: "dggb-block-post-grid-landscape",
      label: __("DG Grid Landscape", "dggb-blocks"),
    };

    // Add the square image size to the select
    const dggbImageSizeSquare = {
      value: "dggb-block-post-grid-square",
      label: __("DG Grid Square", "dggb-blocks"),
    };

    // Get the image size options
    const imageSizeOptions = this.imageSizeSelect();

    // Combine the objects
    imageSizeOptions.push(dggbImageSizeSquare, dggbImageSizeLandscape);
    imageSizeOptions.unshift(dggbImageSizeSelect);

    const imageSizeValue = () => {
      for (let i = 0; i < imageSizeOptions.length; i++) {
        if (imageSizeOptions[i].value === attributes.imageSize) {
          return attributes.imageSize;
        }
      }
      return "full";
    };

    // Setup the page select options
    const pageOptions = this.pageSelect();

    return (
      <InspectorControls>
        <PanelBody
          title={__("Post and Page Grid Settings", "dggb-blocks")}
          className={isPost ? null : "dggb-blocks-hide-query"}
        >
          <RenderSettingControl id="dggb_postgrid_postType">
            <SelectControl
              label={__("Content Type", "dggb-blocks")}
              options={postTypeOptions}
              value={attributes.postType}
              onChange={(value) =>
                this.props.setAttributes({ postType: value })
              }
            />
          </RenderSettingControl>
          {"page" === attributes.postType && (
            <RenderSettingControl id="dggb_postgrid_selectedPages">
              <div className="components-base-control select2-page">
                <div className="components-base-control__field">
                  <label
                    className="components-base-control__label"
                    htmlFor="inspector-select-control"
                  >
                    {__("Pages To Show", "dggb-blocks")}
                  </label>
                  <Select
                    options={pageOptions}
                    value={attributes.selectedPages}
                    onChange={(value) =>
                      this.props.setAttributes({
                        selectedPages: value,
                      })
                    }
                    isMulti={true}
                    closeMenuOnSelect={false}
                  />
                </div>
              </div>
            </RenderSettingControl>
          )}
          {"post" === attributes.postType && (
            <Fragment>
              <RenderSettingControl id="dggb_postgrid_queryControls">
                <QueryControls
                  {...{ order, orderBy }}
                  numberOfItems={attributes.postsToShow}
                  categoriesList={categoriesList}
                  selectedCategoryId={attributes.categories}
                  onOrderChange={(value) => setAttributes({ order: value })}
                  onOrderByChange={(value) => setAttributes({ orderBy: value })}
                  onCategoryChange={(value) =>
                    setAttributes({
                      categories: "" !== value ? value : undefined,
                    })
                  }
                  onNumberOfItemsChange={(value) =>
                    setAttributes({ postsToShow: value })
                  }
                />
              </RenderSettingControl>
              <RenderSettingControl id="dggb_postgrid_offset">
                <RangeControl
                  label={__("Number of items to offset", "dggb-blocks")}
                  value={attributes.offset}
                  onChange={(value) => setAttributes({ offset: value })}
                  min={0}
                  max={20}
                />
              </RenderSettingControl>
            </Fragment>
          )}
          {"grid" === attributes.postLayout && (
            <RenderSettingControl id="dggb_postgrid_columns">
              <RangeControl
                label={__("Columns", "dggb-blocks")}
                value={attributes.columns}
                onChange={(value) => setAttributes({ columns: value })}
                min={1}
                max={
                  !hasPosts
                    ? MAX_POSTS_COLUMNS
                    : Math.min(MAX_POSTS_COLUMNS, latestPosts.length)
                }
              />
            </RenderSettingControl>
          )}
        </PanelBody>
        <PanelBody
          title={__("Post and Page Grid Content", "dggb-blocks")}
          initialOpen={false}
        >
          <RenderSettingControl id="dggb_postgrid_displaySectionTitle">
            <ToggleControl
              label={__("Display Section Title", "dggb-blocks")}
              checked={attributes.displaySectionTitle}
              onChange={() =>
                this.props.setAttributes({
                  displaySectionTitle: !attributes.displaySectionTitle,
                })
              }
            />
          </RenderSettingControl>
          {attributes.displaySectionTitle && (
            <RenderSettingControl id="dggb_postgrid_sectionTitle">
              <TextControl
                label={__("Section Title", "dggb-blocks")}
                type="text"
                value={attributes.sectionTitle}
                onChange={(value) =>
                  this.props.setAttributes({
                    sectionTitle: value,
                  })
                }
              />
            </RenderSettingControl>
          )}
          <RenderSettingControl id="dggb_postgrid_displayPostImage">
            <ToggleControl
              label={__("Display Featured Image", "dggb-blocks")}
              checked={attributes.displayPostImage}
              onChange={() =>
                this.props.setAttributes({
                  displayPostImage: !attributes.displayPostImage,
                })
              }
            />
          </RenderSettingControl>
          {attributes.displayPostImage && (
            <RenderSettingControl id="dggb_postgrid_imageSizeValue">
              <SelectControl
                label={__("Image Size", "dggb-blocks")}
                value={imageSizeValue()}
                options={imageSizeOptions}
                onChange={(value) =>
                  this.props.setAttributes({
                    imageSize: value,
                  })
                }
              />
            </RenderSettingControl>
          )}
          <RenderSettingControl id="dggb_postgrid_displayPostTitle">
            <ToggleControl
              label={__("Display Title", "dggb-blocks")}
              checked={attributes.displayPostTitle}
              onChange={() =>
                this.props.setAttributes({
                  displayPostTitle: !attributes.displayPostTitle,
                })
              }
            />
          </RenderSettingControl>
          {isPost && (
            <RenderSettingControl id="dggb_postgrid_displayPostAuthor">
              <ToggleControl
                label={__("Display Author", "dggb-blocks")}
                checked={attributes.displayPostAuthor}
                onChange={() =>
                  this.props.setAttributes({
                    displayPostAuthor: !attributes.displayPostAuthor,
                  })
                }
              />
            </RenderSettingControl>
          )}
          {isPost && (
            <RenderSettingControl id="dggb_postgrid_displayPostDate">
              <ToggleControl
                label={__("Display Date", "dggb-blocks")}
                checked={attributes.displayPostDate}
                onChange={() =>
                  this.props.setAttributes({
                    displayPostDate: !attributes.displayPostDate,
                  })
                }
              />
            </RenderSettingControl>
          )}
          <RenderSettingControl id="dggb_postgrid_displayPostExcerpt">
            <ToggleControl
              label={__("Display Excerpt", "dggb-blocks")}
              checked={attributes.displayPostExcerpt}
              onChange={() =>
                this.props.setAttributes({
                  displayPostExcerpt: !attributes.displayPostExcerpt,
                })
              }
            />
          </RenderSettingControl>
          {attributes.displayPostExcerpt && (
            <RenderSettingControl id="dggb_postgrid_excerptLength">
              <RangeControl
                label={__("Excerpt Length", "dggb-blocks")}
                value={attributes.excerptLength}
                onChange={(value) => setAttributes({ excerptLength: value })}
                min={0}
                max={150}
              />
            </RenderSettingControl>
          )}
          <RenderSettingControl id="dggb_postgrid_displayPostLink">
            <ToggleControl
              label={__("Display Continue Reading Link", "dggb-blocks")}
              checked={attributes.displayPostLink}
              onChange={() =>
                this.props.setAttributes({
                  displayPostLink: !attributes.displayPostLink,
                })
              }
            />
          </RenderSettingControl>
          {attributes.displayPostLink && (
            <RenderSettingControl id="dggb_postgrid_readMoreText">
              <TextControl
                label={__("Customize Continue Reading Text", "dggb-blocks")}
                type="text"
                value={attributes.readMoreText}
                onChange={(value) =>
                  this.props.setAttributes({
                    readMoreText: value,
                  })
                }
              />
            </RenderSettingControl>
          )}
        </PanelBody>
        <PanelBody
          title={__("Post and Page Grid Markup", "dggb-blocks")}
          initialOpen={false}
          className="ab-block-post-grid-markup-settings"
        >
          <RenderSettingControl id="dggb_postgrid_sectionTag">
            <SelectControl
              label={__("Post Grid Section Tag", "dggb-blocks")}
              options={sectionTags}
              value={attributes.sectionTag}
              onChange={(value) =>
                this.props.setAttributes({
                  sectionTag: value,
                })
              }
              help={__(
                "Change the post grid section tag to match your content hierarchy.",
                "dggb-blocks"
              )}
            />
          </RenderSettingControl>
          {attributes.sectionTitle && (
            <RenderSettingControl id="dggb_postgrid_sectionTitleTag">
              <SelectControl
                label={__("Section Title Heading Tag", "dggb-blocks")}
                options={sectionTitleTags}
                value={attributes.sectionTitleTag}
                onChange={(value) =>
                  this.props.setAttributes({
                    sectionTitleTag: value,
                  })
                }
                help={__(
                  "Change the post/page section title tag to match your content hierarchy.",
                  "dggb-blocks"
                )}
              />
            </RenderSettingControl>
          )}
          {attributes.displayPostTitle && (
            <RenderSettingControl id="dggb_postgrid_postTitleTag">
              <SelectControl
                label={__("Post Title Heading Tag", "dggb-blocks")}
                options={sectionTitleTags}
                value={attributes.postTitleTag}
                onChange={(value) =>
                  this.props.setAttributes({
                    postTitleTag: value,
                  })
                }
                help={__(
                  "Change the post/page title tag to match your content hierarchy.",
                  "dggb-blocks"
                )}
              />
            </RenderSettingControl>
          )}
        </PanelBody>
      </InspectorControls>
    );
  }
}
