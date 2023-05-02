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
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import { CMS_NAME } from "../../lib/constants";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NextPost from "../../components/next-post";
import CustomCursor from "../../components/cursor";

export default function Post({ post, morePosts, nextPost, preview }) {
  const router = useRouter();

  const shouldAnimate = router.pathname.startsWith("/posts/");

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  const [posT, setPosT] = useState(0);
  
  // useEffect(() => {
  //   if (router.pathname.startsWith("/posts/")) {
  //     // Select the title wrapper
  //     const next = document.querySelector(".test");
  //     if (next) {
  //       setPosT(Math.round(next.getBoundingClientRect().y) - 90);
  //     }
  //   }
  // }, [router.pathname]);

  const handleLinkClick = () => {
    const next = document.querySelector(".test");
    console.log('ddd',Math.round(next.getBoundingClientRect().y) - 90);
    setPosT(Math.round(next.getBoundingClientRect().y) - 90);
  };

  console.log('mote posts', morePosts)
 

  // const [state, setState] = useState({
  //   posT: 400,
  // });
  // const [scrollTop, setScrollTop] = useState(0);

  // useEffect(() => {
  //   const handleScroll = (event) => {
  //     setScrollTop(window.scrollY);

  //     // Select the title wrapper
  //     const next = document.querySelector(".test");
  //     const nextTop = next.getBoundingClientRect().top - window.scrollY;
  //     const nextTopS = Math.round(next.getBoundingClientRect().top - window.scrollY);

  //     setState({
  //       posT: Math.round(next.getBoundingClientRect().y) - 90,
  //     });
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);


  
  return (
    <Layout preview={preview}>
            <CustomCursor />

      <div className="postop">
        {posT}
      </div>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>

            <motion.div
            className="content"
              initial={{  opacity: 0 }}
              animate={{  opacity: 1 }}
              exit={{  opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1,
                delay: 0,
              }}
            >
              <article>
                <Head>
                  <title>
                    {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                  </title>
                  <meta property="og:image" content={post.coverImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />

                <PostBody content={post.content} />
              </article>
              <SectionSeparator />
            </motion.div>

            {/* 
            {morePosts && morePosts.length > 0 && (
              <MoreStories posts={morePosts} />
            )}
 */}

            {morePosts && morePosts.length > 0 && (

              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={ shouldAnimate ? {y: -(posT) }: null }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 1,
                  delay: 1,
                }}
              >
                <div className="test">

                <Link  onClick={handleLinkClick} scroll={false} href={`/posts/${morePosts[1].slug}`} className="hover:underline">
                
                  <NextPost 
                    key={morePosts[1].slug}
                    title={morePosts[1].title}
                    coverImage={morePosts[1].coverImage}
                    date={morePosts[1].date}
                    author={morePosts[1].author}
                    slug={morePosts[1].slug}
                    excerpt={morePosts[1].excerpt}
                  />
          
                </Link> 
                  
                </div>
              </motion.div>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
      nextPost: data?.morePosts[1] ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  };
}
