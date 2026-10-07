import Link from "next/link";
import Icons from "../Icons";
import { ThemeButtonType } from "@/types/themeButton";

const SecondaryButton = ({ label, href, cls, ariaLabel, showIcon = true, type = 'submit' }: ThemeButtonType) => {
    return (
        <>
        {
            href ? (
                <Link
                    href={href}
                    className={`button button--secondary ${cls}`}
                    aria-label={ariaLabel}
                >
                    {label}
                    {showIcon && <span className="svg-wrapper"><Icons.ArrowCircle /></span>}
                </Link>
            ) : (
                <button
                    type={type}
                    className={`button button--secondary ${cls}`}
                    aria-label={ariaLabel}
                >
                    {label}
                    {showIcon && <span className="svg-wrapper"><Icons.ArrowCircle /></span>}
                </button>
            )
        }
        </>
    )
}

export default SecondaryButton;
