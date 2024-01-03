import React from "react";
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Nav } from "./styled";
import * as action from "../../store/modules/auth/actions";
import history from "../../services/history";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(action.loginFailure());
    history.push("/");
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={20} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={20} />
      </Link>

      {isLoggedIn ? (
        <Link to="/logout" onClick={handleLogout}>
          <FaPowerOff size={20} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={20} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={20} color="lightgreen" />}
    </Nav>
  );
}
