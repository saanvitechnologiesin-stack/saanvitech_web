"use client";

import "@/styles/form.css";
import "@/styles/contact.css";
import { useState } from "react";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import Form from "../Form";
import TextField from "../TextField";
import TextArea from "../TextArea";
import { SectionProps } from "@/types/sectionProps";
import SecondaryButton from "../buttons/SecondaryButton";

const ContactSection = ({ data }: { data: SectionProps }) => {
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text,
        promotions,
        block,
    } = data || {};

    const clearMessage = (time: number) => {
        setTimeout(() => {
            setMessage("");
        }, time);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const form = event.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            setLoading(true);

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const formMessage = await response.json();

            if (response.ok) {
                setLoading(false);
                setStatus("success");
                setMessage(formMessage.message);
                form.reset();
                clearMessage(6000);
            } else {
                setLoading(false);
                setStatus("error");
                setMessage(formMessage.error);
                clearMessage(4000);
            }
        } catch (error: any) {
            setLoading(false);
            setStatus("error");
            setMessage(error.message);
            clearMessage(4000);
        }        
    };

    return (
        <div className={`section-contact-form ${wrapperCls}`}>
            <div className={container}>
                <div className="contact-box radius18">
                    <div className="grid max-xxl:grid-cols-2 xxl:flex product-grid justify-between xxl:gap-[30px]">
                        <div className="max-lg:col-span-2 max-xxl:col-span-1 col-contact-content">
                            <div className="section-headings">
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

                                {text &&
                                    <Text 
                                        text={text}
                                        cls="text-18"
                                        aos="fade-up"
                                    />
                                }

                                {promotions?.map((item, index) => (
                                    <div 
                                        className="card-icon-text card-icon-text-horizontal" 
                                        key={`promo-${index}`}
                                    >
                                        {item.icon &&
                                            <div className="svg-wrapper" data-aos="fade-up">
                                                {item.icon}
                                            </div>
                                        }

                                        <div className="content">
                                            {item.title &&
                                                <h2 className="heading text-24 fw-700" data-aos="fade-up">
                                                    {item.title}
                                                </h2>
                                            }

                                            {item.text &&
                                                <p className="text text-16" data-aos="fade-up">
                                                    {item.text}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                ))}                                
                            </div>
                        </div>

                        <div className="max-lg:col-span-2 max-xxl:col-span-1 col-contact-form">
                            <div className="contact-form-wrap radius18">
                                {block &&
                                    <div className="contact-form-headings">
                                        {block.heading &&
                                            <h2 className="heading text-32" data-aos="fade-up">
                                                {block.heading}
                                            </h2>
                                        }

                                        {block.text &&
                                            <p className="text text-16" data-aos="fade-up">
                                                {block.text}
                                            </p>
                                        }
                                    </div>
                                }

                                <Form 
                                    cls="form contact-form main-contact-form" 
                                    onSubmitHandler={handleSubmit}
                                >
                                    <TextField 
                                        cls="text-16"
                                        id="ContactForm-name"
                                        label="Your Name"
                                        type="text"
                                        placeholder="Your Name*"
                                        name="name"
                                        required={true}
                                    />

                                    <TextField 
                                        cls="text-16"
                                        id="ContactForm-email"
                                        label="Your Email"
                                        type="email"
                                        placeholder="Email Here*"
                                        name="email"
                                        required={false}
                                    />

                                    <TextField 
                                        cls="text-16"
                                        id="ContactForm-service"
                                        label="Service Type"
                                        type="text"
                                        placeholder="Service Type"
                                        name="service"
                                        required={false}
                                    />

                                    <TextArea 
                                        cls="text-16"
                                        id="ContactForm-body"
                                        label="Your Comment"
                                        placeholder="Your Comment*"
                                        name="message"
                                        required={true}
                                    />

                                    <div
                                        className="form-button" 
                                        data-aos="fade-up"
                                    >
                                        {loading ? (
                                            <SecondaryButton 
                                                cls="loading"
                                                label="Sending..."
                                                ariaLabel="Sending message"
                                            />
                                        ) : (
                                            <SecondaryButton 
                                                label="Send Message"
                                                ariaLabel="Send Message"
                                            />
                                        )}
                                    </div>
                                </Form>

                                {status === "success" && (
                                    <p className="text-16 fw-500 text-green-600 !mt-1">{message}</p>
                                )}

                                {status === "error" && (
                                    <p className="text-16 fw-500 text-red-600 !mt-1">{message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSection;