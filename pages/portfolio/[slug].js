import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { getAllProjectSlugs } from '../../lib/projects'
import styles from '../../styles/Portfolio.module.scss'

export default function PortfolioProject({ file }) {
    const formOptions = {
        label: 'Test Page',
        fields: [
          { 
            name: 'title', label: 'Title', component: 'text' 
          }
        ],
    }

    const [data, form] = useGithubJsonForm(file, formOptions)
    usePlugin(form)
    useGithubToolbarPlugins()

    return (
      <section className="dark-bg">
        <div className="content-wrapper" className={styles.textWrapper}>
          <h1>Project: {data.title}</h1>
          <h3>{data.subtitle}</h3>
        </div>
      </section>
    )
}
  
export async function getStaticProps({preview,previewData, params}) {

    console.log("testi test", preview,previewData, params)
    if (preview) {
      return getGithubPreviewProps({
        ...previewData,
        fileRelativePath: `content/projects/${params.slug}.json`,
        parse: parseJson,
      })
    }
    return {
      props: {
        sourceProvider: null,
        error: null,
        preview: false,
        file: {
          fileRelativePath: `content/projects/${params.slug}.json`,
          data: (await import(`../../content/projects/${params.slug}.json`)).default,
        },
      },
    }
  }

export async function getStaticPaths() {
  const paths = getAllProjectSlugs()
  console.log("paths", paths)
  return {
    paths,
    fallback: false
  }
}