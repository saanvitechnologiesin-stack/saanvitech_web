import Icons from "./Icons";
import SidebarSearch from "./SidebarSearch";
import SidebarCategories from "./SidebarCategories";
import RecentPost from "./RecentPost";
import SidebarTags from "./SidebarTags";
import Posts from "@/data/posts.json";
import DrawerOpener from "./DrawerOpener";

interface BlogSidebarType {
    slug?: string;
}

const BlogSidebar = ({ slug }: BlogSidebarType) => {
    const posts = Posts;
    const tags: string[] = Array.from(new Set(posts.flatMap(post => post.tags)));
    const categories: string[] = Array.from(new Set(posts.flatMap(post => post.category)));

    return(
        <div className="sidebar-filter drawer-blog-sidebar">
            <div className="drawer-headings lg:!hidden" data-aos="fade-up">
                <div className="heading text-24">Filter</div>
                <DrawerOpener
                    cls="svg-wrapper menu-close"
                    data-drawer=".drawer-blog-sidebar"
                >
                    <Icons.CloseCircle />
                </DrawerOpener>
            </div>
            <aside className="blog-sidebar">
                <SidebarSearch 
                    id="blog-search-input"
                    title="Search Here"
                    label="Search blog"
                    placeholder="Search blog"
                    name="search"
                />

                {categories.length > 0 &&
                    <SidebarCategories 
                        title="Categories"
                        categories={categories}
                        rootUrl="/blogs/category"
                    />
                }

                <RecentPost
                    title="Recent Post" 
                    slug={slug}
                />

                {tags.length > 0 &&
                    <SidebarTags
                        title="Tags" 
                        tags={tags}
                        rootUrl="/blogs/tags"
                    />
                }
            </aside>
        </div>
    )
}

export default BlogSidebar;