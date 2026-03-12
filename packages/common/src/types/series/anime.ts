import type { Status } from "../core";

/**
 * Represents an anime series from an extension source.
 */
export interface Anime {
  /** Unique identifier for the anime */
  id: string;
  /** Identifier of the extension that provides this anime */
  extensionId: string;
  /** Main title of the anime */
  title: string;
  /** Publication status of the anime */
  status: Status;
  /** URL of the cover image, or null if not available */
  coverImageUrl: string | null;
  /** Name or identifier of the content source (e.g., website name) */
  source: string;
  /** URL of the anime, relative to the base URL of the source */
  url: string;
  /** Whether the anime contains NSFW content, or null if unknown */
  isNsfw: boolean | null;
  /** List of animation studios */
  studios?: string[];
  /** List of production companies */
  producers?: string[];
  /** List of genres */
  genres?: string[] | null;
  /** Full description or synopsis */
  description?: string | null;
  /** Alternative titles (including translations) */
  alternateTitles?: string[] | null;
  /** ISO timestamp of last update */
  lastUpdated?: string | null;
  /** Rating score (typically 0-10 or 0-100) */
  rating?: number | null;
  /** Whether this anime is stored locally */
  isLocal?: boolean;
  /** Air date information */
  aired?: {
    /** Start air date */
    from?: string | null;
    /** End air date (null if still airing) */
    to?: string | null;
  };
}

/**
 * Represents a video server option for streaming.
 */
export interface VideoServer {
  /** Unique identifier for the server */
  id: string;
  /** Display name of the server */
  name: string;
  /** Type of server (e.g., "gogoanime", "zoro") */
  type: string;
  /** Display order index */
  index: number;
  /** URL or identifier for accessing the server */
  link: string;
}

/**
 * Collection of video servers categorized by audio type.
 */
export interface EpisodeServers {
  /** Servers with subtitled content */
  subs: VideoServer[];
  /** Servers with dubbed content */
  dubs: VideoServer[];
  /** Servers with mixed subtitle/dub options */
  mixed: VideoServer[];
  /** Servers with raw (unsubbed) content */
  raw: VideoServer[];
}

/**
 * Represents a single episode of an anime.
 */
export interface Episode {
  /** Unique identifier for the episode */
  id: string;
  /** Identifier of the extension that provides this episode */
  extensionId: string;
  /** Name or identifier of the content source */
  source: string;
  /** Display title of the episode */
  title: string;
  /** URL of the episode, relative to the base URL of the source */
  url: string;
  /** URL of the previous episode (if available) */
  previousEpisode?: string | null;
  /** URL of the next episode (if available) */
  nextEpisode?: string | null;
  /** ISO timestamp of last update */
  lastUpdated?: string | null;
  /** Numeric episode number */
  episodeNumber?: number | null;
  /** Available servers for this episode */
  episodeServers: EpisodeServers;
  /** Whether this is a filler episode (non-canonical) */
  isFiller?: boolean;
}