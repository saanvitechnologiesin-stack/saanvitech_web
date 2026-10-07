import { TestimonialProps } from "@/types/testimonialProps";
import parser from "html-react-parser";
import Icons from "./Icons";

const CardTestimonialContent = ({ data }: {data: TestimonialProps}) => {
    const {
        name,
        role,
        review,
    } = data || {};

    return (
        <div className="thumb-card">
            <span className="icon icon-80 flex"><Icons.Quote2 /></span>        
            {review && <p className="text text-24">{parser(review)}</p>}
            {name && <h2 className="user-name heading text-24">{name}</h2>}
            {role && <div className="user-desig text text-19">{role}</div>}
        </div>
    )
}

export default CardTestimonialContent;