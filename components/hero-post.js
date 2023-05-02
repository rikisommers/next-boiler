import Link from 'next/link'
import Avatar from '../components/avatar'
import DateComponent from '../components/date'
import CoverImage from '../components/cover-image'
import ContentfulImage from './contentful-image'

export default function HeroPost({
  post
}) {
  return (
    <Link href={`/posts/${post.slug}`} className="hover:underline">

    <div className="c-hero-img">
    <div className="o-fill">
      <ContentfulImage
        width={2000}
        height={1000}
        alt={`Cover Image for ${post.title}`}
        src={post.img.url}
      />
    </div>
    </div>
    </Link>

  )
}
