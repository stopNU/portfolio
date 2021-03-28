import { TinaCMS, TinaProvider, useCMS } from 'tinacms'
import {
  GithubClient,
  TinacmsGithubProvider,
  GithubMediaStore,
} from 'react-tinacms-github'
import '../styles/_variables.scss'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  /*const cms = new TinaCMS({
    sidebar: true,
  })*/
  const github = new GithubClient({
    proxy: '/api/proxy-github',
    authCallbackRoute: '/api/create-github-access-token',
    clientId: process.env.GITHUB_CLIENT_ID,
    baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
    baseBranch: process.env.BASE_BRANCH, // e.g. 'master' or 'main' on newer repos
  })

  /**
   * 1. Create the TinaCMS instance
   */
   const cms = new TinaCMS({
    enabled: !!pageProps.preview,
    apis: {
      /**
       * 2. Register the GithubClient
       */
      github,
    },
    /**
     * 3. Register the Media Store
     */
    media: new GithubMediaStore(github),
    /**
     * 4. Use the Sidebar and Toolbar
     */
    sidebar: pageProps.preview,
    toolbar: pageProps.preview,
  })


  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        onLogin={onLogin}
        onLogout={onLogout}
        error={pageProps.error}
      >
        <EditLink cms={cms} />
        <Component {...pageProps} />
      </TinacmsGithubProvider>
    </TinaProvider>
  )
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch(`/api/preview`, { headers: headers })
  const data = await resp.json()

  if (resp.status == 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export default MyApp

export const cms = {
  cms: TinaCMS
}

export const EditLink = ({ cms }) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
