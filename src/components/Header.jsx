import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMessage } from "../redux/loginAuth";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userLogin.data !== null);
  const message = useSelector(selectMessage);
  return (
    <nav className="flex items-center  justify-between p-6 bg-black shadow-md px-6">
      {/* Logo */}
      <div className="flex  text-white ">
        <Link to={"/"}>
          <span className=" text-3xl font-medium ">MERN PROJECT</span>
        </Link>
      </div>

      {/* Render logout button if logged in */}
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          {message && (
            <div className="text-white text-lg font-medium">{message}</div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
