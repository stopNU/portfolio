import { signIn, signOut, useSession } from "next-auth/client"
import { TinaCMS, TinaProvider, useCMS } from 'tinacms'

export default function Layout({ children }) {
    const [session, loading] = useSession()

    const cms = useCMS()

    return (
        <div>
            <div className="nav">
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