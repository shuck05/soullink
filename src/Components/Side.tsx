import React from "react";
import { Soullink } from "../Types";

type props = {
  soullinkList: Soullink[];
  setActiveSoullink: (soullink: Soullink) => void;
  activeSoullink: Soullink;
};

export const Side: React.FC<props> = (props) => {
  return (
    <div className="Side-left">
      <ul className="u-List-sidedrawer">
        {props.soullinkList.map((e) => (
          <div key={e.name}>
            <h2>{e.name}</h2>
          </div>
        ))}
      </ul>
    </div>
  );
};
