import { TinaCMS, TinaProvider, useCMS } from 'tinacms'
import '../styles/globals.css'

function EditButton(){
  const useCMS = useCMS()
  //console.log("useCMS", useCMS)
  return (
    <button onClick={() => useCMS.toggle()}>
      {cms.enabled ? 'Exit edit mode' : 'Edit this site'}
    </button>
  )
}

function MyApp({ Component, pageProps }) {
  const cms = new TinaCMS({
    sidebar: true,
  })

  return (
    <TinaProvider cms={cms}>
      <Component {...pageProps} />
    </TinaProvider>
  )
}

export default MyApp
