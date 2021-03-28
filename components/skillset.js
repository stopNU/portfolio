import styles from './styles/skillset.module.scss'

export default function Skillset(props) {
    console.log("props", props)
    return (
        <div>
            <h4>Skillest</h4> 
            
            {/* 
            <ul className={styles['skillset-wrapper']}>
            {props.data.skills.map((value, index) => {
                console.log(value, index)
                return <li key={index}>{value.title}</li>
            })}
            </ul>
            */}
        </div>
    )    
}