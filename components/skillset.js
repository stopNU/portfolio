
export default function Skillset(props) {
    console.log("props", props)
    return (
        <div>
            <h4>Skillest</h4> 
            
            <ul>
            {props.data.map((value, index) => {
                console.log(value, index)
                return <li key={index}>{value.title}</li>
            })}
            </ul>
        </div>
    )    
}