import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";
import HomePreviewImage from "./home-preview-image";
import PostTitle from "./post-title";
export default function CaseStudyPreviewAlt({ post }) {
 // console.log("deep post", post);
  return (
    <div className="post">
      <Link
        scroll={false}
        href={`/posts/${post.slug}`}
        className="u-t--link"
      >
        

        <h3 className="c-projects__title">{post.title}</h3>
        {/* <h3>
        {post.subtitle && <p>{post.subtitle}</p>}
        </h3> */}

        {/* {post.img != null && (
        
              <HomePreviewImage title={post.title} url={post.img.url} layout={post.layout}  />
     
        )} */}
      </Link>
    </div>
  );
}