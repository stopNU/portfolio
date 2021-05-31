import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import BlogPostCreatorPlugin from '../../plugins/BlogPostCreator'

import Layout from '../../components/layout'
import styles from '../../styles/Portfolio.module.scss'
import PortfolioItem from '../../components/shared/portfolio-item'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Portfolio({ file }) {
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

  const router = useRouter()
  let { data, error } = useSWR(`/api/projects`, fetcher)

 

  // Create the Form
  const [pageData, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)
  usePlugin(BlogPostCreatorPlugin)
  useGithubToolbarPlugins()

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <section className="dark-bg">
          
        <section className={styles.headerWrapper}>
          <div className="inner-wrapper">
            <div className="content-wrapper">
              <h1 className={styles.title}>{pageData.title}</h1>
            </div>
          </div>
        </section>

        <section className="padding">
          <div className="inner-wrapper">
            <div className="content-wrapper">
              <div className={styles.boxes}>
                {data.map((value, index) => {
                    return (
                      <PortfolioItem key={index} data={value} />
                    )
                })}
              </div>
            </div>
          </div>
        </section>

          
      </section>
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

