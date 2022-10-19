import Head from "next/head"
import React from "react"

import Date from "../../components/date"
import Layout from "../../components/layout"
import { getAllPostIds, getPostData, PostData } from "../../lib/posts"
import utilStyles from '../../styles/utils.module.scss'

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData,
        }
    }
}

const Post: React.FC<{ postData: PostData }> = ({ postData }) => {
    return (
        <Layout home={false}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export default Post