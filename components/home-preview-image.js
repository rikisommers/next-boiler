import ContentfulImage from './contentful-image'
import Link from 'next/link'
import cn from 'classnames'

export default function HomePreviewImage({ title, url, slug, layout }) {
  const image = (


    
    <ContentfulImage
      width={1920}
      height={1280}
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      alt={`Cover Image for ${title}`}
      src={url}
    />



  )



  return (
    <div className={`c-project-list__preview-image`}>
    {
        image
    } 
    </div>
  )
}
