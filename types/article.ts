export interface ArticleType {
    id: number;
    title: string;
    slug?: string;
    content: string;
    excerpt?: string;
    category?: string;
    image?: string | null;
    video?: string | null;
    tags: string[];
    comments?: number;
    authorId?: number | null;
    created_at?: string;
}
