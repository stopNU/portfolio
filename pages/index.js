import Head from 'next/head'
import styles from '../styles/Home.module.scss'
//import { useForm, usePlugin, useCMS } from 'tinacms'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import SkillSet from '../components/skillset'


export default function Home({ file }) {
  //console.log("file", file)
  
  //const data = file.data
  const formOptions = {
    label: 'Home Page',
    fields: [
      { 
        name: 'title', component: 'text' 
      },
      {
        name: 'skillset',
        label: 'Skillset',
        component: 'group',
        fields: [
          { 
            name: 'skills', 
            component: 'group-list',
            fields: [
                { name: 'title', component: 'text' }
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

  console.log("data", data)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <h1 className={styles.title}>
          {/**
           * Render the title from `home.json`
          */}
          {data.title}
        </h1>
        <section>
          <div className="content-wrapper">
            <SkillSet data={data.skillset} />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
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