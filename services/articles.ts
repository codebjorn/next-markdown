import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { Markdown } from "./markdown";

export type ArticleData = {
  date: string;
  title: string;
  excerpt: string;
  url: string;
  html: string;
};

export class Articles {
  #path: string;
  #names: string[];

  constructor() {
    this.#path = join(process.cwd(), "articles");
    this.#names = readdirSync(this.#path);
  }

  static make() {
    return new Articles();
  }

  async getAll() {
    return Promise.all(this.getSlugs().map((slug) => this.get(slug)));
  }

  async get(slug: string): Promise<ArticleData> {
    const rawContent = this.#getRawContent(slug);
    const frontMatter = await Markdown.getFrontMatter(rawContent);
    const html = await Markdown.getHtml(frontMatter.content);

    return {
      date: this.#getArticleDate(slug),
      title: frontMatter.data.title,
      excerpt: `${frontMatter.content.substring(0, 100)}...`,
      url: `/blog/${slug}`,
      html,
    };
  }

  getSlugs() {
    return this.#names.map(this.#toSlug);
  }

  #getRawContent(slug: string) {
    const fullPath = this.#getFullPath(slug);
    return readFileSync(fullPath, "utf8");
  }

  #getArticleDate(slug: string) {
    const fullPath = this.#getFullPath(slug);
    return statSync(fullPath).mtime.toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  #getFullPath(slug: string) {
    const realSlug = this.#getRealName(slug);
    return join(this.#path, `${realSlug}.md`);
  }

  #getRealName(slug: string) {
    const indexOfSlug = this.getSlugs().indexOf(slug);
    const realSlug = this.#names.at(indexOfSlug);

    if (!realSlug) {
      throw new Error(`Unable to find this slug ${slug}`);
    }

    return realSlug.replace(/\.md$/, "");
  }

  #toSlug(string: string) {
    return string
      .toLowerCase()
      .replace(/\.md$/, "")
      .replace(/[&\/\\#,+()$~%'":*?!<>{}]/g, "")
      .replace(/ /g, "-");
  }
}
