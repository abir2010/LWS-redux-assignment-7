import JobsListItem from "./JobsListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getJobs } from "./../../features/jobs/jobsSlice";
import Loading from "./../ui/Loading";

export default function JobsList() {
  const dispatch = useDispatch();
  const { jobs, isLoading, isError, error } = useSelector(
    (state) => state.jobs
  );
  const { search, sortBy, tag } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const filterSearchFunction = (job) => {
    if (search) {
      // console.log(job.title, search);
      return job.title.toLowerCase().includes(search.toLowerCase());
    }
    return job;
  };
  const filterTagFunction = (job) => {
    if (tag) {
      return job.type === tag;
    }
    return job;
  };
  const sortFunction = (a, b) => {
    if (sortBy === "Salary (Low to High)") {
      return parseInt(a.salary) - parseInt(b.salary);
    } else if (sortBy === "Salary (High to Low)") {
      return parseInt(b.salary) - parseInt(a.salary);
    }
    return true;
  };

  let content = null;
  if (isLoading) content = <Loading>Loading...</Loading>;
  if (!isLoading && isError) content = <Loading>{error}</Loading>;
  if (!isLoading && !isError && jobs?.length === 0)
    content = <Loading>No jobs found!</Loading>;
  if (!isLoading && !isError && jobs?.length > 0) {
    const copyJobs = [...jobs];
    copyJobs.sort((a, b) => sortFunction(a, b));
    content = copyJobs
      ?.filter((job) => filterTagFunction(job))
      .filter((job) => filterSearchFunction(job))
      .map((job) => <JobsListItem key={job.id} job={job} />);
  }

  return <div className="jobs-list">{content}</div>;
}
