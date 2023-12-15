import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../../features/jobs/jobsSlice";

export default function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState(null);
  const [deadline, setDeadline] = useState("");

  const dispatch = useDispatch();

  const reset = () => {
    setDeadline("");
    setSalary(null);
    setTitle("");
    setType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      type,
      salary,
      deadline,
    };
    // console.log(data);

    dispatch(createJob(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="fieldContainer">
        <label
          htmlFor="lws-JobTitle"
          className="text-sm font-medium text-slate-300"
        >
          Job Title
        </label>
        <select
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
          Add
        </button>
      </div>
    </form>
  );
}
