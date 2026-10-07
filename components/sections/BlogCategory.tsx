import '@/styles/blog.css';
import { AuthorType } from '@/types/author';
import Posts from '@/data/posts.json';
import Authors from '@/data/author.json';
import CardBlog from "../CardBlog";
import { notFound } from 'next/navigation';
import Icons from '../Icons';
import BlogSidebar from '../BlogSidebar';
import { createHandle } from '@/utils/createHandle';
import DrawerOpener from '../DrawerOpener';

const BlogCategory = ({ slug }: { slug: string}) => {
    let posts = Posts;
    posts = posts.filter(post => createHandle(post.category) === slug);

    return (
        <div className={`page-blog mt-100 mb-100`}>
            <div className="container">
                {posts.length > 0 ? (
                    <>
                        <DrawerOpener
                            cls="open-sidebar svg-wrapper text text-20 fw-500 lg:!hidden"
                            data-drawer=".drawer-blog-sidebar"
                        >
                            <Icons.Filter />
                            Filter
                        </DrawerOpener>
                        <div className="grid grid-cols-12 lg:gap-1">
                            <div className="col-span-12 lg:col-span-7">
                                <div className="grid grid-cols-12 md:gap-1 product-grid">
                                    {posts.map((article) => {
                                        const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === article.authorId);
                                
                                        return(                            
                                            <div
                                                className="col-span-12 md:col-span-12 lg:col-span-12"
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
                            </div>
                            <div className="col-span-12 lg:col-span-5">
                                <BlogSidebar />
                            </div>
                        </div>
                    </>
                ) : (
                    notFound()
                )}
            </div>
        </div>
    )
}

export default BlogCategory;