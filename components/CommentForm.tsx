'use client';

import '@/styles/form.css';
import PrimaryButton from './buttons/PrimaryButton';
import Form from './Form';
import TextField from './TextField';
import TextArea from './TextArea';

const CommentForm = () => {
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const form = event.currentTarget;
        // const formData = new FormData(form);
        // const data = Object.fromEntries(formData.entries());
        // console.log('data', data);
    }

    return (
        <div className="comments-form">
            <div className="comments-form-headings">
                <h2 className="heading text-36" data-aos="fade-up">
                    Leave a reply
                </h2>
                <p className="text text-16" data-aos="fade-up">
                    Your email address will not be published. Required fields
                    are marked *
                </p>
            </div>
            <Form onSubmitHandler={submitHandler} cls="form contact-form">                   
                <TextField 
                    id="CommentFormname"
                    label="Your Name"
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    required={true}
                    wrapperCls="w-half"
                    cls="text-16"
                />

                <TextField 
                    id="CommentFormemail"
                    label="Your Email"
                    type="text"
                    placeholder="Your Email*"
                    name="email"
                    required={true}
                    wrapperCls="w-half"
                    cls="text-16"
                />

                <TextField 
                    id="CommentFormWebsite"
                    label="Your Website"
                    type="text"
                    placeholder="Your Website"
                    name="website"
                    required={false}
                    cls="text-16"
                />

                <TextArea 
                    id="CommentFormbody"
                    label="Type your message"
                    type="text"
                    placeholder="Type your message"
                    name="message"
                    required={true}
                    cls="text-16"
                />

                <div className="form-button" data-aos="fade-up">                     
                    <PrimaryButton 
                        label="Post Comment"
                        ariaLabel="Post Comment"
                    />
                </div>
            </Form>
        </div>
    )
}

export default CommentForm;