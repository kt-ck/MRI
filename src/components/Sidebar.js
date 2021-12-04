import "../index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
const Sidebar = ({ sidebarMenu, navid, onChange }) => {
    return (
        <div className="sidebar">
            <ul>
                {
                    sidebarMenu.map((item)=>(
                      <li key={item.id} className={navid === item.id && "active"} onClick={()=>{onChange(item.id)}}>
                          <Link to={item.url} className="link">
                            <FontAwesomeIcon icon={item.icon} className="icon"/>
                            <span>{item.name}</span>
                          </Link>
                      </li>  
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar
