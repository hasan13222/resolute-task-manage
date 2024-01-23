import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";

const TaskManager = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const {
    isLoading,
    isFetching,
    error,
    refetch,
    data: tasks,
  } = useQuery({
    queryKey: ["tasks", userEmail],
    queryFn: () =>
      fetch(`https://realtime-task-manage-server.vercel.app/tasks?email=${userEmail}`).then((res) =>
        res.json()
      ),
  });

  const dragHandler = (result) => {
    const { source, draggableId, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const newStatus = { status: destination.droppableId };
      axios
        .patch(`https://realtime-task-manage-server.vercel.app/tasks/${draggableId}`, newStatus)
        .then((data) => {
          if (data.data) {
            refetch();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <>
      <div className="container-fluid task-manager mt-9">
        <div className="container task-cont mx-auto">
          {error && <h3>{error.message}</h3>}
          {(isLoading || isFetching) && (
            <span className="loading loading-ring loading-lg"></span>
          )}
          <DragDropContext onDragEnd={dragHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Droppable droppableId="todo">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="todo-task flex flex-col gap-3 shadow-sm pt-3 p-2 rounded-sm border border-gray-50"
                  >
                    <h3 className="font-bold pl-2 text-xl text-cyan-700 text-center">
                      To Do Task List
                    </h3>
                    {tasks?.map((item, index) => {
                      if (item.status === "todo") {
                        return (
                          <Fragment key={item._id}>
                            <Draggable index={index} draggableId={item._id}>
                              {(provided) => (
                                <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                >
                                  <Task
                                    task={item}
                                  />
                                </div>
                              )}
                            </Draggable>
                          </Fragment>
                        );
                      }
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="progress">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="progress-task flex flex-col gap-3 shadow-sm pt-3 p-2 rounded-sm border border-gray-50"
                  >
                    <h3 className="font-bold pl-2 text-xl text-cyan-700 text-center">
                      In Progress Task List
                    </h3>
                    {tasks?.map((item, index) => {
                      if (item.status === "progress") {
                        return (
                          <Fragment key={item._id}>
                            <Draggable index={index} draggableId={item._id}>
                              {(provided) => (
                                <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                >
                                  <Task
                                    task={item}
                                  />
                                </div>
                              )}
                            </Draggable>
                          </Fragment>
                        );
                      }
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="complete">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="complete-task flex flex-col gap-3 shadow-sm pt-3 p-2 rounded-sm border border-gray-50"
                  >
                    <h3 className="font-bold pl-2 text-xl text-cyan-700 text-center">
                      Complete List
                    </h3>
                    {tasks?.map((item, index) => {
                      if (item.status === "complete") {
                        return (
                          <Fragment key={item._id}>
                            <Draggable index={index} draggableId={item._id}>
                              {(provided) => (
                                <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                >
                                  <Task
                                    task={item}
                                  />
                                </div>
                              )}
                            </Draggable>
                          </Fragment>
                        );
                      }
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default TaskManager;
