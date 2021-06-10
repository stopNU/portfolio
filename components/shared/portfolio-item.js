import Link from 'next/link'
import Image from 'next/image'
import styles from './styles/portfolio-item.module.scss'
import { MdChevronRight } from 'react-icons/md';


export default function PortfolioItem(props) {
    console.log('props', props)
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
                    layout="intrinsic" />
            </div>}
            <div>
                <p><a className={styles.title} href={props.data.content?.website_url} title="Go to website" target="_blank">{props.data.name}</a></p>
                <p className={styles.desc}>{props.data.short_description}</p>
            </div>
            <Link href={`/portfolio/${props.data.slug}`}>
                <a className={styles.link}>View Project <MdChevronRight /></a>
            </Link>
        </div>
    )    
}