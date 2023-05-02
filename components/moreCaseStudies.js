import { useEffect, useRef, useState } from "react";

import PostPreview from '../components/post-preview'
import CaseStudyPreview from './case-study-preview'
import CaseStudyPreviewAlt from '../components/case-study-preview-alt'

import { motion, cubicBezier, useScroll, useTransform } from 'framer-motion'

export default function MoreCaseStudies({ posts }) {

  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  const [height, setHeight] = useState(0);
  const surroundingBackup = 4;
  const backupHeight = height * surroundingBackup;
 
  const myRefs = useRef([]);
  let offsets = [];
  const [scrollPositions, setScrollPositions] = useState([]);




  const handleScroll = () => {
    if (scrollRef.current) {
      const scroll = scrollRef.current.scrollTop;
      const cont = containerRef.current.getBoundingClientRect().top;
      
      console.log('backup height',backupHeight)
      console.log('scrollref pos',scroll - backupHeight)
      console.log('containerref pos',cont)

      if (scroll < backupHeight || scroll >= backupHeight + height) {
        scrollRef.current.scrollTop = backupHeight + (scroll % height);
      }
    }
    const offsets = posts.map((item, index) => getHeight(index));
    setScrollPositions(offsets);
    console.log('ofsets',scrollPositions);
  };




  function getHeight(index) {

    //  console.log('----------WH', windowHeight )
    //  console.log('----------SC', scrollRef.current.scrollTop - 7388 )


      if (scrollRef.current) {
        const el = myRefs.current[index];
        const rect = el?.getBoundingClientRect();
         const windowHeight = window.innerHeight;
         const elementTop = rect.top  ;
         const scrollTop = scrollRef.current.scrollTop ;
         const elementViewportY = (rect.top - scrollRef.current.scrollTop ) / 10 ;
         
    const res = Math.round( elementViewportY);


    console.log('----------res', res )
    return res;

      };

  }

function getOffsets(){
  return offsets;
}

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
      scrollRef.current.scrollTop = backupHeight;
    }
  }, [backupHeight]);

  const easing = cubicBezier(0.35, 0.17, 0.3, 0.86);






const renderContent = (contentArray) => {



  return contentArray.map((post, index) => {

    

    return(
   
      
      <motion.div key={post.slug} 
      style={{ x: 0, rotateY: getHeight(index) }}
      className="fuck" 
      ref={(el) => (myRefs.current[index] = el)}>
                  <p>{index + 1} </p>
          <p>{getHeight(index)} </p>
          <CaseStudyPreviewAlt
          post={post}
          />

    </motion.div>
  
    )}
  );
};


  return (
    <>
     

 
    <div className="infinite-scroll-loop-outer" ref={containerRef}>
      <div
        className="infinite-scroll-loop-inner "
        ref={scrollRef}
        style={{
          height,
          overflowY: "scroll",
        }}
        onScroll={handleScroll}
      >


        {Array(surroundingBackup)
          .fill()
          .map((_, i) => (
            <div className="c-projects before" key={`before-${i}`}>{renderContent(posts)}</div>
          ))}
        
        <div className="c-projects during" ref={contentRef}>{renderContent(posts)}</div>

        {Array(surroundingBackup)
          .fill()
          .map((_, i) => (
            <div className="c-projects after" key={`after-${i}`}>{renderContent(posts)}</div>
          ))}
 

      </div>
    </div>


    <motion.div
               className='c-projects__image'
                initial={{ 
                  opacity: 0,
                  scale:1.3
                }}
                animate={{    
                  opacity: 1,
                  scale:1
                 }}
                exit={ {
                  opacity: 0,
                  scale:1.3
                 } }
                transition={{
                  easing: easing,
                  duration:0.6,
                  delay:0
                }}
              >                


    </motion.div> 
    </>
  
  )
}








    {/* <motion.section className='c-projects'
    initial={{ 
      opacity: 0 }}
    animate={{ 
      opacity: 1,
     }}
    exit={{
      opacity:0
     }}
     transition={{
      duration:0.3,
      delay:0,
      easing: easing,
    }}
     >

      <div className='c-projects__list'>
        {posts.map((post) => (
       
 
          <CaseStudyPreviewAlt
            key={post.slug}
            post={post}
          

          />
         
        ))}
    </div>
    </motion.section>
        */}