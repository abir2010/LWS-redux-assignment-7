import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  removeFromEditing,
  updateJob,
} from "../../features/jobs/jobsSlice";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");

  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.jobs);

  const navigate = useNavigate();

  const reset = () => {
    setDeadline("");
    setSalary("");
    setTitle("");
    setType("");
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      type,
      salary,
      deadline,
    };

    dispatch(createJob(data));
    reset();
    navigate("/");
  };

  useEffect(() => {
    const { title, type, salary, deadline } = editing;
    if (editing?.id) {
      setDeadline(deadline);
      setSalary(salary);
      setTitle(title);
      setType(type);
    }
  }, [editing]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const id = editing?.id;
    const data = { title, type, salary, deadline };
    dispatch(updateJob({ id, data }));
    dispatch(removeFromEditing());
    reset();
    navigate("/");
  };

  return (
    <form
      onSubmit={editing?.id ? handleEditSubmit : handleAddSubmit}
      className="space-y-6"
    >
      <div className="fieldContainer">
        <label
          htmlFor="lws-JobTitle"
          className="text-sm font-medium text-slate-300"
        >
          Job Title
        </label>
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="lws-JobTitle"
          name="lwsJobTitle"
          required="required"
        >
          <option value="" hidden>
            Select Job
          </option>
          <option>Software Engineer</option>
          <option>Software Developer</option>
          <option>Full Stack Developer</option>
          <option>MERN Stack Developer</option>
          <option>DevOps Engineer</option>
          <option>QA Engineer</option>
          <option>Product Manager</option>
          <option>Social Media Manager</option>
          <option>Senior Executive</option>
          <option>Junior Executive</option>
          <option>Android App Developer</option>
          <option>IOS App Developer</option>
          <option>Frontend Developer</option>
          <option>Frontend Engineer</option>
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-JobType">Job Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          id="lws-JobType"
          name="lwsJobType"
          required="required"
        >
          <option value="" hidden defaultValue>
            Select Job Type
          </option>
          <option>Full Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-JobSalary">Salary</label>
        <div className="flex border rounded-md shadow-sm border-slate-600">
          <span className="input-tag">BDT</span>
          <input
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            name="lwsJobSalary"
            id="lws-JobSalary"
            required
            className="!rounded-l-none !border-0"
            placeholder="20,00,000"
          />
        </div>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-JobDeadline">Deadline</label>
        <input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          type="date"
          name="lwsJobDeadline"
          id="lws-JobDeadline"
          required
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          id="lws-submit"
          className="cursor-pointer btn btn-primary w-fit"
        >
          {editing?.id ? "Edit" : "Add"}
        </button>
      </div>
    </form>
  );
}
