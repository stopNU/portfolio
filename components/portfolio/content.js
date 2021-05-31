import styles from './styles/content.module.scss'
//import Link from 'next/link'
import Image from 'next/image'

export default function Content(props) {
    return (
        <section className="padding">
            <div className="inner-wrapper">
                <div className="content-wrapper">
                   
                    <h5 className={styles.hint}>Project</h5>
                 
                    <div className="section-header">
                        <h2 className="title">{props.data.title}</h2>
                        <div className="border"></div>
                    </div> 
                    
                    <div className={styles.description}>
                        <p>{props.data.description}</p>
                    </div>

                    <div className={styles.services}>
                        {props.data.services.map((value, index) => {
                            return (
                                <div className={styles.service}>{value}</div>
                            )
                        })}
                    </div>

                    <div className={styles.imageWrapper}>
                        <Image
                            className={styles.image}
                            src={props.data.image}
                            alt="Picture of the author"
                            width={1000}
                            height={700}
                            layout="responsive"
                        />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <a href={props.data.website_url} target="_blank" className="btn">View Website</a>
                    </div>
                    
                </div>
            </div>
        </section>
    )    
}