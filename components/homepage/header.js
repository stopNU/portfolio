import styles from './styles/header.module.scss'
import Image from 'next/image'

export default function Header(props) {
    console.log("header props", props)
    return (
        <section className={styles.bgWrapper}>
            <div className="inner-wrapper">
                <div className="content-wrapper">
                    <div className={styles.content}>
                        <div className={styles.textWrapper}>
                            <h1 className={styles.title}>{props.data.title}</h1>
                            <h4 className={styles.subtitle}>{props.data.subtitle}</h4>
                            <p className={styles.text}>{props.data.text}</p>
                        </div> 
                        <div className={styles.imageWrapper}>
                            <Image
                                className={styles.image}
                                src={props.data.image}
                                alt="Picture of the guy"
                                width={400}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )    
}