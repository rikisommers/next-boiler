import Link from 'next/link'
import Avatar from '../components/avatar'
import DateComponent from '../components/date'
import CoverImage from './cover-image'
import PostTitle from './post-title'
export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    // <div>
    //   <div className="mb-5">
    //     <CoverImage title={title} slug={slug} url={coverImage.url} />
    //   </div>
    //   <h3 className="text-3xl mb-3 leading-snug">
    //     <Link href={`/posts/${slug}`} className="hover:underline">
    //       {title}
    //     </Link>
    //   </h3>
    //   <div className="text-lg mb-4">
    //     <DateComponent dateString={date} />
    //   </div>
    //   <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    //   {author && <Avatar name={author.name} picture={author.picture} />}
    // </div>
    <>
        <Link scroll={false} href={`/posts/${slug}`} className="hover:underline">

      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      {/* <div className="postImage">
        <CoverImage title={title} url={coverImage.url} />
      </div> */}

      </Link>
    </>
  )
}
