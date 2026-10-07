const NotFoundMsg = ({message}: {
    message: string;
}) => {
    return (
        <div className="container section-padding">
            <p className="text text-20 text-center">{message}</p>
        </div>
    )
}

export default NotFoundMsg;