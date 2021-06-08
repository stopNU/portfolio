import styles from './styles/header.module.scss'
import Image from 'next/image'
import SocialMedia from '../shared/social-media.js'

export default function Header(props) {
    return (
        <section className={styles.bgWrapper}>
            <div className="inner-wrapper">
                <div className="content-wrapper">
                    <div className={styles.content}>
                        <div className={styles.textWrapper}>
                            <h1 className={styles.title}>{props.data.title}</h1>
                            <h4 className={styles.subtitle}>{props.data.subtitle}</h4>
                            <p className={styles.text}>{props.data.text}</p>
                            <SocialMedia className={styles.social} />
                        </div> 
                        <div className={styles.imageWrapper}>
                            <Image
                                className={styles.image}
                                src={props.data.image}
                                alt="Picture of the guy"
                                width={448}
                                height={507}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )    
}