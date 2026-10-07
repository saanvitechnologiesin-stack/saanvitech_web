import { ArticleType } from "./article";
import { AuthorType } from "./author";

export interface ArticleCardType {
    article: ArticleType;
    width: number;
    height: number;
    alt?: string;
    author?: AuthorType;
    showDate: boolean;
}
