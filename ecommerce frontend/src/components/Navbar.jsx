import { useContext, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import useDarkMode from '../hooks/useDarkMode';


const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { isDark, toggle } = useDarkMode(); // <— add this line

  // total items for the badge
  const totalQty = useMemo(
    () => cart.reduce((sum, item) => sum + (item.qty ?? 0), 0),
    [cart]
  );


  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg d-none d-lg-block shadow-sm border-bottom">
        <div className="container">
          
      <Link className="navbar-brand d-flex align-items-center" to="/">
      <img 
      src="/src/assets/Rhodes_Island.webp"      
      alt="Logo"
      style={{ height: "40px", width: "auto", marginRight: "8px" }}
      />
        Merchandise
        </Link>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/policies">Policy</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  <i className="fa fa-shopping-cart"></i>
                  <span className="badge bg-danger ms-1">
                    {totalQty}
                  </span>
                </Link>
              </li>        

              <li className="nav-item">
              <button
              type="button"
              className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center gap-1"
              style={{ minWidth: 66, height: 32 }}  // adjust to taste
              onClick={toggle}
              title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
              >
              <i className={isDark ? 'fa fa-sun-o' : 'fa fa-moon-o'} />
              <span className="text-center">{isDark ? 'Light' : 'Dark'}</span>
              </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <nav className="navbar fixed-bottom bg-light border-top d-lg-none shadow-lg">
        <div className="container-fluid d-flex justify-content-around text-center">

          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-primary text-decoration-none"
                : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-home fs-5"></i>
              <div style={{ fontSize: "12px" }}>Home</div>
            </div>
          </NavLink>

          {/* Products */}
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-decoration-none"
                : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-box fs-5"></i>
              <div style={{ fontSize: "12px" }}>Products</div>
            </div>
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-decoration-none position-relative"
                : "text-dark text-decoration-none position-relative"
            }
          >
            <div className="position-relative">
              <i className="fa fa-shopping-cart fs-5"></i>
              {totalQty > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "10px" }}
                >
                  {totalQty}
                </span>
              )}
            </div>
            <div style={{ fontSize: "12px" }}>Cart</div>
          </NavLink>

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-decoration-none"
                : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-info-circle fs-5"></i>
              <div style={{ fontSize: "12px" }}>About</div>
            </div>
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-primary text-decoration-none"
                : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-phone fs-5"></i>
              <div style={{ fontSize: "12px" }}>Contact</div>
            </div>
          </NavLink>
        </div>

        
<button
  type="button"
  className="btn btn-link text-decoration-none text-dark"
  onClick={toggle}
  aria-label="Toggle dark mode"
>
  <i className={isDark ? 'fa fa-sun-o fs-5' : 'fa fa-moon-o fs-5'} />
  <div style={{ fontSize: '12px' }}>{isDark ? 'Light' : 'Dark'}</div>
</button>

      </nav>
    </>
  );
};

export default Navbar;