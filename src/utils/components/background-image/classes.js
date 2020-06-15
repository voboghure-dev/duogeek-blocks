import { dimRatioToClass } from "./shared";

/**
 * Background image classes.
 *
 * @param {Object} attributes
 */
function BackgroundImageClasses(attributes) {
  return [
    attributes.backgroundDimRatio !== undefined &&
    100 !== attributes.backgroundDimRatio
      ? "dggb-has-background-dim"
      : null,
    dimRatioToClass(attributes.backgroundDimRatio),
    attributes.backgroundImgURL &&
    attributes.backgroundSize &&
    "no-repeat" === attributes.backgroundRepeat
      ? "dggb-background-" + attributes.backgroundSize
      : null,
    attributes.backgroundImgURL && attributes.backgroundRepeat
      ? "dggb-background-" + attributes.backgroundRepeat
      : null,
    attributes.hasParallax ? "dggb-has-parallax" : null,
  ];
}

export default BackgroundImageClasses;
