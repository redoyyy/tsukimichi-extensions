import type {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Session,
} from "electron";
import type { LoadMoreStrategy, Status } from "../core";
import type { ExtensionFilterConfig, SearchOptions } from "../filters";
import type {
  Anime,
  Episode,
  EpisodeServers,
  VideoServer,
} from "../series/anime";
import type { Chapter, ChapterPages, Manga } from "../series/manga";
import type { ElectronCookie, ExtensionMetadata } from "./metadata";
import type { ExtensionSettings, Server, ServerPreferences } from "./settings";
import type { Video } from "./video";

/** Media type supported by extensions */
export type MediaType = "manga" | "anime";

// ==================== Function Types ====================

/** Gets the extension version */
export type GetExtensionVersion = () => string;

/** Gets available extensions */
export type GetExtensions<
  T extends MediaType,
  K extends string = string,
> = () => Record<
  K,
  {
    metadata: ExtensionMetadata;
    client: ExtensionClientInterface<T>;
  }
>;

/** Searches for series */
export type SearchSeries<T> = (
  query?: string,
  options?: ScrapingOptions
) => Promise<SeriesListResponse<T>>;

/** Gets a specific series */
export type GetSeries<T> = (
  query: string,
  options?: ScrapingOptions
) => Promise<T | null>;

/** Gets popular series */
export type GetPopularSeries<T> = (
  options?: ScrapingOptions
) => Promise<SeriesListResponse<T>>;

/** Gets latest series */
export type GetLatestSeries<T> = (
  options?: ScrapingOptions
) => Promise<SeriesListResponse<T>>;

/** Gets manga chapters */
export type GetMangaChapters = (
  query: string,
  options?: ScrapingOptions
) => Promise<Chapter[]>;

/** Gets chapter pages */
export type GetChapterPages = (
  query: string,
  options?: ScrapingOptions
) => Promise<ChapterPages>;

/** Gets an image */
export type GetImage = (url: string) => Promise<{
  data: ArrayBuffer;
  contentType: string;
}>;

/** Gets filter configuration */
export type GetFilterConfig = (
  params?: GetFilterConfigParams
) => ExtensionFilterConfig;

/** Gets series status */
export type GetSeriesStatus = (status?: string | null) => Status;

/** Gets login URL */
export type GetLoginUrl = () => string;

/** Checks if user is logged in */
export type IsLoggedIn = (cookies: ElectronCookie[]) => boolean;

/** Updates chapter history */
export type UpdateChapter = (
  args: HistoryUpdateArgs,
  cookies: ElectronCookie[]
) => Promise<UpdateChapterResult>;

/** Updates episode history */
export type UpdateEpisode = (
  args: HistoryUpdateArgs,
  cookies: ElectronCookie[]
) => Promise<UpdateHistoryResult>;

/** Gets available servers */
export type GetAvailableServers = () => Server[];

/** Gets server preferences */
export type GetServerPreferences = (
  currentServerValue?: string
) => ServerPreferences;

/** Gets metadata */
export type GetMetadata = () => ExtensionMetadata;

/** Gets episodes */
export type GetEpisodes = (
  query: string,
  options?: ScrapingOptions
) => Promise<Episode[]>;

/** Gets specific episode */
export type GetEpisode = (
  query: string,
  options?: ScrapingOptions
) => Promise<Episode>;

/** Gets episode servers */
export type GetEpisodeServers = (episodeId: string) => Promise<EpisodeServers>;

/** Gets streaming data */
export type GetStreamingData = (
  server: VideoServer | string
) => Promise<Video[]>;

/** Gets video servers */
export type GetVideoServers = (episodeId: string) => Promise<VideoServer[]>;

// ==================== Interfaces ====================

/** Options for request timeouts */
export interface RequestTimeoutOptions {
  /** Timeout in milliseconds */
  timeout?: number;
  /** Number of retry attempts */
  retries?: number;
  /** Delay between retries in milliseconds */
  delay?: number;
}

/** Options for scraping operations */
export interface ScrapingOptions {
  /** Timeout configuration */
  timeoutOptions?: RequestTimeoutOptions;
  /** Search-specific options */
  searchOptions?: SearchOptions;
}

