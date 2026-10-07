import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from '@/utils/formatDate';
import { ArticleCardType } from '@/types/articleCard';

const CardBlog = ({
    article,
    width,
    height,
    alt,
    author,
    showDate
}: ArticleCardType) => {
    return (
        <div className="card-blog radius18">
            <div className="card-blog-top">
                <div className="card-blog-meta">
                    {author &&
                        <div className="card-blog-meta-item text text-18">
                            <Icons.Admin />
                            {author.username}
                        </div>
                    }

                    {showDate && article.created_at && 
                        <div className="card-blog-meta-item text text-18">
                            <Icons.Calendar />
                            {formatDate(article.created_at)}
                        </div>
                    }
                </div>

                <h2 className="card-blog-heading heading text-22">
                    <Link href={`/blogs/${article.slug}`} className="heading text-22">
                        {article.title}
                    </Link>
                </h2>
            </div>
            <Link
                className="card-blog-bottom"
                href={`/blogs/${article.slug}`}
                aria-label={article.title}
            >
                {article.category &&
                    <span className="blog-tag subheading subheading-bg text-16 fw-500">
                        {article.category}
                    </span>
                }

                {article.image &&
                    <div className="media">
                        <Image
                            src={article.image}
                            width={width}
                            height={height}
                            alt={alt ? alt : article.title}
                            loading="lazy"
                        />
                    </div>
                }

                <div className="buttons">
                    <div className="button button--primary">
                        Read More
                        <Icons.ArrowRotate />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardBlog;