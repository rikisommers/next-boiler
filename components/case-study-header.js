import Avatar from "../components/avatar";
import DateComponent from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";

export default function CaseStudyHeader({ title, img, subtitle }) {
  return (
    <>
      <div className="o-content-grid u-mt--64 u-mb--32">
        <div className="title">
          <PostTitle>{title}</PostTitle>
          <h3 className="u-c--light">sssss</h3>
        </div>
        {subtitle && <h2 className="content">{subtitle}</h2>}
      </div>

      {img && (
        <div className="u-mb--80">
          <CoverImage title={img.title} url={img.url} layout="landscape-tall" />
        </div>
      )}
    </>
  );
}
