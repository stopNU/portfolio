import { signIn, signOut, useSession } from "next-auth/client"
import { useCMS } from 'tinacms'
import Link from 'next/link'
import styles from './styles/layout.module.scss'

import data from '../content/home.json'

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
            <footer className={styles.footer}>
                <div className={styles.login}>
                    {!session && (
                        <>
                        <p className={styles.button} onClick={signIn}>Sign in</p>
                        </>
                    )}
                    {session && (
                        <>
                        <p>Signed in as {session.user.name} -</p>
                        <p className={styles.button} onClick={signOut}>Sign out</p>
                        </>
                    )}
                </div>
                <p className={styles.copyright}>{data.copyright}</p>
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
