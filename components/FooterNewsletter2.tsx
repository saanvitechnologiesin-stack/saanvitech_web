'use client';

import Form from "./Form";
import TextField from "./TextField";
import Icons from "./Icons";

const FooterNewsletter2 = () => {
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const form =  event.currentTarget;
        // const formData = new FormData(form);
        // const data = Object.fromEntries(formData.entries());
        // console.log('data', data);
    }

    return (
        <div
            className="footer-widget footer-widget-brand"
            data-aos="fade-left"
            data-aos-anchor=".footer-top"
        >
            <div className="widget-heading heading text-22">Subscribe Newsletter</div>
            <div className="newsletter-subscribe mt-1">
                <Form cls="form-newsletter" onSubmitHandler={submitHandler}>                    
                    <TextField 
                        id="Newsletter-Subscribe"
                        label="Subscribe Newsletter"
                        type="text"
                        placeholder="Your email*"
                        name="email"
                        required={true}
                    />

                    <button
                        className="newsletter-button button button--primary button-without-icon"
                        type="submit"
                        aria-label="Submit"
                    >
                        <div className="svg-wrapper">
                            <Icons.ArrowLong />
                        </div>
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default FooterNewsletter2;