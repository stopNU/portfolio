import Head from 'next/head'
import styles from '../styles/Home.module.scss'
//import { useForm, usePlugin, useCMS } from 'tinacms'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import Layout from '../components/layout'
import Header from '../components/homepage/header'
import SkillSet from '../components/homepage/skillset'
import Contact from '../components/homepage/contact'


export default function Home({ file }) {
  
  //const data = file.data
  const formOptions = {
    label: 'Home Page',
    fields: [
      { 
        name: 'title', label: 'Title', component: 'text' 
      },
      { 
        name: 'subtitle',  label: 'Subtitle', component: 'text' 
      },
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
      }
    ],
  }

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header data={data.header} />
        <SkillSet data={data.skillset} />
        <Contact data={data.skillset} />
      
      </Layout>

      
    </div>
  )
}

export async function getStaticProps({preview,previewData}) {
  console.log("log", preview,previewData)
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