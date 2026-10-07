import "@/styles/promotion.css";

import { CounterItemProps } from "@/types/counterItemProps";
import CounterUpWrapper from "../CounterUpWrapper";

const CounterUp4 = ({ data }: { data: CounterItemProps[] }) => {
  return (
    <CounterUpWrapper>
      <counter-up className="counter-up-wrap">
        {data?.map((item, index) => {
          const { number, suffix, title } = item;

          return (
            <div
              className="counter-item"
              key={`counter-item-${index}`}
              data-aos="fade-right"
            >
              <h2 className="heading text-50" data-target={number}>
                0<span>{suffix ? suffix : ""}</span>
              </h2>
              <div className="promotion-text text text-24 fw-500">{title}</div>
            </div>
          );
        })}
      </counter-up>
    </CounterUpWrapper>
  );
};

export default CounterUp4;
