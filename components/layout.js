import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import { motion } from "framer-motion";
export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <main>{children}</main>
    </>
  )
}