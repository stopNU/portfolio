import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { useJsonForm } from 'next-tinacms-json'
import BlogPostCreatorPlugin from '../../plugins/BlogPostCreator'

import styles from '../../styles/Portfolio.module.scss'

import Link from 'next/link'


export default function Portfolio({ file }) {
  const formOptions = {
    label: 'Portfolio',
    fields: [
      { 
        name: 'projects', 
        label: 'Projects',
        component: 'group-list',
        description: '',
        fields: [
          { 
            name: 'name', label: 'Name', component: 'text' 
          },
          { 
            name: 'slug',  label: 'Slug', component: 'text' 
          },
        ] 
      }
    ],
  }


  // Create the Form
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)
  usePlugin(BlogPostCreatorPlugin)
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

/*export async function getStaticProps() {
  const content = await import(`../../content/portfolio.json`)

  return {
    props: {
      jsonFile: {
        fileRelativePath: `/content/portfolio.json`,
        data: content.default,
      },
    },
  }
}*/

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

