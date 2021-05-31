import styles from './styles/portfolio.module.scss'
import Link from 'next/link'
import PortfolioItem from '../shared/portfolio-item'

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
                        <p dangerouslySetInnerHTML={{__html: props.data.text}}></p>
                        <Link href="/portfolio">
                            <a className='btn'>View all</a>
                        </Link>
                    </div>

                    <div className={styles.boxes}>
                        {props.data.projects.map((value, index) => {
                            return (
                                <PortfolioItem key={index} data={value} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )    
}