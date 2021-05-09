import styles from './styles/portfolio.module.scss'

export default function Portfolio(props) {
    console.log("props", props)
    return (
        <section className="padding">
            <div className="inner-wrapper">
                <div className="content-wrapper">
                    <div className="section-header">
                        <h3 className="title">My port</h3>
                        <div className="border"></div>
                    </div> 
                </div>
            </div>
        </section>
    )    
}