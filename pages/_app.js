import { Provider } from 'next-auth/client'
import { useEffect } from 'react';
import { TinaCMS, TinaProvider, useCMS } from 'tinacms'
import {
  GithubClient,
  TinacmsGithubProvider
} from 'react-tinacms-github'
import { NextGithubMediaStore } from 'next-tinacms-github'
import TagManager from 'react-gtm-module'

import '../styles/_variables.scss'
import '../styles/globals.scss'
import BlogPostCreatorPlugin from '../plugins/BlogPostCreator'
import { DateFieldPlugin } from "react-tinacms-date"


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-KNHM3W5' });
  }, []);
  //const [session, loading] = useSession()
  
  const github = new GithubClient({
    proxy: '/api/proxy-github',
    authCallbackRoute: '/api/create-github-access-token',
    clientId: process.env.GITHUB_CLIENT_ID,
    baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
    baseBranch: process.env.BASE_BRANCH, // e.g. 'master' or 'main' on newer repos
  })

  const mediaStore = new NextGithubMediaStore(github)

  /**
   * 1. Create the TinaCMS instance
   */
   const cms = new TinaCMS({
    enabled: !!pageProps.preview,
    apis: {
      github,
    },
    media: mediaStore,
    sidebar: pageProps.preview,
    toolbar: pageProps.preview,
  })

  cms.plugins.add(BlogPostCreatorPlugin)
  cms.plugins.add(DateFieldPlugin)


  return (
    <Provider session={pageProps.session}>
      <TinaProvider cms={cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >
    
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </TinaProvider>
    </Provider>
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

export const cms = TinaCMS
