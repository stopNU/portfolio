import Head from 'next/head'
import styles from '../styles/Home.module.scss'
//import { useForm, usePlugin, useCMS } from 'tinacms'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import Layout from '../components/layout'
import Header from '../components/homepage/header'
import Portfolio from '../components/homepage/portfolio'
import About from '../components/homepage/about'
import SkillSet from '../components/homepage/skillset'
import Contact from '../components/shared/contact'
import Banner from '../components/shared/banner'


export default function Home({ file }) {
  
  //const data = file.data
  const formOptions = {
    label: 'Home Page',
    fields: [
      {
        name: 'header',
        label: 'Header Section',
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
          },
        ]
      },
      {
        name: 'portfolio',
        label: 'Portfolio Section',
        component: 'group',
        fields: [
          { 
            name: 'title', label: 'Title', component: 'text' 
          },
          { 
            name: 'text', label: 'Text', component: 'textarea' 
          },
          { 
            name: 'projects', 
            label: 'Projects List',
            component: 'group-list',
            description: 'Highlighted projects',
            fields: [
                { name: 'name', label: 'Name', component: 'text' },
                {
                  name: 'short_description',
                  component: 'textarea',
                  label: 'Short description',
                  description: 'Enter the description here',
                },
                { name: 'slug', label: 'Slug', component: 'text' },
                {
                  label: 'Thumbnail',
                  name: 'thumbnail',
                  component: 'image',
                  parse: media => `/static/${media.filename}`,
                  uploadDir: () => '/static/',
                  previewSrc: fullSrc => fullSrc.replace('', ''),
                },
            ] 
          }
        ]
      },
      {
        name: 'about',
        label: 'About Section',
        component: 'group',
        fields: [
          { 
            name: 'title', label: 'Title', component: 'text' 
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
          },
        ]
      },
      {
        name: 'skillset',
        label: 'Skillset',
        component: 'group',
        fields: [
          { 
            name: 'title', component: 'text' 
          },
          { 
            name: 'skills', 
            label: 'Skills List',
            component: 'group-list',
            description: 'Your fake skills',
            fields: [
                { name: 'title', label: 'Title', component: 'text' },
                {
                  name: 'description',
                  component: 'textarea',
                  label: 'Description',
                  description: 'Enter the description here',
                },
                {
                  label: 'Icon',
                  name: 'icon',
                  component: 'image',
                  parse: media => `/static/${media.filename}`,
                  uploadDir: () => '/static/',
                  previewSrc: fullSrc => fullSrc.replace('', ''),
                },
                {
                  component: 'number',
                  name: 'percentage',
                  label: 'Percentage',
                  description: 'How good you are',
                  step: 1,
                },
            ] 
          }
        ]
      },
      {
        name: 'contact',
        label: 'Contact Section',
        component: 'group',
        fields: [
          { 
            name: 'title', label: 'Title', component: 'text' 
          },
          { 
            name: 'text', label: 'Text', component: 'textarea' 
          }
        ]
      },
      {
        name: 'banner',
        label: 'Banner Section',
        component: 'group',
        fields: [
          { 
            name: 'title', label: 'Title', component: 'text' 
          },
          { 
            name: 'text', label: 'Text', component: 'textarea' 
          },
          { 
            name: 'btn_title', label: 'Button title', component: 'text' 
          },
          { 
            name: 'btn_url', label: 'Button url', component: 'text' 
          },
        ]
      },
      { 
        name: 'copyright', label: 'Copyright text', component: 'text' 
      },
    ],
  }

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <div className={styles.container}>
      <Head>
        <title>MT Web - Freelance Web Developer</title>
        <meta property="og:title" content="MT Web - Freelance Web Developer" key="title" />
        <meta property="og:description" content="Skilled developer working with both large and small companies. Experienced in developing websites in both static websites with frameworks like VueJS and ReactJS and traditional websites with CMS' like WordPress or Joomla." key="description" />
        <meta property="og:url" content='https://mt-web.tech/' key="ogurl" />
        <meta property="og:image" content={data.header.image} key="ogimage" />
      </Head>

      <Layout>
        <Header data={data.header} />
        <Portfolio data={data.portfolio} />
        <About data={data.about} />
        <SkillSet data={data.skillset} />
        <Contact data={data.contact} id="contact" />
        <Banner data={data.banner} />
      </Layout>

      
    </div>
  )
}

export async function getStaticProps({preview,previewData}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}