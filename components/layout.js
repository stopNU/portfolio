import { signIn, signOut, useSession } from "next-auth/client"
import { TinaCMS, TinaProvider, useCMS } from 'tinacms'
import Link from 'next/link'
import styles from './styles/layout.module.scss'

export default function Layout({ children }) {
    const [session, loading] = useSession()

    const cms = useCMS()

    return (
        <div>
            <div className={styles.nav}>
                <Link href="/">
                  <a className={styles.link}>Home</a>
                </Link>
                <Link href="/portfolio">
                  <a className={styles.link}>Portfolio</a>
                </Link>
            {session && (
                <EditLink cms={cms} />
            )}
            </div>
            <div className={styles.bodyContainer}>{children}</div>
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