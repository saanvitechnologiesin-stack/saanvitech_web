import { TestimonialProps } from "@/types/testimonialProps";
import parser from "html-react-parser";
import Icons from "./Icons";
import Image from "next/image";

const CardTestimonial = ({ data }: {data: TestimonialProps}) => {
    const {
        name,
        role,
        review,
        rating,
        image,
    } = data || {};

    return (
        <div
            className="card-testimonial radius18"
            data-aos="fade-up"
            data-aos-delay="10"
        >
            {rating &&
                <ul className="rating-list list-unstyled">
                    {Array.from({ length: rating }).map((_, index) => (                
                        <li className="rating-icon" key={`rating-icon-${index}`}>
                            <Icons.Rating />
                        </li>
                    ))}
                </ul>
            }

            {review && <p className="text text-24">{parser(review)}</p>}

            <div className="user-info-wrap">
                <div className="user-info">
                    {image && 
                        <div className="user-img">
                            <Image
                                src={image}
                                width={80}
                                height={80}
                                loading="lazy"
                                alt="image"
                            />
                        </div>
                    }

                    <div className="user-name-desig">
                        {name && <h2 className="user-name heading text-24">{name}</h2>}
                        {role && <div className="user-desig text text-18">{role}</div>}
                    </div>
                </div>

                <div className="icon-quote icon icon-62">
                    <Icons.Quote />
                </div>
            </div>
        </div>
    )
}

export default CardTestimonial;