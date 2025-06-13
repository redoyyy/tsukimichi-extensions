"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main/services/scrapers/manga/manga-bats.ts
var manga_bats_exports = {};
__export(manga_bats_exports, {
  default: () => manga_bats_default
});
module.exports = __toCommonJS(manga_bats_exports);
var import_cheerio = __toESM(require("cheerio"));

// src/lib/constants.ts
var NSFW_KEYWORDS = [
  "adult",
  "mature",
  "ecchi",
  "hentai",
  "yaoi",
  "yuri",
  "shounen ai",
  "shoujo ai",
  "seinen",
  "josei",
  "smut",
  "porn",
  "pornographic"
];

// src/main/services/scrapers/manga/base.ts
var BaseMangaScrapper = class {
  constructor() {
    this.defaultOptions = {
      timeout: 1e4,
      retries: 3,
      delay: 1e3
    };
  }
  async fetchHtml(url, options) {
    const {
      timeout,
      retries: retryTimes,
      delay,
      ...fetchOptions
    } = {
      ...this.defaultOptions,
      ...options
    };
    const retries = retryTimes || 3;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const res = await fetch(url, {
          signal: controller.signal,
          ...fetchOptions
        });
        clearTimeout(timeoutId);
        if (!res.ok)
          throw new Error(`HTTP error! status: ${res.status}`);
        return await res.text();
      } catch (error) {
        if (attempt === retries)
          throw new Error(
            `Failed to fetch ${url} after ${retries} attempts: ${error}`
          );
        if (delay && attempt < retries) {
          await new Promise(
            (resolve) => setTimeout(resolve, delay * attempt)
          );
        }
      }
    }
    throw new Error(`Failed to fetch ${url}`);
  }
  normalizeUrl(url) {
    return url.startsWith("http") ? url : `${this.baseUrl}${url}}`;
  }
  detectNsfw(genres, title, description) {
    const allText = [...genres, title, description].join(" ").toLowerCase();
    return NSFW_KEYWORDS.some((keyword) => allText.includes(keyword));
  }
  async validateUrl(url) {
    try {
      await this.fetchHtml(url);
      return true;
    } catch {
      return false;
    }
  }
  isValidMangaUrl(url) {
    return url.includes(this.baseUrl);
  }
};

