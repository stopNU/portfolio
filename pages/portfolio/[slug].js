import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { getAllProjectSlugs } from '../../lib/projects'
import useSWR from 'swr'
import Head from 'next/head'
import Image from 'next/image'

import Layout from '../../components/layout'
import styles from '../../styles/PortfolioSlug.module.scss'
import Content from '../../components/portfolio/content'
import Contact from '../../components/shared/contact'
import {contact, banner} from '../../content/home.json'
import Banner from '../../components/shared/banner'

const fetcher = url => fetch(url).then(r => r.json())

const getClosest = (data, target) => {
  let closest = {
    finished_at: '0'
  }
  data.forEach(element => {
    if(element.finished_at < target && element.finished_at > closest.finished_at){
      closest = element
    }
  });
  return closest
}

export default function PortfolioProject({ file }) {
    let { data: projects, error } = useSWR(`/api/projects`, fetcher)

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
            parse: media => `/static/projects/${media.filename}`,
            uploadDir: () => '/static/projects/',
            previewSrc: fullSrc => fullSrc.replace('', ''),
          },
          {
            name: 'finished_at',
            label: 'Finished At',
            component: 'date',
            dateFormat: 'MMMM DD YYYY',
            timeFormat: false,
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
                parse: media => `/static/projects/${media.filename}`,
                uploadDir: () => '/static/projects/',
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
                parse: media => `/static/projects/${media.filename}`,
                uploadDir: () => '/static/projects/',
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
              },
              {
                component: 'select',
                name: 'next-project',
                label: 'Next Project',
                description: 'Select a project',
                options: file.paths,
              }
            ]
          },
        ],
    }

    const [data, form] = useGithubJsonForm(file, formOptions)
    usePlugin(form)
    useGithubToolbarPlugins()
    
    let closest = ''
    if(projects && projects.length > 0){
      closest = getClosest(projects, data.finished_at)
    }
    

    return (
      <Layout>
        <Head>
          <title>{data.name} - MT Web - Freelance Web Developer</title>
          <meta property="og:title" content={data.name + ' - MT Web - Freelance Web Developer'} key="title" />
          <meta property="og:description" content={data.short_description} key="description" />
        </Head>
        <section className={styles.headerWrapper}>
          {data.content && data.content.hero_image && 
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={data.content.hero_image}
              alt={`Website screenshot of ${data.name}`}
              layout="fill" 
              objectFit="cover"
              priority
            />
          </div>}
        </section>

        <Content data={data.content} next={closest.slug} />
        <Contact data={contact} />
        <Banner data={banner} />
      </Layout>
    )
}
  
export async function getStaticProps({preview,previewData, params}) {
    const paths = await getAllProjectSlugs()

    if (preview) {
      const data = await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: `content/projects/${params.slug}.json`,
        parse: parseJson,
      }).then((e) => {
        const slugs = paths.map(e => e.params.slug)
        e.props.file.paths = slugs
        return e
      })
      return data
      /*return getGithubPreviewProps({
        ...previewData,
        fileRelativePath: `content/projects/${params.slug}.json`,
        parse: parseJson,
      })*/
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