import type { LANGUAGE_KEY } from "../lib/language";

/**
 * Represents the publication status of a series.
 * 
 * - `ongoing`: Series is currently being published
 * - `completed`: Series has finished publication
 * - `cancelled`: Series was cancelled before completion
 * - `hiatus`: Series is on temporary break
 * - `upcoming`: Series is announced but not yet released
 * - `unknown`: Status cannot be determined
 */
export type Status = 
  | "ongoing"
  | "completed"
  | "cancelled"
  | "hiatus"
  | "upcoming"
  | "unknown";

/**
 * Determines how additional content should be loaded when scrolling.
 * 
 * - `"auto"`: Automatically load more when reaching the end of the page
 * - `"manual"`: Require user to click a button to load more
 * - `"never"`: Never load more content automatically
 * 
 * @default "manual"
 */
export type LoadMoreStrategy = "auto" | "manual" | "never";

/**
 * Represents a language supported by the application.
 */
export interface Language {
  /** Unique identifier key for the language */
  key: LANGUAGE_KEY;
  /** Display name of the language */
  name: string;
  /** Emoji flag code representing the language/region */
  flagCode: string;
  /** ISO 639-1 two-letter language code */
  iso6391: string;
  /** Optional region specification (e.g., "United States", "Brazil") */
  region?: string;
}