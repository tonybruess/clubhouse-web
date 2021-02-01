import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import dynamic from 'next/dynamic'

const Agora = dynamic(
  () => import('../components/agora'),
  { ssr: false }
)

export default function Home({}) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>Elon Musk</p>
        <Agora />
      </section>
    </Layout>
  )
}
