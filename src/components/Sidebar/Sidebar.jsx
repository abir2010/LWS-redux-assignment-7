import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { removeFromEditing } from "../../features/jobs/jobsSlice";
import { tagJob } from "../../features/filter/filterSlice";

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/form") {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [location.pathname]);

  const handleAvailableJobs = (type) => {
    setActive(true);
    dispatch(tagJob(type));
    dispatch(removeFromEditing());
  };

  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              onClick={() => handleAvailableJobs("")}
              to="/"
              className={`main-menu ${active && "menu-active"}`}
              id="lws-alljobs-menu"
            >
              <i className="fa-solid fa-briefcase" />
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2">
              <li>
                <Link
                  onClick={() => handleAvailableJobs("Internship")}
                  to="/"
                  className="sub-menu"
                  id="lws-internship-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]" /> Internship
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleAvailableJobs("Full Time")}
                  to="/"
                  className="sub-menu"
                  id="lws-fulltime-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]" /> Full Time
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleAvailableJobs("Remote")}
                  to="/"
                  className="sub-menu"
                  id="lws-remote-menu"
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]" /> Remote
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/form"
              onClick={() => setActive(false)}
              className={`main-menu ${!active && "menu-active"}`}
              id="lws-addJob-menu"
            >
              <i className="fa-solid fa-file-circle-plus" />
              <span> Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
