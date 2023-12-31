import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addJob, deleteJob, editJob, fetchJobs } from "./jobsApi";

// initial state
const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// async thunks
export const getJobs = createAsyncThunk("jobs/getJobs", async () => {
  const jobs = await fetchJobs();
  return jobs;
});

export const createJob = createAsyncThunk("jobs/createJob", async (data) => {
  const job = await addJob(data);
  return job;
});

export const removeJob = createAsyncThunk("jobs/deleteJob", async (id) => {
  const job = await deleteJob(id);
  return job;
});

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, data }) => {
    const job = await editJob(id, data);
    return job;
  }
);

// crud slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addToEditing: (state, action) => {
      state.editing = action.payload;
    },
    removeFromEditing: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.jobs = [];
      })
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(removeJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        state.jobs[index] = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
export const { addToEditing, removeFromEditing } = jobsSlice.actions;
