import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/client"
import Head from 'next/head'
import { useCMS } from 'tinacms'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles/layout.module.scss'
import { Link as ScrollLink } from 'react-scroll'
import { useRouter } from 'next/router'
import data from '../content/home.json'




export default function Layout({ children }) {
    const [session, loading] = useSession()
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileActive, setMobileActive] = useState(false);
    const router = useRouter()

    const cms = useCMS()

    const handleScroll = (e) => {
        //console.log('scroll', e.target.scrollingElement.scrollTop)
        if(e.target.scrollingElement.scrollTop > 0){    
            setIsScrolled(true)
        }
        else{
            setIsScrolled(false)
        }
    }

    const handleClick = () => {
        setMobileActive(!mobileActive);
    };

    const handleMobileItemClick = () => {
        setMobileActive(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const aboutLink = () => {
        if (router.route == '/') {
            return (
            <ScrollLink to="about" smooth={true} onClick={handleMobileItemClick}>
                <p className={styles.link}>About</p>
            </ScrollLink>
            )
        } else {
            return (
                <Link href="/#about" onClick={handleMobileItemClick}>
                  <a className={styles.link}>About</a>
                </Link>
            )
        }
    }

    const skillsLink = () => {
        if (router.route == '/') {
            return (
            <ScrollLink to="skills" smooth={true} onClick={handleMobileItemClick}>
                <p className={styles.link}>Skills</p>
            </ScrollLink>
            )
        } else {
            return (
                <Link href="/#skills" onClick={handleMobileItemClick}>
                  <a className={styles.link}>Skills</a>
                </Link>
            )
        }
    }

    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
            </Head>
            <div className={`${styles.navWrapper} ${isScrolled ? styles.scrolled : ''}`}>
                <div className="content-wrapper">
                    <div className={styles.nav}>
                        <div className={styles.logo}>
                            <Link href="/">
                                <a>
                                    <Image
                                        className={styles.icon}
                                        src="/static/temp-logo.png"
                                        alt="MT Web logo"
                                        width={75}
                                        height={21}
                                        layout="fixed"
                                        priority
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className={styles.navItems}>
                            {aboutLink()}
                            {skillsLink()}
                            <Link href="/portfolio">
                            <a className={styles.link}>Portfolio</a>
                            </Link>
                        </div>
                        <div>
                            <ScrollLink to="contact" smooth={true}>
                                <p className={styles.button}>Contact</p>
                            </ScrollLink>
                            <div className={styles.mobileIcon} onClick={handleClick}>
                                <svg
                                    className='w-6 h-6'
                                    fill='none'
                                    stroke='#C9C9C9'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            </div>


                        {/* Mobile Menu */}
                        <div
                            className={` ${styles.mobileMenuWrapper} ${mobileActive ? styles.open : ''}`}
                        >
                            <div className={styles.mobileMenu}>
                                {aboutLink()}
                                {skillsLink()}
                                <Link href="/portfolio" onClick={handleMobileItemClick}>
                                    <a className={styles.link}>Portfolio</a>
                                </Link>
                            </div>
                        </div>
                        {/* End of Mobile Menu */}
                            
                        </div>
                    {session && (
                        <EditLink cms={cms} />
                    )}
                    </div>
                </div>
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
                {mobileActive}
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
