import { ArticleType } from "@/types/article";
import { AuthorType } from '@/types/author';
import Authors from '@/data/author.json'; 
import Image from "next/image";
import Icons from "./Icons";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import parse from 'html-react-parser';

interface ArticleProps {
    article: ArticleType;
}

const Article = ({
    article
}: ArticleProps) => {
    const { image, title, authorId, comments } = article;    
    const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === authorId);

    return (
        <div className="blog-details">
            <div className="card-blog-list" data-aos="fade-up">
                {image && 
                    <div className="card-blog-list-media radius18">
                        <div className="media">
                            <Image
                                src={image}
                                width={1000}
                                height={707}
                                alt={title}
                                loading="lazy"
                            />
                        </div>
                    </div>
                }

                <div className="card-blog-content">
                    <div className="card-blog-meta">
                        {author && 
                            <div className="card-blog-meta-item text text-18">
                                <Icons.Admin />
                                {author.username}
                            </div>
                        }

                        {article.created_at && 
                            <div className="card-blog-meta-item text text-18">
                                <Icons.Calendar2 />
                                {formatDate(article.created_at)}
                            </div>
                        }

                        {comments &&
                            <Link
                                className="card-blog-meta-item text text-18"
                                href="#blog-comments"
                                aria-label="Blog Comments"
                            >
                                <Icons.Comment />
                                {comments < 10 ? '0': ''}{comments} Comments
                            </Link>
                        }
                    </div>

                    <h2 className="card-blog-heading heading text-50">
                        {article.title}
                    </h2>

                    <div className="blog-description">
                        {parse(article.content)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article;