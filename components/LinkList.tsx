import Link from "next/link";
import { MenuType } from "@/types/menu";

interface LinkListProps {
    wrapperCls: string;
    menus: MenuType[];
}

const LinkList = ({
    wrapperCls,
    menus
}: LinkListProps) => {
    return(
        <ul className={`${wrapperCls} list-unstyled`}>
            {menus?.map((item, index) => (
                <li key={`LinkList-${index}`}>
                    <Link
                        href={item.path}
                        className="text text-16 link"
                        aria-label={item.title}
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default LinkList;