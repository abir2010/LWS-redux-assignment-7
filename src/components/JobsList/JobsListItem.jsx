/* eslint-disable no-unused-vars */

import { useDispatch } from "react-redux";
import { addToEditing, removeJob } from "../../features/jobs/jobsSlice";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function JobsListItem({ job }) {
  const { title, type, salary, deadline, id } = job;

  let color = "";
  if (type === "Full Time") {
    color = "#FF8A00";
  } else if (type === "Internship") {
    color = "#FF5757";
  } else {
    color = "#56E5C4";
  }

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeJob(id));
  };
  const handleEdit = () => {
    dispatch(addToEditing(job));
  };
  return (
    <div className="lws-single-job">
      <div className="flex-1 min-w-0">
        <h2 className="lws-title">{title}</h2>
        <div className="job-footers">
          <div className="lws-type">
            <i className={`fa-solid fa-stop !text-[${color}] text-lg mr-1.5`} />
            {type}
          </div>
          <div className="lws-salary">
            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5" />
            BDT {salary}
          </div>
          <div className="lws-deadline">
            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5" />
            Closing on {deadline}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <Link to="/form" className="hidden sm:block">
          <button
            onClick={handleEdit}
            type="button"
            className="lws-edit btn btn-primary"
          >
            <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2" />
            Edit
          </button>
        </Link>
        <span className="sm:ml-3">
          <button
            onClick={handleDelete}
            type="button"
            className="lws-delete btn btn-danger"
          >
            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2" />
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}
