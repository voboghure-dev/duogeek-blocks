/**
 * Internal dependencies.
 */
import RenderSettingControl from "../../utils/components/settings/renderSettingControl";

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { SelectControl, ToggleControl } = wp.components;
const { PanelColorSettings } = wp.blockEditor;

export default function ButtonSettings(props) {
  const {
    enableButtonBackgroundColor,
    buttonBackgroundColor,
    onChangeButtonColor = () => {},
    enableButtonTextColor,
    buttonTextColor,
    onChangeButtonTextColor = () => {},
    enableButtonSize,
    buttonSize,
    onChangeButtonSize = () => {},
    enableButtonShape,
    buttonShape,
    onChangeButtonShape = () => {},
    enableButtonTarget,
    buttonTarget,
    onChangeButtonTarget = () => {},
  } = props;

  // Button size values
  const buttonSizeOptions = [
    {
      value: "dggb-button-size-small",
      label: __("Small", "dggb-blocks"),
    },
    {
      value: "dggb-button-size-medium",
      label: __("Medium", "dggb-blocks"),
    },
    {
      value: "dggb-button-size-large",
      label: __("Large", "dggb-blocks"),
    },
    {
      value: "dggb-button-size-extralarge",
      label: __("Extra Large", "dggb-blocks"),
    },
  ];

  // Button shape
  const buttonShapeOptions = [
    {
      value: "dggb-button-shape-square",
      label: __("Square", "dggb-blocks"),
    },
    {
      value: "dggb-button-shape-rounded",
      label: __("Rounded Square", "dggb-blocks"),
    },
    {
      value: "dggb-button-shape-circular",
      label: __("Circular", "dggb-blocks"),
    },
  ];

  return (
    <Fragment>
      <RenderSettingControl id="dggb_button_buttonOptions">
        {false !== enableButtonTarget && (
          <ToggleControl
            label={__("Open link in new window", "dggb-blocks")}
            checked={buttonTarget}
            onChange={onChangeButtonTarget}
          />
        )}
        {false !== enableButtonSize && (
          <SelectControl
            selected={buttonSize}
            label={__("Button Size", "dggb-blocks")}
            value={buttonSize}
            options={buttonSizeOptions.map(({ value, label }) => ({
              value,
              label,
            }))}
            onChange={onChangeButtonSize}
          />
        )}
        {false !== enableButtonShape && (
          <SelectControl
            label={__("Button Shape", "dggb-blocks")}
            value={buttonShape}
            options={buttonShapeOptions.map(({ value, label }) => ({
              value,
              label,
            }))}
            onChange={onChangeButtonShape}
          />
        )}
        {false !== enableButtonBackgroundColor && (
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
        )}
        {false !== enableButtonTextColor && (
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
        )}
      </RenderSettingControl>
    </Fragment>
  );
}
