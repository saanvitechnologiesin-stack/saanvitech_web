import { CounterItemProps } from "@/types/counterItemProps";
import CounterUpWrapper from "../CounterUpWrapper";

const CounterUpVertical = ({ data }: { data: CounterItemProps[] }) => {
    return (
        <counter-up className="counter-up-wrap">
            <CounterUpWrapper>
                    <div className="counter-up">
                        {data.map((item, index) => {
                            const {number, suffix, title, aos, aosDelay} = item;
                            const isAos = aos ? {'data-aos': `${aos}`} : null;
                            const isAosDelay = aosDelay ? {'data-aos-delay': `${aosDelay}`} : null;
                            const conditionalAttributes = {...isAos, ...isAosDelay};

                            return (
                                <div
                                    className="counter-item"
                                    key={`counter-item-${index}`}
                                    {...conditionalAttributes}
                                >
                                    <h2 className="heading text-50" data-target={number}>
                                        0<span>{suffix ? suffix : ''}</span>
                                    </h2>
                                    <div className="text text-18 fw-500">{title}</div>
                                </div>
                        )})}
                    </div>
            </CounterUpWrapper>
        </counter-up>
    )
}

export default CounterUpVertical;