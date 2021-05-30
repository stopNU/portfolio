import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { getAllProjectSlugs } from '../../lib/projects'

import Layout from '../../components/layout'
import styles from '../../styles/Portfolio.module.scss'

export default function PortfolioProject({ file }) {
    const formOptions = {
        label: 'Project Page',
        fields: [
          {
            label: 'Name/client',
            name: 'name',
            component: 'text',
            validation(title) {
              if (!title) return "Required."
            }
          },
          {
            label: 'Short description',
            name: 'short_description',
            component: 'textarea'
          },
          {
            label: 'Slug',
            name: 'slug',
            component: 'text',
            validation(title) {
              if (!title) return "Required."
            }
          },
          {
            label: 'Thumbnail',
            name: 'thumbnail',
            component: 'image',
            parse: media => `/static/${media.filename}`,
            uploadDir: () => '/static/',
            previewSrc: fullSrc => fullSrc.replace('', ''),
          },
          {
            name: 'content',
            label: 'Content',
            component: 'group',
            fields: [
              { 
                name: 'title', label: 'Title', component: 'text' 
              },
              { 
                name: 'subtitle', label: 'Subtitle', component: 'text' 
              },
              { 
                name: 'text', label: 'Text', component: 'textarea' 
              },
              {
                label: 'Image',
                name: 'image',
                component: 'image',
                parse: media => `/static/${media.filename}`,
                uploadDir: () => '/static/',
                previewSrc: fullSrc => fullSrc.replace('', ''),
              }
            ]
          },
        ],
    }

    const [data, form] = useGithubJsonForm(file, formOptions)
    usePlugin(form)
    useGithubToolbarPlugins()

    return (
      <Layout>
        <section className="dark-bg">
          <div className="content-wrapper" className={styles.textWrapper}>
            <h1>Project: {data.name}</h1>
            <h3>{data.short_description}</h3>
          </div>
        </section>
      </Layout>
    )
}
  
export async function getStaticProps({preview,previewData, params}) {

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
  const paths = await getAllProjectSlugs()
  return {
    paths,
    fallback: false
  }
}