//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import MoreCaseStudies from '../components/moreCaseStudies'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllCaseStudiesForHome, getHome} from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { AnimatePresence } from 'framer-motion'
import CaseStudyPreview from '../components/case-study-preview'
import CustomCursor from '../components/cursor'

export default function Index({ preview, home, caseStudies, allCaseStudies}) {

  console.log('all',allCaseStudies)
  console.log('cs',caseStudies)
  console.log('home',home)


  const variants = {
    hidden: { opacity: 0, x: 0, y: 64 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 64 },
  };
  
  return (

      <Layout>
      <CustomCursor />

        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>

            
        <header className="o-page-header">

            <div className="o-content o-content-grid">
            <div className="title">
                {home.title && 
                  <h2 className="u-t-caption u-c--dark umb--16">{home.title}</h2>
                }
                
                {home.intro &&     
                  <h1 className="t-blockquote u-c--dark u-mb--16">{home.intro}</h1>
                }
            </div>
            </div>
        
        </header> 

        
        <Container>

        {allCaseStudies.length > 0 && 
          <MoreCaseStudies posts={allCaseStudies} />
        }
        </Container>
      </Layout>
  )
}



export async function getStaticProps({ preview = false }) {
  const allCaseStudies = (await getAllCaseStudiesForHome(preview)) ?? []
  const home = (await getHome(preview)) ?? [];

  return {
    props: { 
      allCaseStudies,
      home
    },
  }
}