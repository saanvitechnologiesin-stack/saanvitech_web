import "@/styles/promotion.css";
import { SectionProps } from "@/types/sectionProps";
``;
import CounterUpWrapper from "../CounterUpWrapper";

const CounterUp3 = ({ data }: { data: SectionProps }) => {
  const { counterData } = data;

  return (
    <counter-up className="counter-up-wrap">
      <CounterUpWrapper>
        <div className="counter-up">
          {counterData?.map((item, index) => {
            const { number, suffix, title } = item;

            return (
              <div
                className="counter-item"
                key={`counter-item-${index}`}
                data-aos="fade-up"
              >
                <h2 className="heading text-64" data-target={number}>
                  0<span>{suffix ? suffix : ""}</span>
                </h2>
                <div className="text text-24 fw-500">{title}</div>
              </div>
            );
          })}
        </div>
      </CounterUpWrapper>
    </counter-up>
  );
};

export default CounterUp3;
