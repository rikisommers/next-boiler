import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
export default function CaseStudyPreview({ post }) {
 // console.log("deep post", post);
  return (
    <div className="post">
      <Link
        scroll={false}
        href={`/posts/${post.slug}`}
        className="u-t--link"
      >
        
       

        {post.img != null && (
        
              <CoverImage title={post.title} url={post.img.url} layout={post.layout}  />
     
        )}


        <h3>{post.title}</h3>
        {/* <h3>
        {post.subtitle && <p>{post.subtitle}</p>}
        </h3> */}

      </Link>
    </div>
  );
}
