/**
 * Metadata describing an extension's capabilities and identification.
 */
export interface ExtensionMetadata {
  /**
   * Unique identifier for the extension
   */
  id: string;
  
  /**
   * Display name of the extension
   */
  name: string;

  /**
   * The class name of the extension implementation
   */
  extClass: string;

  /**
   * Optional description of the extension's functionality
   */
  description?: string;
  
  /**
   * Base URL of the extension/site without trailing slash
   * @example "https://mangadex.org"
   */
  url: string;
  
  /**
   * URL of the extension/site icon
   */
  iconUrl: string;
  
  /**
   * Whether the extension contains any NSFW content
   */
  containsNSFWContent: boolean;
  
  /**
   * Whether the extension is solely focused on NSFW content.
   * If `true`, the extension is primarily for adult content.
   */
  isNSFWFocused: boolean;
  
  /**
   * Base URL for API endpoints (if different from main url)
   */
  apiUrl?: string;
  
  /**
   * Extension version following semantic versioning
   * @see {@link https://semver.org/}
   */
  version?: string;
  
  /** Whether this is a manga extension (vs anime) */
  isManga: boolean;
  
  /** Minimum compatible app version */
  minAppVersion: string;
  
  /** Whether the extension supports fetching latest series */
  supportsLatest: boolean;
  
  /** Whether the extension supports fetching popular series */
  supportsPopular: boolean;
  
  /** Whether chapter images require proxying */
  requireChapterImageProxy: boolean;
  
  /** Whether cover images require proxying */
  requireCoverImageProxy: boolean;
}

/**
 * Electron cookie representation for authentication.
 */
export interface ElectronCookie {
  /** Cookie domain */
  domain?: string;
  /** Cookie expiration timestamp */
  expirationDate?: number;
  /** Whether cookie is host-only */
  hostOnly?: boolean;
  /** Whether cookie is HTTP-only */
  httpOnly?: boolean;
  /** Cookie name */
  name: string;
  /** Cookie path */
  path?: string;
  /** SameSite policy */
  sameSite: "unspecified" | "no_restriction" | "lax" | "strict";
  /** Whether cookie requires secure connection */
  secure?: boolean;
  /** Whether cookie is session-only */
  session?: boolean;
  /** Cookie value */
  value: string;
}