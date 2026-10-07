import Link from "next/link";
import { TagType } from "@/types/tags";
import { createHandle } from "@/utils/createHandle";

const SidebarTags = ({
    title,
    tags,
    rootUrl,
}: TagType) => {
    return (
        <div className="sidebar-widget radius18" data-aos="fade-up">
            {title && <h2 className="sidebar-heading heading text-24">{title}</h2>}
            <ul className="sidebar-tags list-unstyled">
                {tags.map((tag, index) => (
                    <li key={`tag-${index}`}>
                        <Link
                            className="subheading subheading-bg text-18"
                            href={`${rootUrl}/${createHandle(tag)}`}
                            aria-label={tag}
                        >
                            {tag}
                        </Link>
                    </li>                    
                ))}
            </ul>
        </div>
    );
}

export default SidebarTags;