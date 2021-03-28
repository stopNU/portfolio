import styles from './styles/skillset.module.scss'

export default function Skillset(props) {
    console.log("props", props)
    return (
        <div>
            <h3 className={styles.title}>{props.data.title}</h3> 
            
            
            <div className={styles['skillset-wrapper']}>
            {props.data.skills.map((value, index) => {
                console.log(value, index)
                return (
                <div key={index}>
                   <h4 className={styles['box-title']}>{value.title}</h4> 
                   <p className={styles['box-description']}>{value.description}</p> 
                </div>
                )
            })}
            </div>
            
        </div>
    )    
}