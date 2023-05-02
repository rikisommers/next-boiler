import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export const RichTextOptions = {
    
    renderMark: {
        [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    },
    renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data
        return (
            <a href={uri} className="u-t--link">
            {children}
            </a>
        )
        },
        [BLOCKS.HEADING_2]: (node, children) => {
        return <h2>{children}</h2>
        },
        [BLOCKS.HEADING_3]: (node, children) => {
        return <h3>{children}</h3>
        },
        [BLOCKS.HEADING_4]: (node, children) => {
        return <h4>{children}</h4>
        },
        [BLOCKS.HEADING_5]: (node, children) => {
        return <h5>{children}</h5>
        },

        [BLOCKS.PARAGRAPH]: (node, children) => {
            return <p className='testing'>{children}</p>
            },

       [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { gatsbyImageData, description } = node.data.target
            return (
            <GatsbyImage
                image={getImage(gatsbyImageData)}
                alt={description}
            />
            )
        },
    },
    renderText: text => {
        return text.split('\n').reduce((children, textSegment, index) => {
          return [...children, index > 0 && <br key={index} />, textSegment];
        }, [])
    }
}