// src/main/services/scrapers/manga/manga-bats.ts
var MangaBatsScrapper = class extends BaseMangaScrapper {
  constructor() {
    super(...arguments);
    this.sourceName = "MangaBats";
    this.baseUrl = "https://mangabats.com";
    this.headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
      "Accept-Language": "en-US,en;q=0.9",
      "Sec-Ch-Ua": '"Google Chrome";v="135", "Not(A:Brand";v="8", "Chromium";v="135"',
      Referer: this.baseUrl
    };
  }
  async searchManga(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `${this.baseUrl}/search/story/${encodedQuery}`;
    const html = await this.fetchHtml(url, { headers: this.headers });
    return this.parseMangaList(html);
  }
  async getMangaDetails(url) {
    const html = await this.fetchHtml(url, { headers: this.headers });
    const $ = import_cheerio.default.load(html);
    const $info = $(".manga-info-top");
    const title = $info.find("h1").first().text().trim();
    const authors = $info.find("li:contains('Author(s)') a").map((_, el) => $(el).text().trim()).get();
    const statusText = $info.find("li:contains('Status')").text().trim().toLowerCase();
    const status = statusText.includes("ongoing") ? "ongoing" : "completed";
    const imageUrl = $info.find(".manga-info-pic img").attr("src") || null;
    const description = "";
    const genres = $info.find("li.genres a").map((_, el) => $(el).text().trim()).get() || [];
    const isNsfw = this.detectNsfw(genres, title, description);
    const ratingStr = $info.find("input[type='hidden']").attr("default-stars")?.trim();
    const rating = ratingStr ? Number.parseFloat(ratingStr) : null;
    const lastUpdated = $info.find("li:contains('Last updated')").text().replace("Last updated :", "").trim() || null;
    const chapters = $(".chapter-list .row").map((_, row) => {
      const anchor = $(row).find("a");
      const url2 = anchor.attr("href");
      const title2 = anchor.attr("title");
      return {
        id: title2?.split(" ").join("-").toLowerCase() || "",
        title: anchor.attr("href")?.split("/").pop()?.split("-").join(" ") || "",
        createdAt: null,
        source: this.sourceName,
        url: url2 || ""
      };
    }).get();
    const mangaUrl = $('meta[property="og:url"]').attr("content") || $('link[rel="canonical"]').attr("href") || "";
    const mangaDetails = {
      id: title.split(" ").join("-"),
      title,
      alternateTitles: [],
      description: "",
      authors,
      status,
      imageUrl,
      genres,
      rating,
      lastUpdated,
      isNsfw,
      source: this.sourceName,
      chapters,
      totalChapters: chapters?.length || null,
      lang: "en",
      isLocal: false,
      mangaUrl
    };
    return mangaDetails;
  }
  async getChapterDetails(chapterUrl) {
    const html = await this.fetchHtml(chapterUrl, {
      headers: this.headers
    });
    const $ = import_cheerio.default.load(html);
    const chapterTitle = $("select.navi-change-chapter option[selected]").text()?.trim();
    const chapter = $(
      'span[itemprop="itemListElement"] span[itemprop="name"]'
    ).text().trim();
    const imageUrls = $(".container-chapter-reader img").map((_, el) => {
      const src = $(el).attr("src") || "";
      return src ? this.normalizeUrl(src) : "";
    }).get().filter((url2) => url2.length > 0);
    const url = $('link[rel="canonical"]').attr("href")?.trim();
    const nextChapter = $(".btn-navigation-chap a.back").attr("href");
    const previousChapter = $(".btn-navigation-chap a.next").attr("href");
    return {
      id: chapterTitle.split(" ").join("-"),
      title: chapterTitle,
      chapter,
      imageUrls,
      nextChapter: nextChapter ? this.normalizeUrl(nextChapter) : null,
      previousChapter: previousChapter ? this.normalizeUrl(previousChapter) : null,
      source: this.sourceName,
      totalPages: imageUrls?.length || 0,
      url: url || ""
    };
  }
  parseMangaList(html) {
    const $ = import_cheerio.default.load(html);
    const mangaLists = [];
    $(".panel_story_list .story_item").each((_, element) => {
      const title = $(element).find(".story_name a").text().trim();
      const url = $(element).find(".story_name a").attr("href") || "";
      const author = $(element).find("span").filter((_2, el) => $(el).text().startsWith("Author(s)")).text().replace("Author(s) :", "").trim();
      const updated = $(element).find("span").filter((_2, el) => $(el).text().startsWith("Updated")).text().replace("Updated :", "").trim();
      const imageUrl = $(element).find("img").attr("src") || null;
      const chapterLinks = $(element).find(".story_chapter a");
      const chapterNumbers = chapterLinks.map((_2, link) => {
        const match = $(link).attr("title")?.match(/Chapter\s+(\d+(?:\.\d+)?)/i);
        return match ? Number.parseFloat(match[1]) : null;
      }).get().filter((num) => num !== null);
      const totalChapters = Math.max(...chapterNumbers);
      mangaLists.push({
        id: title.split(" ").join("-"),
        title,
        description: "",
        alternateTitles: [],
        authors: author.split(", "),
        status: "unknown",
        imageUrl,
        genres: null,
        rating: null,
        lastUpdated: updated,
        isNsfw: null,
        source: this.sourceName,
        mangaUrl: url,
        totalChapters,
        chapters: null,
        lang: "en",
        isLocal: false
      });
    });
    return mangaLists;
  }
};
var mangaBatsScraper = new MangaBatsScrapper();
var manga_bats_default = mangaBatsScraper;
