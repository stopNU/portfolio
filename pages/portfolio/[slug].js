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

async function getNextProject() {
  //console.log('projects', projects)
  let slugArray = []
  //const { data: projects, error } = useSWR('/api/projects', fetcher)
  //console.log('projects', projects)
  //if(projects != undefined){
    //slugArray =  projects.map(a => a.slug)
  //}
  //console.log("RETURN")
  return ['slugArray']
}

export default function PortfolioProject({ file, ...props }) {
    console.log("parths", props, file)
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
              },
              {
                component: 'select',
                name: 'next-project',
                label: 'Next Project',
                description: 'Select a project',
                options: ['gallo'],
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
        <Head>
          <title>{data.name} - MT Web - Freelance Web Developer</title>
          <meta property="og:title" content={data.name + ' - MT Web - Freelance Web Developer'} key="title" />
          <meta property="og:description" content={data.short_description} key="description" />
        </Head>
        <section className={styles.headerWrapper}>
          {data.content && data.content.hero_image && 
          <Image
            className={styles.image}
            src={data.content.hero_image}
            alt="Picture of the author"
            width={1900}
            height={480}
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
  const paths = await getAllProjectSlugs()
  console.log('paths', paths)

  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      paths: ['asd3'],
      fileRelativePath: `content/projects/${params.slug}.json`,
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      paths: ['asd'],
      file: {
        paths: ['asd2'],
        fileRelativePath: `content/projects/${params.slug}.json`,
        data2: (await import(`../../content/projects/${params.slug}.json`)).default,
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