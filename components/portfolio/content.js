import styles from './styles/content.module.scss'
import SocialMedia from '../shared/social-media.js'
import Image from 'next/image'
import Link from 'next/link'
import { MdChevronRight } from 'react-icons/md';

export default function Content(props) {
    return (
        <section className={styles.contentWrapper}>
            <div className="inner-wrapper">
                <div className="content-wrapper">
                   
                    <h5 className={styles.hint}>Project</h5>
                 
                    <div className="section-header">
                        <h2 className="title">{props.data.title}</h2>
                        {props.next.length > 0 && 
                        <Link href={`/portfolio/${props.next}`}>
                            <a className={styles.nextProject}>Next Project <MdChevronRight /></a>
                        </Link>
                        }
                        <div className="border"></div>
                    </div> 
                    
                    <div className={styles.description}>
                        <p>{props.data.description}</p>
                        <SocialMedia className={styles.social}/>
                    </div>

                    <div className={styles.services}>
                        {props.data.services.map((value, index) => {
                            return (
                                <div className={styles.service} key={index}>{value}</div>
                            )
                        })}
                    </div>

                    <div className={styles.imageWrapper}>
                        <Image
                            className={styles.image}
                            src={props.data.image}
                            alt="Picture of the author"
                            width={1109}
                            height={473}
                            layout="responsive"
                        />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <a href={props.data.website_url} rel="noopener" target="_blank" className="btn">View Website</a>
                    </div>
                    
                </div>
            </div>
        </section>
    )    
}