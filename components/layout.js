import { signIn, signOut, useSession } from "next-auth/client"
import { TinaCMS, TinaProvider, useCMS } from 'tinacms'
import Link from 'next/link'

export default function Layout({ children }) {
    const [session, loading] = useSession()

    const cms = useCMS()

    return (
        <div>
            <div className="nav">
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Link href="/portfolio">
                  <a>Portfolio</a>
                </Link>
            {session && (
                <EditLink cms={cms} />
            )}
            </div>
            <div>{children}</div>
            <footer>
                {!session && (
                    <>
                    Not signed in <br />
                    <button onClick={signIn}>Sign in</button>
                    </>
                )}
                {session && (
                    <>
                    Signed in as {session.user.name} <br />
                    <button onClick={signOut}>Sign out</button>
                    </>
                )}
            </footer>
        </div>
    )
}

export const EditLink = ({ cms }) => {
    return (
      <button id="tina-edit" onClick={() => cms.toggle()}>
        {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
      </button>
    )
}