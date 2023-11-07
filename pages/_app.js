import { useState, useEffect } from "react"
import Router from "next/router"
import { AnimatePresence } from "framer-motion";
import "../styles/index.scss"


function MyApp({ Component, pageProps, router }) {
  return (

    <AnimatePresence mode="wait" initial={true} onExitComplete={() => {
      console.log("exited");
      window.scrollTo(100, 0);
      }}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  );
}

export default MyApp;
