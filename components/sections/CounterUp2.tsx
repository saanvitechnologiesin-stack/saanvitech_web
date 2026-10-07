import "@/styles/promotion.css";
import { SectionProps } from "@/types/sectionProps";
import CounterUpWrapper from "../CounterUpWrapper";

const CounterUp2 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, counterData } = data;

  return (
    <counter-up className={`counter-up ${wrapperCls}`}>
      <CounterUpWrapper>
        {counterData?.map((item, index) => {
          const { number, suffix, title, text } = item;
          return (
            <div className="counter-item" data-aos="fade-up" key={index}>
              <div className="counter-headings-horizontal">
                <h2 className="heading text-64" data-target={number}>
                  0<span>{suffix ? suffix : ""}</span>
                </h2>
                <div className="text text-24 fw-500">{title}</div>
              </div>
              {text && <div className="text text-18">{text}</div>}
            </div>
          );
        })}
      </CounterUpWrapper>
    </counter-up>
  );
};

export default CounterUp2;
