import "@/styles/promotion.css";
import { SectionProps } from "@/types/sectionProps";
``;
import CounterUpWrapper from "../CounterUpWrapper";

const CounterUp = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, container, counterData } = data;

  return (
    <CounterUpWrapper>
      <counter-up className={`counter-up block ${wrapperCls}`}>
        <div className={container}>
          <div className="counter-up-box radius18">
            <div className="grid grid-cols-12 gap-1 product-grid text-center">
              {counterData?.map((item, index) => {
                const { number, suffix, title } = item;

                return (
                  <div
                    className="col-span-12 md:col-span-4"
                    key={`counter-item-${index}`}
                    data-aos="fade-up"
                  >
                    <div className="counter-item">
                      <h2 className="heading text-50" data-target={number}>
                        0<span>{suffix ? suffix : ""}</span>
                      </h2>
                      <div className="text text-18 fw-500">{title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </counter-up>
    </CounterUpWrapper>
  );
};

export default CounterUp;
