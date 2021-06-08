import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import BlogPostCreatorPlugin from '../../plugins/BlogPostCreator'

import Layout from '../../components/layout'
import styles from '../../styles/Portfolio.module.scss'
import PortfolioItem from '../../components/shared/portfolio-item'
import Contact from '../../components/shared/contact'
import {contact, banner} from '../../content/home.json'
import Banner from '../../components/shared/banner'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Portfolio({ file }) {
  const router = useRouter()
  const formOptions = {
    label: 'Portfolio',
    fields: [
      { 
        name: 'title', label: 'Title', component: 'text' 
      },
      { 
        name: 'subtitle', label: 'Subtitle', component: 'text' 
      }
    ],
  }

  let { data, error } = useSWR(`/api/projects`, fetcher)

  // Create the Form
  const [pageData, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)
  usePlugin(BlogPostCreatorPlugin)
  useGithubToolbarPlugins()

  if (error) return <div>failed to load</div>
  if (!data) return <div className="loading">loading...</div>

  return (
    <Layout>
      <Head>
        <title>Portfolio - MT Web - Freelance Web Developer</title>
        <meta property="og:title" content="Portfolio - MT Web - Freelance Web Developer" key="title" />
        <meta property="og:description" content="Portfolio of VueJS, WordPress etc. projects developed by Michael Thomsen as freelance web developer" key="description" />
      </Head>

      <section className="dark-bg">
        <section className={styles.headerWrapper}>
          <div className="inner-wrapper">
            <div className="content-wrapper">
              <h5 className={styles.hint}>My Portfolio</h5>
              <div className="section-header">
                  <h2 className="title">{pageData.title}</h2>
                  <div className="border"></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.boxesSection}>
          <div className="inner-wrapper">
            <div className="content-wrapper">
              <div className={styles.boxes}>
                {data
                .sort((a, b) => a.finished_at < b.finished_at ? 1:-1)
                .map((value, index) => {
                    return (
                      <PortfolioItem key={index} data={value} />
                    )
                })}
              </div>
            </div>
          </div>
        </section>
      </section>
      <Contact data={contact} />
      <Banner data={banner} />
    </Layout>
  )    
}

export async function getStaticProps({preview,previewData}) {
  //const paths = await getAllProjectSlugs()

  /*let projects = []
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/projects`)
    projects = await res.json()
  } catch(err) {
    console.error(err);
  }*/

  
  if (preview) {
    const data = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/portfolio.json',
      parse: parseJson,
    }).then((e) => {
      //e.props.file.paths = paths
      return e
    })
    return data
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/portfolio.json',
        data: (await import('../../content/portfolio.json')).default,
        //paths: paths,
      },
    },
  }
}

