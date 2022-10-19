import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Layout from "../../components/layout";

const FirstPost: React.FC<{}> = () => {
    return (
        <Layout home={false}>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </Layout>
    )
}

export default FirstPost