import React, {useRef} from "react";
import RichTextOptions from "./rich-text";
import ContentfulImage from "./contentful-image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { motion, useScroll } from "framer-motion";

export const BlockArticle = ({ article }) => {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });

  return (
    <section ref={ref} className="u-mb--80" id={article.title}>
              <figure className="progress">
          <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="indicator"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </figure>
      <div className="o-content-grid-alt">

        <div className="title">
            {article.title && (
              <h2>{article.title}</h2>
            )}
            {article.content && (
              <h3 >{article.content.content}</h3>
            )}
      </div>

        <div className="content rich-content">
          {article.contentRich && (

            <>{documentToReactComponents(article.contentRich.json, RichTextOptions)}</>
          )}
          {/* {article.img &&
            article.img.map((img) => {
              return (
                <ContentfulImage
                  key={img.title}
                  width={2000}
                  height={1000}
                  alt={`Cover Image for ${img.title}`}
                  src={img.url}
                />
              );
            })} */}
        </div>
      </div>
    </section>
  );
};

export default BlockArticle;
