import Link from 'next/link'
import Avatar from './avatar'
import DateComponent from './date'
import CoverImage from './cover-image'
import PostTitle from './post-title'
export default function NextPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (

    <>

      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="postImage">
        <CoverImage title={title} url={coverImage.url} />
      </div>
    
    </>
  )
}
