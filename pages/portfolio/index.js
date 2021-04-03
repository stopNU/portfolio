import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import styles from '../../styles/Portfolio.module.scss'

import Link from 'next/link'

export default function Portfolio({ file }) {
  const formOptions = {
    label: 'Portfolio',
    fields: [
      { 
        name: 'name', label: 'Name', component: 'text' 
      },
      { 
        name: 'slug',  label: 'Slug', component: 'text' 
      },
    ],
  }

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  useGithubToolbarPlugins()


  return (
    <section className="dark-bg">
      <div className="content-wrapper">
          {data.projects.map((value, index) => {
              return (
              <div key={index}>
                <Link href={`/portfolio/${encodeURIComponent(value.slug)}`}>
                  <a className={styles.link}>{value.name}</a>
                </Link>
              </div>
              )
          })}
          </div>
          
      </section>
  )    
}


export async function getStaticProps({preview,previewData}) {
  console.log("log", preview,previewData)
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/portfolio.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/portfolio.json',
        data: (await import('../../content/portfolio.json')).default,
      },
    },
  }
}