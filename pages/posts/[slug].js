import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import PostPreview from "../../components/post-preview";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import {
  getAllPostsWithSlug,
  getAllCSPostsWithSlug,
  getCaseStudyAndNextPost,
  getPostAndMorePosts,
  getAllCaseStudies,
  getAllCaseStudies2,
  getAllCaseStudiesNext
} from "../../lib/api";
import PostTitle from "../../components/post-title";
import { CMS_NAME } from "../../lib/constants";
import { useState, useEffect, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import NextPost from "../../components/next-post";
import CaseStudyHeader from "../../components/case-study-header";
import CaseStudyPreview from "../../components/case-study-preview";
import SmoothScroll from "../../components/smoothScroll";
import CustomCursor from "../../components/cursor";

export default function Post({ post, nextPost, preview }) {
  const router = useRouter();
  const shouldAnimate = router.pathname.startsWith("/posts/");
 
  const easing = cubicBezier(0.35, 0.17, 0.3, 0.86);

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }


  console.log('p',post);
  console.log('np',nextPost);
  const [posT, setPosT] = useState(0);

  const handleLinkClick = () => {
    const next = document.querySelector(".test");
    console.log("ddd", Math.round(next.getBoundingClientRect().y) - 90);
    setPosT(Math.round(next.getBoundingClientRect().y) - 90);
  };

  return (
    <Layout preview={preview}>
      <CustomCursor/>
      
      <SmoothScroll>
      <div className="postop">{posT}</div>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
          
            <article>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>

                {post.img && (
                  <meta property="og:image" content={post.img.url} />
                )}
                  
                <Link 
                rel="preload"
                as="image"
                href={post.img.url}
                />

              </Head>

              <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity:1,
                transition:{
                  duration:0.3
                }
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration:0.1
              }}
              >
                <CaseStudyHeader
                  title={post.title}
                  subtitle={post.subtitle}
                  img={post.img}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    easing: easing,
                    duration: 0.3,
                    delay: 0.6,
                  },
                }}
                exit={{ 
                  opacity: 0,
                  transition: {
                    easing: easing,
                    duration: 0.3,
                    delay: 0,
                  },
                }}
              >
                {post.csblocksCollection && (
                  <PostBody content={post.csblocksCollection} />
                )}
              </motion.div>
            </article>

            {nextPost && (
              <motion.div
                className="test"
                initial={{ 
                  y: 0, 
                  opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  height:'45vh'
                 }}
                exit={shouldAnimate ? { 
                  y: -posT,
                  height:'auto'
                 } : null}
                transition={{
                  easing: easing,
                  height:{
                    duration: 0,
                    delay: 0,
                    },
                  y:{
                  duration: 0.6,
                  delay: 0.6,
                  }
                }}
              >                
                  <Link                  
                    onClick={handleLinkClick}
                    scroll={false}
                    href={`/posts/${nextPost.slug}`}
                    className="link"
                  >
                      <CaseStudyHeader
                      title={nextPost.title}
                      subtitle={nextPost.subtitle}
                      img={nextPost.img}
                      />
              

                  </Link>
               
              </motion.div>
            )}
          </>
        )}
      </Container>
      </SmoothScroll>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const data = await getAllCaseStudies2(slug,preview);
  const next = await getAllCaseStudiesNext(slug,preview);

  return {
    props: {
      slug,
      preview,
      post: data[0] ?? null,
      nextPost: next[0] ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllCaseStudies(false  );
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  };
}
