import { RecentPostType } from "@/types/recentpost";
import Link from "next/link";
import Image from "next/image";
import Posts from "@/data/posts.json";
import { formatDate } from "@/utils/formatDate";

const RecentPost = ({
    title,
    slug
}: RecentPostType) => {
    const posts = Posts;
    const recentPosts = posts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

    return (
        <>
            {recentPosts.length > 0 &&
                <div className="sidebar-widget radius18" data-aos="fade-up">
                    {title && <h2 className="sidebar-heading heading text-24">{title}</h2>}
                    <ul className="recent-post list-unstyled">
                        {recentPosts.map((post, index) => (                        
                            <li key={`recentpost-${index}`}>
                                <div className="card-blog-list">
                                    {post.image &&
                                        <div className="card-blog-list-media">
                                            <div className="media">
                                                <Image
                                                    src={post.image}
                                                    width={1000}
                                                    height={707}
                                                    alt={title}
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    }

                                    <div className="card-blog-content">
                                        {post.created_at &&
                                            <div className="card-blog-meta">
                                                <div className="card-blog-meta-item text text-16">
                                                    {formatDate(post.created_at)}
                                                </div>
                                            </div>
                                        }

                                        <h2 className="card-blog-heading heading text-20">
                                            <Link
                                                href={`/blogs/${post.slug}`}
                                                className="heading text-20"
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>
                                    </div>
                                </div>
                            </li>
                        ))}                    
                    </ul>
                </div>
            }
        </>
    )
}

export default RecentPost;