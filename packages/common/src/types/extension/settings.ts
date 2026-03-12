/**
 * Available setting input types for extension configuration.
 */
export type SettingsType =
  | "toggle"
  | "text"
  | "password"
  | "number"
  | "select"
  | "multi-select"
  | "radio"
  | "checkbox";

/** Base interface for all setting types */
export interface BaseSetting {
  /** Unique key for the setting */
  key: string;
  /** Display label */
  label: string;
  /** Optional description/help text */
  description?: string;
  /** Setting type */
  type: SettingsType;
}

/** Toggle/boolean setting */
export interface ToggleSetting extends BaseSetting {
  type: "toggle";
  /** Default value */
  defaultValue: boolean;
}

/** Text input setting */
export interface TextSetting extends BaseSetting {
  type: "text";
  /** Default text value */
  defaultValue: string;
  /** Placeholder text */
  placeholder?: string;
}

/** Password input setting */
export interface PasswordSetting extends BaseSetting {
  type: "password";
  /** Default password (should usually be empty) */
  defaultValue: string;
  /** Placeholder text */
  placeholder?: string;
}

/** Number input setting */
export interface NumberSetting extends BaseSetting {
  type: "number";
  /** Default numeric value */
  defaultValue: number;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment */
  step?: number;
}

/** Option for select/multi-select/radio inputs */
interface Option {
  /** Display label */
  label: string;
  /** Option value */
  value: string;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Default value for this option (for multi-select) */
  defaultValue?: string;
}

/** Single-select dropdown setting */
export interface SelectSetting extends BaseSetting {
  type: "select";
  /** Default selected value */
  defaultValue: string;
  /** Available options */
  options: Option[];
}

/** Multi-select dropdown setting */
export interface MultiSelectSetting extends BaseSetting {
  type: "multi-select";
  /** Default selected values */
  defaultValue: string[];
  /** Available options */
  options: Option[];
}

/** Radio button group setting */
export interface RadioSetting extends BaseSetting {
  type: "radio";
  /** Default selected value */
  defaultValue: string;
  /** Available options */
  options: Option[];
}

/** Checkbox setting */
export interface CheckboxSetting extends BaseSetting {
  type: "checkbox";
  /** Default checked state */
  defaultValue: boolean;
}

/** Union of all setting types */
export type Setting =
  | ToggleSetting
  | TextSetting
  | PasswordSetting
  | NumberSetting
  | SelectSetting
  | MultiSelectSetting
  | RadioSetting
  | CheckboxSetting;

/** Complete extension settings configuration */
export interface ExtensionSettings {
  /** Extension identifier */
  extensionId: string;
  /** Extension display name */
  extensionName: string;
  /** Array of setting definitions */
  settings: Setting[];
}

/** Available server option */
export interface Server {
  /** Display name */
  name: string;
  /** Server value/identifier */
  value: string;
  /** Optional description */
  description?: string;
  /** Whether this is the default server */
  isDefault?: boolean;
}

/** Server preferences configuration */
export interface ServerPreferences {
  /** Available servers */
  servers: Server[];
  /** Default server value */
  defaultServer: string;
  /** Currently selected server */
  currentServer: Server;
}
