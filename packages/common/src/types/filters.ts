/**
 * Available filter types for search/filtering.
 */
export type FilterType =
  | "text"
  | "select"
  | "multi-select"
  | "checkbox"
  | "radio"
  | "number"
  | "date"
  | "date-range";

/** Base interface for all filter types */
export interface BaseFilter {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Filter type */
  type: FilterType;
  /** Whether filter is required */
  required?: boolean;
  /** Optional description */
  description?: string;
  /** Default value */
  defaultValue?: string | number | boolean;
}

/** Filter option for select/multi-select/radio */
export interface FilterOption {
  /** Option value */
  value: string | number | boolean;
  /** Display label */
  label: string;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Default value for this option */
  defaultValue?: string | number | boolean;
}

/** Text input filter */
export interface TextFilter extends BaseFilter {
  type: "text";
  /** Placeholder text */
  placeholder?: string;
  /** Maximum character length */
  maxLength?: number;
}

/** Single-select dropdown filter */
export interface SelectFilter extends BaseFilter {
  type: "select";
  /** Available options */
  options: Array<FilterOption>;
  multiple?: false;
}

/** Multi-select dropdown filter */
export interface MultiSelectFilter extends BaseFilter {
  type: "multi-select";
  /** Available options */
  options: Array<FilterOption>;
  multiple: true;
  /** Maximum number of selectable items */
  maxSelection?: number;
  /** How to render the filter */
  renderAs?: "checkbox-group" | "select";
}

/** Checkbox filter */
export interface CheckboxFilter extends BaseFilter {
  type: "checkbox";
  /** Default checked state */
  defaultValue?: boolean;
}

/** Radio button group filter */
export interface RadioFilter extends BaseFilter {
  type: "radio";
  /** Available options */
  options: Array<FilterOption>;
}

/** Number input filter */
export interface NumberFilter extends BaseFilter {
  type: "number";
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
}

/** Date picker filter */
export interface DateFilter extends BaseFilter {
  type: "date";
  /** Minimum allowed date (ISO format) */
  minDate?: string;
  /** Maximum allowed date (ISO format) */
  maxDate?: string;
}

/** Date range picker filter */
export interface DateRangeFilter extends BaseFilter {
  type: "date-range";
  /** Minimum allowed date (ISO format) */
  minDate?: string;
  /** Maximum allowed date (ISO format) */
  maxDate?: string;
}

/** Union of all filter types */
export type Filter =
  | TextFilter
  | SelectFilter
  | MultiSelectFilter
  | CheckboxFilter
  | RadioFilter
  | NumberFilter
  | DateFilter
  | DateRangeFilter;

/** Complete filter configuration for an extension */
export interface ExtensionFilterConfig {
  /** Extension identifier */
  extensionId: string;
  /** Extension display name */
  extensionName: string;
  /** Optional header text */
  header?: string;
  /** Array of supported filters */
  supportedFilters: Filter[];
}

/** Options for search operations */
export interface SearchOptions {
  /** Page number for pagination */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Filter values */
  filters?: {
    /** Whether to include NSFW content */
    includeNsfw?: boolean;
    /** Additional filter values */
    [key: string]: any;
  };
}