import '@/styles/blog-comment.css';
import React from "react";
import Comments from '@/data/comments.json';
import CommentBlock from './CommentBlock';

// const CommentList = ({ postId }: { postId: number }) => {
const CommentList = () => {
    const comments = Comments;
    // comments = comments.filter(c => c.postId === postId);

    return (
        <>
            {comments.length > 0 &&
                <div className="comments-section scroll-margin" id="blog-comments">
                    <h2
                        className="comment-section-heading heading text-36"
                        data-aos="fade-up"
                    >
                        {comments.length} Comments
                    </h2>
                    <ul className="comments-area list-unstyled">
                        {comments.map((comment, index) => (                            
                            <li className="comment-block" data-aos="fade-up" key={`comment-${index}-${comment.id}`}>
                                <CommentBlock comment={comment} />

                                {comment.replies.length > 0 && 
                                    <>
                                        {comment.replies.map((reply, index) => (
                                            <React.Fragment key={`reply-${index}`}>
                                                <CommentBlock comment={reply} cls="replied-item" />
                                            </React.Fragment>
                                        ))}
                                    </>
                                }
                            </li>
                        ))}
                        
                    </ul>
                </div>
            }
        </>
    )
}

export default CommentList;