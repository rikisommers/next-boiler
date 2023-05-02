import React from "react";
import CoverImage from "./cover-image";

export const BlockEmbed = ({ data }) => {
  return (
    <section className="u-mb--80">
     
        <figure>

        {data.caption &&
          <figcaption className="u-fs--caption u-c--light">
            {data.caption}
          </figcaption>
          }

          <div className="c-image--landscape-tall">
          <iframe src={data.url} width="100%" height="100%"></iframe>
          </div>


        </figure>
      
    </section>
  );
};

export default BlockEmbed;


