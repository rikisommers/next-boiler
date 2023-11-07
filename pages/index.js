//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback} from "react";
import { getAllCaseStudiesForHome, getHome} from '../lib/api'

import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ home, allCaseStudies}) {



  
  return (

      <Layout>

        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>


      
        <h1>{home.title}</h1>
     
        {allCaseStudies.length > 0 && 
                 <h1>items: { allCaseStudies.length}</h1>

        }

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