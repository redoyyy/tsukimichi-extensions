/** Base interface for media tracks */
interface BaseTrack {
  /** Display label for the track */
  label: string;
  /** URL of the track file */
  url: string;
  /** Whether this is the default track */
  default?: boolean;
}

/** Subtitle or caption track */
export interface SubtitleTrack extends BaseTrack {
  /** Language code (e.g., "en", "es") */
  lang: string;
  /** Type of text track */
  kind: "captions" | "subtitles";
}

/** Audio track (dubs, commentary, etc.) */
export interface AudioTrack extends BaseTrack {
  /** Optional language code */
  lang?: string;
  /** Track type */
  kind: "audio";
}

/** Auxiliary tracks (thumbnails, metadata, etc.) */
export interface AuxiliaryTrack extends BaseTrack {
  /** Track type */
  kind: "thumbnails" | "metadata";
}

/** HTTP headers as key-value pairs */
type HttpHeaders = Record<string, string>;

/** Represents a time segment (intro/outro) */
export type Segment = {
  /** Start time in seconds */
  start: number;
  /** End time in seconds */
  end: number;
};

/**
 * Represents a video source with all associated tracks and metadata.
 */
export interface Video {
  /**
   * Human-readable label for the video source
   */
  label: string;

  /**
   * Source URL of the video file
   */
  url: string;

  /**
   * MIME type of the video source
   * 
   * @example
   * "video/mp4" for MP4 video
   * "application/dash+xml" for DASH video
   * "application/x-mpegURL" for HLS video
   */
  type?: string;

  /**
   * Video quality identifier (height in pixels)
   * @example 1080, 720, 480, 360
   */
  quality?: number;

  /**
   * Poster image shown before playback
   */
  poster?: string;

  /**
   * Optional HTTP headers to be sent by the server-side proxy
   * when requesting the video source
   * 
   * @remarks Used server-side only. Keys are case-insensitive,
   * but lowercased keys are recommended.
   */
  headers?: HttpHeaders;

  /**
   * Marks this video as default selection when multiple
   * video sources are available
   */
  default?: boolean;

  /**
   * Text tracks for accessibility and localization.
   * Includes subtitles and captions.
   */
  subtitleTracks?: SubtitleTrack[];

  /**
   * Alternative audio tracks.
   * Examples: different languages, commentary, audio descriptions
   */
  audioTracks?: AudioTrack[];

  /**
   * Auxiliary non-audio/non-subtitle tracks.
   * Examples: thumbnail sprites, chapter metadata
   */
  tracks?: AuxiliaryTrack[];

  /**
   * Optional intro segment of the video.
   * Used for skip/intro detection.
   */
  intro?: Segment;

  /**
   * Optional outro segment of the video.
   * Used for skip/next episode detection.
   */
  outro?: Segment;
}

/** Track data transfer object */
export interface TrackDto {
  /** URL of the track file */
  file: string;
  /** Type of track */
  kind: string;
  /** Display label */
  label?: string;
  /** Whether this is the default track */
  default?: boolean;
}

/** Video source data transfer object */
export type VideoSource = {
  /** URL of the video file */
  file: string;
  /** MIME type of the video */
  type?: string;
};

/**
 * Complete video streaming response from an extension.
 */
export interface VideoStreamResponse {
  /** Available video sources */
  sources: VideoSource[];
  /** All tracks (including subtitles, thumbnails, etc.) */
  tracks?: TrackDto[];
  /** Quick-access subtitle tracks */
  subtitles?: TrackDto[];
  /** Intro segment timings */
  intro?: Segment;
  /** Outro segment timings */
  outro?: Segment;
  /** Referer URL for requests */
  referer: string;
}