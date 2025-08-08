// path: @/utils/schema-util.js

/**
 * Converts and maps columns from a schema based on a provided column mapping.
 *
 * If a valid columnMapping array is provided, it returns a new array where each item
 * is merged from the schema's column (matched by key) and the corresponding mapping config.
 * If no valid mapping is provided, it returns the original schema.
 *
 * @param {Array<Object>} schema - The array of column definitions, each with a `key` property.
 * @param {Array<Object>} columnMapping - The array of mapping objects, each with a `key` and optional config properties.
 * @returns {Array<Object>} The mapped and merged columns, or the original schema if no mapping is provided.
 */
export function buildSchema(schema, columnMapping) {
  if (Array.isArray(columnMapping) && columnMapping.length > 0) {
    return columnMapping
      .map((item) => {
        const col = schema.find((c) => c.key === item.key);
        if (!col) return null;
        const { key, ...configProps } = item;
        return { ...col, ...configProps };
      })
      .filter(Boolean);
  }
  return schema;
}

/**
 * Separates the provided props into field props, form item props, and rest props based on known prop names.
 * This function is used for form fields only and does not affect table display.
 *
 * @param {Object} props - The props object containing various properties for fields and form items.
 * @returns {Object} An object containing three functions:
 *   - fieldProps: Returns the separated field props.
 *   - formItemProps: Returns the separated form item props.
 *   - restProps: Returns the rest props that don't belong to field or form item props.
 */
export function buildSchemaProps(props) {
  // Known field props (for input components)
  const fieldPropNames = new Set([
    "disabled",
    "placeholder",
    "autoSize",
    "options",
    "allowClear",
    "showSearch",
    "mode",
    "size",
    "variant",
    "maxLength",
    "minLength",
    "rows",
    "cols",
    "readOnly",
    "defaultValue",
    "value",
    "onChange",
    "onBlur",
    "onFocus",
    "prefix",
    "suffix",
    "addonBefore",
    "addonAfter",
    "showCount",
    "status",
    "style",
    "format",
    "precision",
    "formatter",
  ]);

  // Known form item props
  const formItemPropNames = new Set([
    "required",
    "rules",
    "label",
    "layout",
    "labelCol",
    "wrapperCol",
    "colon",
    "extra",
    "hasFeedback",
    "help",
    "hidden",
    "htmlFor",
    "labelAlign",
    "messageVariables",
    "name",
    "normalize",
    "noStyle",
    "preserve",
    "shouldUpdate",
    "tooltip",
    "trigger",
    "validateFirst",
    "validateStatus",
    "validateTrigger",
    "valuePropName",
    "dependencies",
    "locale",
  ]);

  const restPropNames = new Set([""]);

  const customName = {
    customName: "customName",
  };

  // Separate props based on their names
  const fieldProps = {};
  const formItemProps = {};
  const restProps = {};

  for (const [key, value] of Object.entries(props)) {
    const mappedKey = customName[key] || key;

    if (fieldPropNames.has(key)) {
      fieldProps[mappedKey] = value;
    } else if (formItemPropNames.has(key)) {
      formItemProps[mappedKey] = value;
    } else if (restPropNames.has(key)) {
      restProps[mappedKey] = value;
    } else {
      // Props that don't belong to field or form item props
      restProps[key] = value;
    }
  }

  return {
    fieldProps: (_, config) => {
      if (!config?.proFieldProps) return { ...fieldProps };
      return {};
    },
    formItemProps: (_, config) => {
      if (!config?.proFieldProps) return { ...formItemProps };
      return {};
    },
    ...restProps,
  };
}
