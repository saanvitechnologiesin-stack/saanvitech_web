"use client";

import { useState } from "react";
import Form from "./Form";
import TextField from "./TextField";
import TextArea from "./TextArea";
import Icons from "./Icons";

const FaqForm = ({ heading }: { heading?: string; }) => {
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
        <div className="faq-form-wrap radius18" data-aos="fade-up">
            <Form cls="faq-form" onSubmitHandler={handleSubmit}>
                {heading && <h2 className="heading text-24">{heading}</h2>}

                <TextField 
                    cls="text-16"
                    id="FaqForm-name"
                    label="Your Name"
                    type="text"
                    placeholder="Your Name*"
                    name="name"
                    required={true}
                    aos="fade-up"
                />

                <TextField 
                    cls="text-16"
                    id="FaqForm-email"
                    label="Your Email"
                    type="email"
                    placeholder="Your Email*"
                    name="email"
                    required={false}
                    aos="fade-up"
                />

                <TextArea 
                    cls="text-16"
                    id="FaqForm-body"
                    label="Write your message"
                    placeholder="Write your message*"
                    name="message"
                    aos="fade-up"
                    required={true}
                />

                {loading ? (
                    <button
                        type="button"
                        className="button button--primary loading"
                        aria-label="Ask QuestionSending message"
                    >
                        Sending...
                        <span className="svg-wrapper icon-20">
                            <Icons.ArrowCircleStraight />
                        </span>
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="button button--primary"
                        aria-label="Ask Question Now"
                    >
                        Ask Question Now
                        <span className="svg-wrapper icon-20">
                            <Icons.ArrowCircleStraight />
                        </span>
                    </button>
                )}
            </Form>

            {status === "success" && (
                <p className="text-16 fw-500 text-green-600 !mt-1">{message}</p>
            )}

            {status === "error" && (
                <p className="text-16 fw-500 text-red-600 !mt-1">{message}</p>
            )}
        </div>
    )
}

export default FaqForm;