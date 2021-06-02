import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { getAllProjectSlugs } from '../../lib/projects'
import Image from 'next/image'

import Layout from '../../components/layout'
import styles from '../../styles/PortfolioSlug.module.scss'
import Content from '../../components/portfolio/content'
import Contact from '../../components/shared/contact'
import {contact, banner} from '../../content/home.json'
import Banner from '../../components/shared/banner'

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
                label: 'Hero image',
                name: 'hero_image',
                component: 'image',
                parse: media => `/static/${media.filename}`,
                uploadDir: () => '/static/',
                previewSrc: fullSrc => fullSrc.replace('', ''),
              },
              { 
                name: 'title', label: 'Title', component: 'text' 
              },
              { 
                name: 'website_url', label: 'Website URL', component: 'text' 
              },
              { 
                name: 'description', label: 'Description', component: 'textarea' 
              },
              {
                label: 'Image (content)',
                name: 'image',
                component: 'image',
                parse: media => `/static/${media.filename}`,
                uploadDir: () => '/static/',
                previewSrc: fullSrc => fullSrc.replace('', ''),
              },
              {
                label: 'Services list',
                name: 'services',
                component: 'list',
                defaultItem: 'VueJS',
                field: {
                  component: 'text',
                }
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
        <section className={styles.headerWrapper}>
          {data.content && data.content.hero_image && 
          <Image
            className={styles.image}
            src={data.content.hero_image}
            alt="Picture of the author"
            width={1900}
            height={480}
            layout="responsive"
            priority
          />}
        </section>

        <Content data={data.content} />

        <Contact data={contact} />
        <Banner data={banner} />
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