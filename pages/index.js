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

    return (scrollRef.current.scrollTop = pos);
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

  const scrollPos1 = getScrollPos();
  const scrollHeight = getClonesHeight();

  function scrollUpdate() {
    if (!disableScroll) {
      scrollPos = getScrollPos();
      const scrollHeight = getClonesHeight();
      if (scrollPos >= scrollHeight) {
        setScrollPos(1);

        disableScroll = true;
      } else if (scrollPos <= 0) {
        setScrollPos(scrollHeight);
        disableScroll = true;
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
        <div className="postop">
          VAL:{getClonesHeight()}VAL:{scrollPos}
        </div>

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
