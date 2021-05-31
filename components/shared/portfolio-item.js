import Link from 'next/link'
import Image from 'next/image'
import styles from './styles/portfolio-item.module.scss'


export default function PortfolioItem(props) {
    console.log("portfolio item", props)
    return (
        <div className={styles.box}>             
            {props.data.thumbnail &&
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.test}
                    src={props.data.thumbnail}
                    alt={'Screenshot of ' + props.data.name}
                    width={370}
                    height={230}
                    layout="fixed" />
            </div>}
            <div>
                <p className={styles.title}>{props.data.name}</p>
                <p className={styles.desc}>{props.data.short_description}</p>
            </div>
            <Link href={`${props.data.slug}`}>
                <a className={styles.link}>View Project</a>
            </Link>
        </div>
    )    
}