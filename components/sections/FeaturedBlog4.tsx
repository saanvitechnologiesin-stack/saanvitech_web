'use client';

import "@/styles/blog.css";
import "@/styles/featured-blog.css";
import { SectionProps } from "@/types/sectionProps";
import { AuthorType } from '@/types/author';

import Posts from "@/data/posts.json";
import Authors from '@/data/author.json';
import CardBlog4 from "../CardBlog4";

import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";


const FeaturedBlog4 = ({ data }: { data: SectionProps; }) => {
    const posts = Posts;
    if(posts.length == 0) return null;

    const {
        wrapperCls,
        container,
        subheading,
        heading,
        button2,
    } = data || {};

    return (
         <div className={`featured-blog has-bg ${wrapperCls}`}>
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
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 justify-center">
                {posts.slice(0, 3).map((article) => {
                    const author: AuthorType | undefined = Authors.find((author: AuthorType) => author.id === article.authorId);

                    return (
                    <div 
                        className="col-span-1 multi-col m-0!" 
                        data-aos="fade-up" 
                        key={`article-${article.id}`}
                    >
                        <CardBlog4 
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
            
              {button2 &&
                <div className="buttons buttons-discover" data-aos="fade-up">
                    {button2.type == 'primary' &&
                        <PrimaryButton 
                            label={button2.label}
                            href={button2.href}
                            ariaLabel={button2.label}
                        />
                    }

                    {button2.type == 'secondary' &&
                        <SecondaryButton 
                            label={button2.label}
                            href={button2.href}
                            ariaLabel={button2.label}
                        />
                    }
                </div>
            }
          </div>
        </div>
      </div>
    )
}

export default FeaturedBlog4;