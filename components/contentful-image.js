import Image from 'next/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const ContentfulImage = (props) => {
  return <Image     
    priority

      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" 
   loader={contentfulLoader} {...props} 
   width={1920}
   height={1080}
   />
}

export default ContentfulImage