/** Paginated series list response */
export interface SeriesListResponse<T> {
  /** Array of series data */
  data: T[];
  /** Pagination information */
  pagination?: {
    /** Whether more pages are available */
    hasMore: boolean;
    /** Next page number (null if no more) */
    nextPage: number | null;
  };
}

/** Parameters for getting filter config */
export interface GetFilterConfigParams {
  /** Whether to include NSFW filters */
  includeNsfw?: boolean;
}

/** Arguments for history updates */
export interface HistoryUpdateArgs {
  /** Reading progress (0-100) */
  progress?: number;
  /** Whether chapter/episode is completed */
  completed?: boolean;
  /** Additional JSON data */
  json?: any;
  /** Chapter/Episode identifier */
  chapterId?: string;
  /** Additional dynamic properties */
  [key: string]: any;
}

/** Result of chapter update */
export interface UpdateChapterResult {
  /** Result message */
  message: string;
  /** Whether update was successful */
  success: boolean;
}

/** Result of history update */
export type UpdateHistoryResult = UpdateChapterResult;

/** Constructor options for extension client */
export interface ExtensionClientConstructorOptions {
  /** Extension settings */
  settings?: Record<string, any>;
  /** Function to get a browser window */
  getBrowserWindow?: (
    options?: BrowserWindowConstructorOptions
  ) => BrowserWindow | null;
  /** Function to get a session */
  getSession?: () => Session;
}

/** Base extension client interface */
export interface BaseExtensionClientInterface<T> {
  /** Base URL of the source */
  baseUrl: string;

  /** Extension metadata */
  extensionMetadata: ExtensionMetadata;
  /** Whether supports latest series */
  supportsLatest: boolean;
  /** Whether supports popular series */
  supportsPopular: boolean;
  /** Load more strategy */
  loadMoreStrategy?: LoadMoreStrategy;

  // Core methods
  /** Search for series */
  searchSeries: SearchSeries<T>;
  /** Get specific series */
  getSeries: GetSeries<T>;
  /** Get popular series */
  getPopularSeries: GetPopularSeries<T>;
  /** Get latest series */
  getLatestSeries: GetLatestSeries<T>;
  /** Convert source status to standard status */
  getSeriesStatus: GetSeriesStatus;

  /** Get filter configuration */
  getFilterConfig: GetFilterConfig;
  /** Extension settings preferences */
  settingsPreferences?: ExtensionSettingsPreferences;
  /** Get image data */
  getImage: GetImage;
  /** Get extension metadata */
  getMetadata: GetMetadata;

  /** Whether login is enabled */
  loginEnabled?: boolean;
  /** Get login URL */
  getLoginUrl?: GetLoginUrl;
  /** Check if user is logged in */
  isLoggedIn?: IsLoggedIn;
}

/** Manga extension client interface */
export interface MangaExtensionClientInterface
  extends BaseExtensionClientInterface<Manga> {
  /** Get all chapters */
  getChapters: GetMangaChapters;
  /** Get chapter pages */
  getChapterPages: GetChapterPages;
  /** Update chapter progress */
  updateChapter?: UpdateChapter;
}

/** Anime extension client interface */
export interface AnimeExtensionClientInterface
  extends BaseExtensionClientInterface<Anime> {
  /** Get specific episode */
  getEpisode: GetEpisode;
  /** Get all episodes */
  getEpisodes: GetEpisodes;
  /** Get video servers */
  getVideoServers: GetVideoServers;
  /** Get episode servers */
  getEpisodeServers: GetEpisodeServers;
  /** Get streaming data */
  getStreamingData: GetStreamingData;
  /** Update episode progress */
  updateEpisode?: UpdateEpisode;
}

/** Extension client interface (conditional on media type) */
export type ExtensionClientInterface<T extends MediaType> = T extends "manga"
  ? MangaExtensionClientInterface
  : T extends "anime"
    ? AnimeExtensionClientInterface
    : never;

/** Extension settings preferences function */
export type ExtensionSettingsPreferences = () => ExtensionSettings;
