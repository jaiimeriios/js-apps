import { NavLink } from 'react-router';
const Nav = () => {
    return (
        <nav>
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/login" end>
                Login
            </NavLink>
            <NavLink to="/register" end>
                Register
            </NavLink>
            <NavLink to="/todos" end>
                Todos
            </NavLink>
        </nav>
    );
};

export default Nav;