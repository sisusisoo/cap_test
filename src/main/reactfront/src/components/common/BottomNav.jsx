import {useState} from 'react';
import '../../style/BottomNav.css';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";


const BottomNav = () => {
    const [active, setActive] = useState(0);
    return (
        <nav className="Wrapper">
            <div>
                <Link to ="/" className="nav-link" onClick={()=>setActive(1)}>
                    <MdHome size={70} className={active === 1 ? "nav-item active": "nav-item"} />
                </Link>
            </div>
            <div>
                <Link to="/picture" className="nav-link"onClick={()=>setActive(2)}>
                    <FaCamera size={70}className={active === 2 ? "nav-item active": "nav-item"}/>
                </Link>
            </div>
            <div>
                <Link to="/map" className="nav-link" onClick={()=>setActive(3)}>
                    <FaMapLocationDot size={70} className={active === 3 ? "nav-item active": "nav-item"}/>
                </Link>
            </div>
            <div>
                <Link to="/mypage" className="nav-link"onClick={()=>setActive(4)}>
                    <FaUserAlt size={70}className={active === 4 ? "nav-item active": "nav-item"}/>
                </Link>
            </div>
        </nav>
    );
};

export default BottomNav;