import { Field } from '@tinacms/core'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'


export default function Skillset({ file }) {
    const formOptions = {
        label: 'Skillset',
        fields: [
            { 
                name: 'Skills', 
                component: 'group-list',
                fields: [
                    { name: 'title', component: 'text' }
                ] 
            }
        ],
    }
    
    // Registers a JSON Tina Form
    const [data, form] = useGithubJsonForm(file, formOptions)
    usePlugin(form)

    useGithubToolbarPlugins()

    return (
        <div>
            Skillest
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