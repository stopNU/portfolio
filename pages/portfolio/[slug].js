import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

export default function PortfolioProject({ file }) {
    const formOptions = {
        label: 'Test Page',
        fields: [
          { 
            name: 'title', label: 'Title', component: 'text' 
          }
        ],
    }

    const [data, form] = useGithubJsonForm(file, formOptions)
    usePlugin(form)
    useGithubToolbarPlugins()

    console.log("data", data)
    return (
      <div>
        
      <h1>Portfolio Project: {data.title}</h1>
       
      </div>
    )
}
  
export async function getStaticProps({preview,previewData, params}) {

    console.log("testi test", preview,previewData, params)
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
    // Call an external API endpoint to get posts
    //const res = await fetch('../../content/projects/test.json')
    const res = await import('../../content/portfolio.json')
    //console.log("res", res.projects)
    //const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = res.projects.map((project) => ({
        params: { slug: project.slug },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}