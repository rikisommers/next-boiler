import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {



  return (
      <nav className="c-header o-content">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
              delay: 1,
            },
          }}
        >
          <Link className="u-t--link" href="/">
            RIKI SOMMERS 
          </Link>
        </motion.h1>
        <ul className="c-header__menu">
          
          <li>
            <Link href="/">Work</Link>
          </li>
          <li>
            <Link href="/bio">About</Link>
          </li>
          <li>
            <Link href="/test">Test</Link>
          </li>
        </ul>
      </nav>
    
  );
}
