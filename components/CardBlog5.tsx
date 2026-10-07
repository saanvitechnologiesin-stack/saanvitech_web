import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { ArticleCardType } from '@/types/articleCard';

const CardBlog5 = ({
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

            <h2 className="card-blog-heading heading text-22">
                <Link href={`/blogs/${article.slug}`} className="heading text-22">
                    {article.title}
                </Link>
            </h2>
        </div>
    )
}

export default CardBlog5;