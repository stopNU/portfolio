import styles from './styles/skillset.module.scss'
import Image from 'next/image'

export default function Skillset(props) {
    console.log("props", props)
    return (
        <section className="dark-bg">
            <div className="inner-wrapper">
                <div className="content-wrapper">
                    <div className="section-header">
                        <h3 className="title">{props.data.title}</h3>
                        <div className="border"></div>
                    </div> 
                    
                    
                    <div className={styles['skillset-wrapper']}>
                    {props.data.skills.map((value, index) => {
                        console.log(value, index)
                        return (
                        <div key={index} className={styles.skillset}>
                            <Image
                                className={styles.icon}
                                src={value.icon}
                                alt="Picture of the author"
                                width={40}
                                height={40}
                                layout="fixed"
                            />
                            <div className={styles.text}>
                                <div>
                                    <h5 className={styles.title}>{value.title}</h5> 
                                    <p className={styles.description}>{value.description}</p>
                                </div>
                                <div className={styles.barWrapper}>
                                    <div className={styles.bar} style={{ width: `${value.percentage}%` }}></div>
                                </div>
                                
                            </div>
                        </div>
                        )
                    })}
                    </div>
                    
                    </div>
            </div>
        </section>
    )    
}