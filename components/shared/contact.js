import styles from './styles/contact.module.scss'
import Form from '../shared/form'

export default function Contact(props) {
    return (
        <section className="padding" id="contact">
            <div className="inner-wrapper">
                <div className="content-wrapper">
                    <div className="section-header big-margin">
                        <h2 className="title">{props.data.title}</h2>
                        <div className="border"></div>
                    </div> 

                    <div className={styles.content}>
                        <p>{props.data.text}</p>
                        <Form />
                    </div>

                </div>
            </div>
        </section>
    )    
}