import { Fragment, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import AssTask from "./AssTasks/AssTask";

const AssignedTasks = () => {
  const { user } = useContext(AuthContext);

  const userEmail = user?.email;
  const {
    isLoading,
    isFetching,
    error,
    data:assingedTasks,
  } = useQuery({
    queryKey: ["assignedTasks", userEmail],
    queryFn: () =>
      fetch(
        `https://realtime-task-manage-server.vercel.app/assign-tasks?email=${userEmail}`
      ).then((res) => res.json()),
  });

  return (
    <>
      <div className="container-fluid allTasks">
        <div className="container allTasks__cont mx-auto">
            <h2 className="text-center text-2xl font-bold my-7">Assigned Tasks</h2>
          {error && <h3>{error.message}</h3>}
          {(isLoading || isFetching) && (
            <span className="loading loading-ring loading-lg"></span>
          )}
          
          <div className="allTasks__items">
            {assingedTasks?.length === 0 && <h3 className="font-bold text-2xl text-center">You have No Assigned Task</h3>}
            {assingedTasks?.map((task) => (
              <Fragment key={task.id}>
                <AssTask task={task}/>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedTasks;
