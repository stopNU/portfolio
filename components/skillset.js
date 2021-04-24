import styles from './styles/skillset.module.scss'
import Image from 'next/image'

export default function Skillset(props) {
    console.log("props", props)
    return (
        <section className="dark-bg">
          <div className="content-wrapper">
            <div className="">
                <h3 className={styles.title}>{props.data.title}</h3>
            </div> 
            
            
            <div className={styles['skillset-wrapper']}>
            {props.data.skills.map((value, index) => {
                console.log(value, index)
                return (
                <div key={index}>
                    <Image
                        src={value.icon}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                    />
                   <h4 className={styles['box-title']}>{value.title}</h4> 
                   <p className={styles['box-description']}>{value.description}</p> 
                </div>
                )
            })}
            </div>
            
            </div>
        </section>
    )    
}