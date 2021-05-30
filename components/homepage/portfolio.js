import styles from './styles/portfolio.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function Portfolio(props) {
    return (
        <section className="padding">
            <div className="inner-wrapper">
                <div className="content-wrapper">
                    <div className="section-header">
                        <h2 className="title">{props.data.title}</h2>
                        <div className="border"></div>
                    </div> 
                    
                    <div className={styles.text}>
                        <p>{props.data.text}</p>
                        <Link href="/portfolio">
                            <a className='btn'>View all</a>
                        </Link>
                    </div>

                    <div className={styles.boxes}>
                    {props.data.projects.map((value, index) => {
                        return (
                            <div key={index} className={styles.box}>
                                
                               
                                    {value.image &&
                                    <div className={styles.imageWrapper}><Image
                                        className={styles.test}
                                        src={value.image}
                                        alt={'Screenshot of ' + value.title}
                                        width={370}
                                        height={230}
                                        layout="fixed"
                                    /></div>}
                                    <div>
                                        <p className={styles.title}>{value.title}</p>
                                        <p className={styles.desc}>{value.description}</p>
                                    </div>
                                    <Link href={`${value.url}`}>
                                        <a className={styles.link}>View Project</a>
                                    </Link>
                                </div>
                           
                        )
                    })}
                    </div>
                </div>
            </div>
        </section>
    )    
}