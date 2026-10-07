import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from '@/utils/formatDate';
import { ArticleCardType } from '@/types/articleCard';

const CardBlogList2 = ({
    article,
    width,
    height,
    alt,
    author,
    showDate
}: ArticleCardType) => {
    const { image, title, created_at, slug } = article;

    return (
        <div
            className="card-blog-list-horizontal radius18"
            data-aos="fade-up"
        >
            {image &&
                <div className="card-blog-list-media">
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
                        <div className="card-blog-meta-item text text-16">
                            <Icons.Admin />                            
                            {author.username}
                        </div>
                    }

                    {showDate && created_at && 
                        <div className="card-blog-meta-item text text-16">
                            <Icons.Calendar2 />
                            {formatDate(created_at)}
                        </div>
                    }
                </div>

                <h2 className="card-blog-heading heading text-24">
                    <Link href={`/blogs/${slug}`} className="heading text-24">
                        {title}
                    </Link>
                </h2>

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

export default CardBlogList2;