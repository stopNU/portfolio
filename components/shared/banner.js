import styles from './styles/banner.module.scss'

export default function Banner(props) {
    return (
        <section className={styles.banner}>
            <div className="inner-wrapper">
                <div className={styles.content}>
                    <div>
                        <h3 className={styles.title}>{props.data.title}</h3>
                        <p className={styles.text}>{props.data.text}</p>
                    </div>
                    <div className={styles.btnWrapper}>
                        <a className='btn dark' rel="noopener" target="_blank" href="https://www.linkedin.com/in/simon-martinov-25a46a141/">More info</a>
                    </div>
                </div>
            </div>
        </section>
    )    
}