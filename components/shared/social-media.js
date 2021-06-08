import styles from './styles/social-media.module.scss'
import LinkedIn from "../../public/static/linkedin-icon.svg"
import Github from "../../public/static/github-icon.svg"


export default function SocialMedia(props) {
    return (
        <div className={props.className}>
            <div className={styles.wrapper}>         
                <a href="www.linkedin.com/in/michael-thomsen-39425085" target="_blank" className={styles.icon}>
                    <LinkedIn />
                </a>
                <a href="https://github.com/stopNU" target="_blank" className={styles.icon}>
                    <Github />
                </a>
            </div>
        </div>
    )    
}