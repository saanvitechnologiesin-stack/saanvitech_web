import Icons from "./Icons";
import Link from "next/link";
import { CategoriesType } from "@/types/categories";
import { createHandle } from "@/utils/createHandle";

const SidebarCategories = ({
    title,
    categories,
    rootUrl
}: CategoriesType) => {
    return (
        <div className="sidebar-widget radius18" data-aos="fade-up">
            {title && <h2 className="sidebar-heading heading text-24">{title}</h2>}
            <ul className="blog-categories list-unstyled">
                {categories.map((item, index) => (                        
                    <li key={`cate-${index}`}>
                        <Link
                            className="blog-category subheading subheading-bg text-18 fw-400"
                            href={`${rootUrl}/${createHandle(item)}`}
                            aria-label={item}
                        >
                            {item}
                            <Icons.ArrowLong2 />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarCategories;