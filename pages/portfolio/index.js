import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { useJsonForm } from 'next-tinacms-json'
import BlogPostCreatorPlugin from '../../plugins/BlogPostCreator'
import { getAllProjectSlugs } from '../../lib/projects'

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

  console.log("file", file)
  const paths = file.paths
  console.log("paths", paths)

  return (
    <section className="dark-bg">
      <div className="content-wrapper">

       <h2 className={styles.title}>Projects: (manual)</h2>
          {data.projects.map((value, index) => {
              return (
              <div key={index}>
                <Link href={`/portfolio/${encodeURIComponent(value.slug)}`}>
                  <a className={styles.link}>{value.name}</a>
                </Link>
              </div>
              )
          })}

        
<br></br>
      <h2 className={styles.title}>Projects: (auto)</h2>
          {paths.map((value, index) => {
            console.log("value", value)
              return (
                <Link key={index} href={`/portfolio/${encodeURIComponent(value.params.slug)}`}>
                  <a className={styles.link}>{<p>{value.params.slug}</p>}</a>
                </Link>
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
  const paths = await getAllProjectSlugs()
  console.log("log", paths)
  if (preview) {
    const data = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/portfolio.json',
      parse: parseJson,
    }).then((e) => {
      e.props.file.paths = paths
      return e
    })
    console.log("data", data)
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
        paths: paths
      },
    },
  }
}

