import './AnchorLink.css'
import { Link } from 'react-router-dom'

const AnchorLink = (props) => {
    return (
        <Link to = {props.link}
        style={props.linkStyle}
        className='link-component'
        >{props.lable}</Link>
    )
}
export default AnchorLink