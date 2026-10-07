'use client';

import React from "react";
import "@/styles/blog.css";
import "@/styles/featured-blog.css";
import { SectionProps } from "@/types/sectionProps";
import { AuthorType } from '@/types/author';

import Posts from "@/data/posts.json";
import Authors from '@/data/author.json';
import CardBlog2 from "../CardBlog2";
import CardBlogList2 from "../CardBlogList2";

import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";


const FeaturedBlogGrid = ({ data }: { data: SectionProps; }) => {
    const posts = Posts;
    if(posts.length == 0) return null;

    const {
        wrapperCls,
        container,
        subheading,
        heading,
        button,
    } = data || {};

    return (
        <div className={`featured-blog ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings text-center">
                    {subheading && 
                        <Subheading 
                            title={subheading}
                            cls="text-20"
                            aos="fade-up"
                        />
                    }
                    {heading && 
                        <Heading 
                            title={heading}
                            cls="text-50"
                            aos="fade-up"
                        />
                    }
                </div>

                <div className="section-content">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="col-span-2 xl:col-span-1">
                            {posts.slice(0, 1).map((article) => {
                                const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === article.authorId);

                                return (
                                <React.Fragment key={`article-${article.id}`}>
                                    <CardBlog2 
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
                        
                        <div className="col-span-2 xl:col-span-1">
                            <div className="horizontal-blogs">
                                {posts.slice(1, 4).map((article) => {
                                    const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === article.authorId);

                                    return (
                                    <React.Fragment key={`article-${article.id}`}>
                                        <CardBlogList2 
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
                        </div>
                    </div>

                    {button &&
                        <div className="buttons buttons-discover" data-aos="fade-up">
                            {button.type == 'primary' &&
                                <PrimaryButton 
                                    label={button.label}
                                    href={button.href}
                                    ariaLabel={button.label}
                                />
                            }

                            {button.type == 'secondary' &&
                                <SecondaryButton 
                                    label={button.label}
                                    href={button.href}
                                    ariaLabel={button.label}
                                />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedBlogGrid;