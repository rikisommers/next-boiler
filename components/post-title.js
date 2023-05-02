import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function PostTitle({children }) {



  // const tref = useRef(null)
  // const isInView = useInView(tref, { once: true })
  // const controls = useAnimation();

  // useEffect(() => {
  //   if (isInView) {
  //     console.log("Element is in view: ", isInView)
  //     controls.start("visible");
  //   }
  //   if (!isInView) {
  //     controls.start("hidden");
  //   }
  // }, [ctrls, inView]);
  
  // const textAnimationVariants = {
  //   initial: {
  //     opacity: 0,
  //     y: `0.25em`,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: `0em`,
  //     transition: {
  //       duration: 1,
  //       ease: [0.2, 0.65, 0.3, 0.9],
  //     },
  //   },
  // };



  return (
    <h1>
      {children}
    </h1>
  )
}
