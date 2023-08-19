import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { Logo } from "../../components";
import { NavLinks } from "../index";
import "./SmallSidebar.css";

const SmallSidebar = () => {
  const { isSidebarOpened, toggleSidebar } = useAppContext();

  return (
    <aside className="smallSidebar">
      <div
        className={`sidebar-container${isSidebarOpened ? " show-sidebar" : ""}`}
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </aside>
  );
};
export default SmallSidebar;
