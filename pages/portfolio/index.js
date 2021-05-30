import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { useJsonForm } from 'next-tinacms-json'
import BlogPostCreatorPlugin from '../../plugins/BlogPostCreator'
//import { getAllProjectSlugs } from '../../lib/projects'

import Layout from '../../components/layout'
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

  const paths = file.api
  console.log("file", file)
  return (
    <Layout>
      <section className="dark-bg">
        
        <div className="content-wrapper">

          <h2 className={styles.title}>Projects: (auto)</h2>
              {paths.map((value, index) => {
                  return (
                    <div key={index}>
                      <p>{value.name}</p>
                      <Link href={`/portfolio/${encodeURIComponent(value.slug)}`}>
                        <a className={styles.link}>{<p>{value.slug}</p>}</a>
                      </Link>
                    </div>
                  )
              })}
          
        </div>
            
      </section>
    </Layout>
  )    
}

export async function getStaticProps({preview,previewData}) {
  //const paths = await getAllProjectSlugs()

  const projects = []
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/projects`)
    projects = await res.json()
  } catch(err) {
    console.error(err);
  }

  
  if (preview) {
    const data = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/portfolio.json',
      parse: parseJson,
    }).then((e) => {
      //e.props.file.paths = paths
      e.props.file.api = projects
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
        api: projects
      },
    },
  }
}

