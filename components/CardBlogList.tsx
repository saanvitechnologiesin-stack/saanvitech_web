import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from '@/utils/formatDate';
import { ArticleCardType } from '@/types/articleCard';

const CardBlogList = ({
    article,
    width,
    height,
    alt,
    author,
    showDate
}: ArticleCardType) => {
    const { image, title, created_at, comments, slug, excerpt } = article;

    return (
        <div className="card-blog-list">
            {image &&
                <div className="card-blog-list-media radius18">                
                    <div className="media">
                        <Image
                            src={image}
                            width={width}
                            height={height}
                            alt={alt ? alt : title}
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

                    {showDate && created_at && 
                        <div className="card-blog-meta-item text text-18">
                            <Icons.Calendar2 />
                            {formatDate(created_at)}
                        </div>
                    }

                    {comments &&
                        <Link
                            className="card-blog-meta-item text text-18"
                            href={`/blogs/${slug}#blog-comments`}
                            aria-label="Blog Comments"
                        >
                            <Icons.Comment />
                            {comments < 10 ? '0': ''}{comments} Comments
                        </Link>
                    }
                </div>

                <h2 className="card-blog-heading heading text-32">
                    <Link href={`/blogs/${slug}`} className="heading text-32">
                        {title}
                    </Link>
                </h2>

                <p className="blog-excerpt text text-16">
                    {excerpt}
                </p>

                <div className="buttons">
                    <Link href={`/blogs/${slug}`} className="button--cta" aria-label="See blog details">
                        Read More
                        <Icons.ArrowRotate />
                        <span className="visually-hidden">To see blog details, click here</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardBlogList;