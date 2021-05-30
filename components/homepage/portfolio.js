import styles from './styles/portfolio.module.scss'
import Link from 'next/link'

export default function Portfolio(props) {
    console.log("props port", props)
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
                </div>
            </div>
        </section>
    )    
}