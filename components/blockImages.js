import React from 'react'
import CoverImage from './cover-image';

  export const BlockImages = ({data}) => {

    console.log('imgs---------------',data)
    return (   

        <section className="u-mb--80">

          <h3 className="col-6 u-ph--title u-t-subtitle u-mb--16">{data.title}</h3>
          
          <div className="o-img-grid">
            
              {data.imagegridCollection && data.imagegridCollection.items.map((image) => {
                  return(
                    <figure>
                        <CoverImage title={image.title} url={image.url}   />
                        <figcaption className="u-fs--caption u-c--light">
                        {image.description}
                        </figcaption>
                    </figure>
                  )
              })}

          </div>
        </section>
     );
    
    };

export default BlockImages;
