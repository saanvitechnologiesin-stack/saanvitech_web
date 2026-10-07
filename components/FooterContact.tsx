"use client";

import { useState } from "react";
import Image from "next/image";
import Subheading from "./Subheading";
import Heading from "./Heading";
import Text from "./Text";
import Form from "./Form";
import TextField from "./TextField";
import TextArea from "./TextArea";
import PrimaryButton from "./buttons/PrimaryButton";
import { FooterContactType } from "@/types/footerContact";

const FooterContact = ({
    container,
    bgImage,
    imageUrl,
    width,
    height,
    alt,
    subheading,
    heading,
    text,
    aosAnchor
}: FooterContactType) => {
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div 
            className="footer-contact bg-contain"
            style={ bgImage ? { backgroundImage: `url(${bgImage})` } : undefined }
        >
            <div className={container}>
                <div className="contact-box radius18">
                    <div className="grid lg:grid-cols-2 lg:gap-1">
                        {imageUrl &&
                            <div className="col-span-2 lg:col-span-1">
                                <div
                                    className="contact-media"
                                    data-aos="fade-right"
                                    data-aos-anchor={aosAnchor}
                                >
                                    
                                        <Image
                                            src={imageUrl}
                                            width={width}
                                            height={height}
                                            alt={alt}
                                            loading="lazy"
                                        />
                                </div>
                            </div>
                        }

                        <div className={`col-span-2 ${imageUrl ? 'lg:col-span-1': 'lg:col-span-2'}`}>
                            <div className="contact-form-wrap">
                                <div className="contact-box-headings section-headings">
                                    {subheading && 
                                        <Subheading 
                                            title={subheading}
                                            icon={true}
                                            aos="fade-up"
                                            aosAnchor={aosAnchor}
                                            cls="text-20"
                                        />
                                    }

                                    {heading &&
                                        <Heading 
                                            title={heading}
                                            cls="text-50"
                                            aos="fade-up"
                                            aosAnchor={aosAnchor}
                                            aosDelay="50"
                                        />
                                    }

                                    {text &&
                                        <Text 
                                            text={text}
                                            cls="text-18"
                                            aos="fade-up"
                                            aosAnchor={aosAnchor}
                                            aosDelay="80"
                                        />
                                    }
                                </div>

                                <Form 
                                    cls="form contact-form" 
                                    onSubmitHandler={handleSubmit}
                                >
                                    <TextField 
                                        wrapperCls="w-half"
                                        cls="text-16"
                                        id="FooterContactForm-name"
                                        label="Your Name"
                                        type="text"
                                        placeholder="Your Name*"
                                        name="name"
                                        required={true}
                                        aos="fade-right"
                                        aosAnchor={aosAnchor}
                                    />
                                    <TextField 
                                        wrapperCls="w-half"
                                        cls="text-16"
                                        id="FooterContactForm-email"
                                        label="Your Email"
                                        type="email"
                                        placeholder="Your Email*"
                                        name="email"
                                        required={false}
                                        aos="fade-left"
                                        aosAnchor={aosAnchor}
                                    />
                                    <TextArea 
                                        cls="text-16"
                                        id="FooterContactForm-body"
                                        label="Write your message"
                                        placeholder="Write your message*"
                                        name="message"
                                        aos="fade-up"
                                        aosAnchor={aosAnchor}
                                        required={true}
                                    />
                                    <div
                                        className="form-button" 
                                        data-aos="fade-up"
                                        data-aos-anchor={aosAnchor}
                                    >
                                        {loading ? (
                                            <PrimaryButton 
                                                cls="loading"
                                                label="Sending..."
                                                ariaLabel="Sending message"
                                            />
                                        ) : (
                                            <PrimaryButton 
                                                label="Request Free Consultation"
                                                ariaLabel="Request Free Consultation"
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

export default FooterContact;