import type { LANGUAGE_KEY } from "../../lib/language";
import type { Status } from "../core";

/**
 * Represents a manga series from an extension source.
 */
export interface Manga {
  /** Unique identifier for the manga */
  id: string;
  /** Identifier of the extension that provides this manga */
  extensionId: string;
  /** Main title of the manga */
  title: string;
  /** Publication status of the manga */
  status: Status;
  /** URL of the cover image, or null if not available */
  coverImageUrl: string | null;
  /** Name or identifier of the content source (e.g., website name) */
  source: string;
  /** URL of the manga, relative to the base URL of the source */
  url: string;
  /** Whether the manga contains NSFW content, or null if unknown */
  isNsfw: boolean | null;
  /** Full description or synopsis of the manga */
  description?: string | null;
  /** List of authors/creators */
  authors?: string[] | null;
  /** List of tags/categories */
  tags?: string[] | null;
  /** List of artists (if different from authors) */
  artists?: string[] | null;
  /** List of genres */
  genres?: string[] | null;
  /** ISO timestamp of last update */
  lastUpdated?: string | null;
  /** Alternative titles (including translations) */
  alternateTitles?: string[] | null;
  /** Rating score (typically 0-10 or 0-100) */
  rating?: number | null;
  /** Whether this manga is stored locally */
  isLocal?: boolean;
}

/**
 * Represents a single chapter of a manga.
 */
export interface Chapter {
  /**
   * Unique identifier for this chapter.
   * Should be stable and consistent across fetches.
   */
  id: string;

  /**
   * Identifier of the extension that provides this chapter.
   * Used internally to map the chapter back to its source implementation.
   */
  extensionId: string;

  /**
   * Name or identifier of the content source (e.g., website name).
   */
  source: string;

  /**
   * Display title of the chapter.
   * @example "Chapter 12", "Episode 5", etc.
   */
  title: string;

  /**
   * URL of the chapter.
   */
  url: string;

  /**
   * Array of image URLs representing the chapter pages.
   * 
   * @deprecated No longer used. Kept for backwards compatibility
   * with older extensions and existing app database entries.
   * 
   * To prevent TypeScript errors, extensions can safely pass an empty array ([]).
   */
  imageUrls: string[];

  /**
   * Language identifier key for the chapter content.
   * Used for filtering purposes.
   */
  languageKey: LANGUAGE_KEY;

  /**
   * URL of the next chapter (if available).
   * Used for navigation.
   */
  nextChapter?: string | null;

  /**
   * URL of the previous chapter (if available).
   * Used for navigation
   */
  previousChapter?: string | null;

  /**
   * Total number of pages (e.g., total images) in the chapter.
   * 
   * @deprecated No longer used. Kept for backwards compatibility.
   * 
   * To prevent TypeScript errors, extensions can safely pass `0`.
   */
  totalPages: number;

  /**
   * ISO timestamp indicating when the chapter was last updated.
   * @example "2024-01-31T12:34:56Z"
   */
  lastUpdated?: string | null;

  /**
   * Numeric chapter number (if applicable).
   * Useful for sorting and structured navigation.
   * @example 12, 12.5, etc.
   */
  chapterNumber?: number | null;

  /**
   * Numeric volume number (if applicable).
   * Useful for grouping chapters.
   */
  volumeNumber?: number | null;

  /**
   * Name of the scanlation/release group or provider.
   * @example "FanScans, SomeOther Scans"
   */
  groupName?: string | null;
}

/**
 * Represents a single page within a chapter.
 */
export interface ChapterPage {
  /** Zero-based index of the page */
  index: number;
  /** URL of the page image */
  url: string;
}

/** Collection of chapter pages */
export type ChapterPages = ChapterPage[];