import '@/styles/blog.css';
import { AuthorType } from '@/types/author';
import Posts from "@/data/posts.json";
import Authors from '@/data/author.json';
import CardBlog from "../CardBlog";
import NotFoundMsg from "../NotFoundMsg";
import Pagination from "../Pagination";


const BlogGrid = ({ cls }: { cls: string }) => {
    const posts = Posts;

    if(posts.length == 0) {
        return <NotFoundMsg message="No posts found!" />
    }

    return (
        <div className={`page-blog ${cls}`}>
            <div className="container">
                <div className="grid grid-cols-12 md:gap-1 product-grid">
                    {posts.map((article) => {
                        const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === article.authorId);
                        return (                            
                            <div
                                className="col-span-12 md:col-span-6 lg:col-span-4"
                                data-aos="fade-up"
                                data-aos-delay="100"
                                key={`article-${article.id}`}
                            >
                                <CardBlog 
                                    article={article}
                                    width={1000}
                                    height={707}
                                    alt="Article image"
                                    author={author}
                                    showDate={true}
                                />
                            </div>
                    )})}
                </div>
                
                <Pagination />
            </div>
        </div>
    )
}

export default BlogGrid;