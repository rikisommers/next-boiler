import React from "react";
import CoverImage from "./cover-image";

export const BlockImg = ({ data }) => {

  return (
    <section className="u-mb--80">
      {data.image && data.title && (
        <>
        
          <CoverImage title={data.image.title} url={data.image.url} layout="landscape" />


          <figcaption className="u-fs--caption u-c--light u-mt--16 figcaption">
            {data.image.description}
          </figcaption>
        </>
      )}
    </section>
  );
};

export default BlockImg;
