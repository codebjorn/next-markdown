import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export class Markdown {
  static async getFrontMatter(markdown: string) {
    return matter(markdown);
  }

  static async getHtml(markdown: string) {
    const process = await remark().use(html).process(markdown);
    return process.toString();
  }
}
