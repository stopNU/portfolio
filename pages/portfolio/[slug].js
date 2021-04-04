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
    // ${process.env.VERCEL_URL}/my/route
    //console.log("process.cwd()", process.cwd(), process.env.VERCEL_URL)
    const baseUrl = process.env.VERCEL_URL === undefined ? 'http://localhost:3000' : process.env.VERCEL_URL
    //console.log("calling:", baseUrl + '/api/projects')
    const res2 = await fetch(baseUrl + '/api/projects')
    //const res = await import('../../content/portfolio.json')
    
    const posts = await res2.json()
    //console.log("res", posts.projects)

    // Get the paths we want to pre-render based on posts
    const paths = posts.projects.map((project) => ({
        params: { slug: project.slug },
    }))
    //console.log("paths", paths)
    //const paths = [ { params: { slug: 'test' } }, { params: { slug: 'second-test' } } ]

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}