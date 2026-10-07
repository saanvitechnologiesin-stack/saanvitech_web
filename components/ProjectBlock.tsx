const ProjectBlock = ({
    title,
    text
}: {
    title?: string;
    text?: string;
}) => {
    return (
        <li className="project-info-item">
            <div className="info-title heading text-18">{title}:</div>
            <div className="info-data text text-16">{text}</div>
        </li>
    )
}

export default ProjectBlock;