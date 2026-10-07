import '@/styles/blog.css';
import React from "react";

import { AuthorType } from '@/types/author';
import Posts from "@/data/posts.json";
import Authors from '@/data/author.json';
import CardBlogList from "../CardBlogList";
import NotFoundMsg from "../NotFoundMsg";
import Pagination from "../Pagination";
import Icons from "../Icons";
import BlogSidebar from "../BlogSidebar";
import DrawerOpener from "../DrawerOpener";

const BlogList = ({ cls }: { cls: string }) => {
    const posts = Posts;

    if(posts.length == 0) {
        return <NotFoundMsg message="No posts found!" />
    }

    return (
        <div className={`page-blog ${cls}`}>
            <div className="container">
                <DrawerOpener
                    cls="open-sidebar svg-wrapper text text-20 fw-500 lg:!hidden"
                    data-drawer=".drawer-blog-sidebar"
                >
                    <Icons.Filter />
                    Filter
                </DrawerOpener>
                <div className="grid grid-cols-12 lg:gap-1">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="blog-list-wrapper">
                            {posts.slice(0, 3).map((article) => {
                                const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === article.authorId);
                                return (                            
                                <React.Fragment key={`article-${article.id}`}>
                                    <CardBlogList 
                                        article={article}
                                        width={1000}
                                        height={707}
                                        alt="Article image"
                                        author={author}
                                        showDate={true}
                                    />
                                </React.Fragment>
                            )})}
                        </div>
                
                        <Pagination />
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogList;