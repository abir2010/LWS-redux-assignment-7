import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchJob, sortJob } from "../../features/filter/filterSlice";

export default function JobsListHead() {
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();
  const { tag } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(searchJob(searchText));
    dispatch(sortJob(selected));
  }, [dispatch, searchText, selected]);

  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10">
      <h1 className="lws-section-title">
        All {tag === "" ? "Available" : tag} Jobs
      </h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
          />
        </div>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          required="required"
        >
          <option value="">Default</option>
          <option>Salary (Low to High)</option>
          <option>Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
