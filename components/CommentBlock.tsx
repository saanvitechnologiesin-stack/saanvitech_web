import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { CommentType } from "@/types/comment";
import Icons from "./Icons";

const CommentBlock = ({
    comment,
    cls,
}: {
    comment: CommentType;
    cls?: string;
}) => {
    return (
        <div className={`comments-item ${cls}`}>
            {comment.image &&
                <div className="commentator-img">
                    <Image
                        src={comment.image}
                        alt="image"
                        width={110}
                        height={110}
                        loading="lazy"
                    />
                </div>
            }

            <div className="comment-details">
                <div className="comments-top">
                    <div className="comments-meta">
                        <div className="comment-date text text-16">
                            {formatDate(comment.created_at)}
                        </div>
                        <h2 className="commentator-name heading text-22">
                            {comment.name}
                        </h2>
                    </div>
                    <div className="button-reply text text-16 fw-500">
                        <Icons.Reply />
                        Reply
                    </div>
                </div>
                <p className="comment-bottom text text-16">
                    {comment.content}
                </p>
            </div>
        </div>
    )
}

export default CommentBlock;