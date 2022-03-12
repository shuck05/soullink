import React, { useEffect } from "react";
import { Soullink } from "../Types";

type props = {
  soullinkList: Soullink[];
  setActiveSoullink: (soullink: Soullink | null) => void;
  activeSoullink: Soullink | null;
};

export const Side: React.FC<props> = (props) => {
  const soullinkClicked = (soullink: Soullink) => {
    props.activeSoullink !== soullink
      ? props.setActiveSoullink(soullink)
      : props.setActiveSoullink(null);
  };

  return (
    <div className="Side-left">
      <ul className="u-List-sidedrawer">
        {props.soullinkList.map((e) => (
          <div key={e.name}>
            <h2
              onClick={() => {
                soullinkClicked(e);
              }}
            >
              {e.name}
            </h2>
          </div>
        ))}
      </ul>
    </div>
  );
};
