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

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  let content = null;
  if (isLoading) content = <Loading>Loading...</Loading>;
  if (!isLoading && isError) content = <Loading>{error}</Loading>;
  if (!isLoading && !isError && jobs?.length === 0)
    content = <Loading>No jobs found!</Loading>;
  if (!isLoading && !isError && jobs?.length > 0)
    content = jobs?.map((job) => <JobsListItem key={job.id} job={job} />);

  return <div className="jobs-list">{content}</div>;
}
