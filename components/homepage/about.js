import styles from './styles/about.module.scss'
import Image from 'next/image'

export default function About(props) {
    return (
        <section className={styles.bgWrapper} id="about">
            <div className="inner-wrapper">
                <div className="content-wrapper">
                    <div className={styles.boxWrapper}>
                        <div className={styles.textWrapper}>
                            <h4 className={styles.title}>{props.data.title}</h4>
                            <p className={styles.text}>{props.data.text}</p>
                        </div>
                        <Image
                            className={styles.image}
                            src={props.data.image}
                            alt="Picture of the guy"
                            width={448}
                            height={507}
                            layout="responsive"
                        />
                    </div> 
                </div>
            </div>
        </section>
    )    
}