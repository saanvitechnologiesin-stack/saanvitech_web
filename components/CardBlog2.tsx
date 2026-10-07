import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from '@/utils/formatDate';
import { ArticleCardType } from '@/types/articleCard';

const CardBlog2 = ({
    article,
    width,
    height,
    alt,
    author,
    showDate
}: ArticleCardType) => {
    return (
        <div className="card-blog-list" data-aos="fade-up">
            {article.image &&
                <div className="card-blog-list-media radius18">
                    <div className="media">
                        <Image
                            src={article.image}
                            width={width}
                            height={height}
                            alt={alt ? alt : article.title}
                            loading="lazy"
                        />
                    </div>
                </div>
            }

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

            <h2 className="card-blog-heading heading text-32">
                <Link href={`/blogs/${article.slug}`} className="heading text-32">
                    {article.title}
                </Link>
            </h2>
        </div>
    )
}

export default CardBlog2;