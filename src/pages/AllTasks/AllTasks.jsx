import DashNav from "../Dashboard/Dashboard/DashNav";
import { Fragment, useContext, useEffect, useState } from "react";
import Task from "../Dashboard/Dashboard/Task";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";

const AllTasks = () => {
  const { user } = useContext(AuthContext);
  const [allTasks, setAllTasks] = useState([]);

  const userEmail = user?.email;
  const {
    isLoading,
    isFetching,
    error,
    data,
  } = useQuery({
    queryKey: ["tasks", userEmail],
    queryFn: () =>
      fetch(
        `https://realtime-task-manage-server.vercel.app/tasks?email=${userEmail}`
      ).then((res) => res.json()),
  });
  
  const filterHandler = (e) => {
    e.preventDefault();

    const date = e.target.due_date.value;
    const taskStatus = e.target.status.value;
    
    fetch(`https://realtime-task-manage-server.vercel.app/filtered-tasks?email=${userEmail}&date=${date}&status=${taskStatus}`)
    .then(res => res.json())
    .then(data => setAllTasks(data))
  }

  useEffect(() => {
    setAllTasks(data);
  }, [data])
  return (
    <>
      <DashNav />
      <div className="container-fluid allTasks">
        <div className="container allTasks__cont mx-auto">
          {error && <h3>{error.message}</h3>}
          {(isLoading || isFetching) && (
            <span className="loading loading-ring loading-lg"></span>
          )}
          <div className="filter border-b pb-4">
            <form onSubmit={filterHandler}>
                <label htmlFor="status">Status:</label>
                <input className="input input-bordered mx-2" type="text" name="status" />
                <label htmlFor="due_date">Due Date:</label>
                <input className="input input-bordered mx-2" type="date" name="due_date" />
                <input className="input input-bordered mx-2 text-white bg-indigo-700 cursor-pointer" type="submit" value="Filter" />
            </form>
          </div>
          <div className="allTasks__items">
            {allTasks?.length === 0 && <h3 className="font-bold text-2xl text-center">No data found</h3>}
            {allTasks?.map((task) => (
              <Fragment key={task.id}>
                <Task task={task}/>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTasks;
