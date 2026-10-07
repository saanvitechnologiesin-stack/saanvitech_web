import '@/styles/team.css';
import TeamList from '@/data/teams.json';
import CardTeam from '../CardTeam';
import NotFoundMsg from '../NotFoundMsg';
import { SectionProps } from '@/types/sectionProps';

const OurTeam = ({
    wrapperCls,
    container
}: SectionProps) => {
    const teamList = TeamList;

    if(teamList.length == 0) {
        return <NotFoundMsg message="No team members found!" />
    }

    return (
        <div className={`our-team ${wrapperCls}`}>
            <div className={container}>
                <div className="grid grid-cols-12 sm:gap-1 product-grid">
                    {teamList.map((member, index) => (
                        <div
                            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
                            data-aos="fade-up"
                            data-aos-delay={`${index + 1}00`}
                            key={`card-team-${index}`}
                        >
                            <CardTeam data={member} />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default OurTeam;