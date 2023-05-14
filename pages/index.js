//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import gsap from "gsap";

import Layout from "../components/layout";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "../components/smoothScroll";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  cubicBezier,
} from "framer-motion";

export default function Index() {
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  let disableScroll = false;
  let scrollPos = 0;
  let clonesHeight = 0;
  // let scrollHeight = 0;
  //let clones = [];

  let numItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function getScrollPos() {
    console.log(scrollRef.current?.scrollTop <= 500 ? "true" : "false");

    //console.log("mst", menu.current.getBoundingClientRect().top);
    return scrollRef.current?.scrollTop;
    //const scroll = scrollRef.current.scrollTop;
  }

  function setScrollPos(pos) {
    const rect = scrollRef.current.getBoundingClientRect();
    const newRect = {
      top: pos,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
    //menu.current.style.transform = `translateY(-${pos}px)`;
    //return newRect;
    scrollRef.current.scrollTop = pos;

    // return (menu.current.getBoundingClientRect().top = pos);
  }

  function getClonesHeight() {
    clonesHeight = 0;
    const clones = itemRefs.current;
    clones.forEach((clone) => {
      clonesHeight += clone.offsetHeight;
    });
    //console.log("clones height -------------", clonesHeight);
    return clonesHeight;
  }

  function reCalc() {
    if (scrollPos <= 0) {
      console.log("reset");
      setScrollPos(1);
    }
  }

  // const { scrollYProgress } = useScroll({ container: scrollRef });

  // function getScroll() {
  //   const scrollHeight = getClonesHeight();
  //   let scaleX = useSpring(scrollYProgress, {
  //     stiffness: 100,
  //     damping: 30,
  //     restDelta: 0.001,
  //   });

  //   if (scrollPos >= scrollHeight) {
  //     console.log("reseting");

  //     scaleX = 1;
  //   }
  //   console.log("scalex", scaleX);
  //   return scaleX;
  // }

  // const { scrollY } = useScroll({ container: scrollRef }); // measures how many pixels user has scrolled vertically
  // // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // // ... based on current scroll position to translateY the document in a natural way
  // const transform = useTransform(
  //   scrollY,
  //   [0, clonesHeight],
  //   [0, -clonesHeight]
  // );
  // const physics = { damping: 15, mass: 0.27, stiffness: 55 }; // easing of smooth scroll
  // const spring = useSpring(transform, physics); // apply easing to the negative scroll value
  const scrollPos1 = getScrollPos();
  const scrollHeight = getClonesHeight();
    // const transform = useTransform(scrollYProgress, [0, 100], [0, 10], {
  //   ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  // });



  const { scrollYProgress } = useScroll({ container: scrollRef });
  const [isEasingEnabled, setEasingEnabled] = useState(true);
  const transform = useTransform(scrollYProgress, [0, 100], [0, 30], {
  });
  
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  const scaleX = spring;

  function scrollUpdate() {
    //    console.log("scroll", disableScroll);

    // if (event.target === menu.current && event.deltaY === 0) {
    //   console.log("native");
    // } else {
    //   console.log("wheel");
    // }
    console.log("sp", getScrollPos());
    console.log("sh", getClonesHeight());

    //     console.log("sh", getClonesHeight());
    console.log("s-------------------------y", isEasingEnabled);

    if (!disableScroll) {
      scrollPos = getScrollPos();
      const scrollHeight = getClonesHeight();
      if (scrollPos >= scrollHeight) {
        setScrollPos(1);
        console.log("fff");

        disableScroll = true;
        setEasingEnabled(false);
      } else if (scrollPos <= 0) {
        console.log("ccc");

        setScrollPos(scrollHeight);
        disableScroll = true;
        setEasingEnabled(false);
      }
    }
    if (disableScroll) {
      window.setTimeout(() => {
        disableScroll = false;
      }, 40);
    }
  }

  useEffect(() => {
    function handleScroll() {
      scrollUpdate();
    }
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef, scrollUpdate]);

  function reCalc() {
    scrollPos = getScrollPos();
    console.log("recalc");
    if (scrollPos <= 0) {
      setScrollPos(40);
    }
  }
  reCalc();

  const renderContent = (items, customClass) => {
    return items.map((i, index) => {
      return (
        <div
          key={i}
          className={`scroll-item ${customClass}`}
          ref={(el) => (itemRefs.current[i] = el)}
        >
          <h3>{i}</h3>
        </div>
      );
    });
  };

  return (
    <Layout>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>

      <>
        <motion.div className="progress-bar" style={{ scaleX }} />

        {/* <div className="postop">VAL:{scrollYProgress}</div> */}
        <div className="infinite-scroll-container" ref={scrollRef}>
          <div
            className="scroll-wrapper"
            //style={{ y: scrollPos }} // translateY of scroll container using negative scroll value
          >
            {renderContent(numItems)}
            {renderContent(numItems, "clone")}
          </div>
        </div>
      </>
      {/* <SmoothScroll>
      </SmoothScroll> */}
    </Layout>
  );
}
