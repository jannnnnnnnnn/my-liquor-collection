import React, { useEffect } from "react";

export default function LandingPage(props) {
  useEffect(() => {
    props.resetAlertMsg();
  }, []);
  const style = {
    backgroundImage:
      "url('https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/article/2019/03/05/ab-inbev-on-craft-and-specialty-beer-the-high-end-is-our-growth-engine/9218376-3-eng-GB/AB-InBev-on-craft-and-specialty-beer-The-High-End-is-our-growth-engine_wrbm_large.jpg')",
    height: "830px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: "0.8",
  };
  return (
    <div style={style}>
      {/* Landing page */}
      {/* <SearchResults searchData={props.searchData} /> */}
    </div>
  );
}
