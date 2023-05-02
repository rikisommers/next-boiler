import { BLOCKS } from "@contentful/rich-text-types";
import RichTextAsset from "./rich-text-asset";
import BlockArticle from "./block-article";
import BlockQuote from "./block-quote";
import BlockImg from "./block-img";
import { BlockEmbed } from "./block-embed";
import BlockImages from "./blockImages";

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    ),
  },
});

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div>
        {content.items &&
          content.items.length > 0 &&
          content.items.map((item) => {
            return (
              <section>
                {item.__typename === "BlockArticle" && (
                  <BlockArticle key={item.id} article={item} ></BlockArticle>
                )}

                {item.__typename === "BlockImage" && (
                  <BlockImg key={item.id} data={item} />
                )}

                {item.__typename === "BlockIg" && (
                  <BlockImages key={item.id} data={item} />
                )}


                {item.__typename === "BlockQuote" && (
                  <BlockQuote key={item.id} data={item} />
                )}

                {item.__typename === "BlockEmbed" && (
                  <BlockEmbed key={item.id} data={item} />
                )}

                

              </section>

                // {/* {item.__typename === "BlockEmbed" && (
                //   <h1>Add component for EMBED</h1>
                // )} */}
            );
          })}
      </div>
    </div>
  );
}
