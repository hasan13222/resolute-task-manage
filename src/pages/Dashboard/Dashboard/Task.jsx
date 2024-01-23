import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Providers/AuthProvider";

const Task = ({ task }) => {
  const {user} = useContext(AuthContext);
  const notify = () => toast("Task Updated Successfully");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerAss,
    handleSubmit: handleAss,
    formState: { errors:errorsAss },
  } = useForm();

  const handleListChange = (newStatusText) => {
    const taskId = task.id;
    const newStatus = { status: newStatusText };
    axios
      .patch(`https://realtime-task-manage-server.vercel.app/tasks/${taskId}`, newStatus)
      .then((data) => {
        if (data.data) {
          notify();
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleListDelete = () => {
    const taskId = task.id;

    axios.delete(`https://realtime-task-manage-server.vercel.app/tasks/${taskId}`).then((data) => {
      if (data.data) {
        toast("Task Deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    });
  };

  const handleListUpdate = (data) => {
    
    const taskId = task.id;
    const newStatus = { ...data };
    axios
      .patch(`https://realtime-task-manage-server.vercel.app/tasks/${taskId}`, newStatus)
      .then((data) => {
        if (data.data) {
          notify();
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleAssignTask = (data) => {
    const assignedTask = {...data, ...task, taskId: task.id, requester_email: user?.email};
    
    axios.post('https://realtime-task-manage-server.vercel.app/assign-tasks', assignedTask)
    .then((data) => {
      if(data.data){
        toast("Task Assigned Successfully");
        queryClient.invalidateQueries({ queryKey: ['assignedTasks'] })
      }
    })
  }
  return (
    <>
      <div style={{position: 'relative'}} className="card w-full bg-base-100 shadow-md border border-slate-50">
        <button onClick={() => document.getElementById("my_modal_assign").showModal()} style={{position: 'absolute', right: '4px', top: '4px'}} className="btn btn-outline assign_task_btn">Assign</button>
      <ToastContainer />
        <div className="card-body items-center">
          <h2 className="card-title">{task.task_title}</h2>
          <p>{task.task_desc}</p>
          <div className="flex w-full justify-between">
            <p className="flex-grow-0">
              <span className="font-medium">Deadline:</span>{" "}
              {task.task_deadline}
            </p>
            <p className="flex-grow-0">
              <span className="font-medium">Status:</span>{" "}
              {task.status}
            </p>
          </div>
          <div className="card-actions justify-center">
            {task.status !== "todo" && (
              <button
                onClick={() => handleListChange("todo")}
                className="btn btn-info"
              >
                Todo
              </button>
            )}
            {task.status !== "progress" && (
              <button
                onClick={() => handleListChange("progress")}
                className="btn btn-info"
              >
                Start
              </button>
            )}
            {task.status !== "complete" && (
              <button
                onClick={() => handleListChange("complete")}
                className="btn btn-accent"
              >
                Complete
              </button>
            )}
            <button
              onClick={() => document.getElementById("my_modal_ed5").showModal()}
              className="btn btn-warning"
            >
              Edit
            </button>
            <button
              onClick={() => handleListDelete()}
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        </div>
        {/* modal to create a new task */}
        <dialog id="my_modal_ed5" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form
              className="flex mx-autojustify-center flex-col gap-2 px-5"
              onSubmit={handleSubmit(handleListUpdate)}
            >
              <div className="item flex flex-col gap-1">
                <label className="pl-1">Task Title</label>
                <input
                  className="input input-bordered w-full"
                  defaultValue={task.task_title}
                  type="text"
                  {...register("task_title", { required: true })}
                  placeholder="Write Title Here"
                />
                {errors.task_title && (
                  <span className="text-orange-300">
                    This field is required
                  </span>
                )}
              </div>
              <div className="item flex flex-col gap-1">
                <label className="pl-1">Task Description</label>
                <textarea
                defaultValue={task.task_desc}
                  className="input input-bordered w-full"
                  {...register("task_desc")}
                  placeholder="Write Description Here"
                  cols="30"
                  rows="7"
                ></textarea>
              </div>
              <div className="item flex flex-col gap-1">
                <label className="pl-1">Task Deadline</label>
                <input
                  className="input input-bordered w-full"
                  type="date"
                  defaultValue={task.task_deadline}
                  {...register("task_deadline", { required: true })}
                  placeholder="Write Deadline Here"
                />
                {errors.task_deadline && (
                  <span className="text-orange-300">
                    This field is required
                  </span>
                )}
              </div>
              <div className="item flex flex-col gap-1">
                <input
                  className="input input-bordered w-full bg-indigo-700 cursor-pointer text-white hover:opacity-90"
                  type="submit"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </dialog>

        <dialog id="my_modal_assign" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form
              className="flex mx-autojustify-center flex-col gap-2 px-5"
              onSubmit={handleAss(handleAssignTask)}
            >
              <div className="item flex flex-col gap-1">
                <label className="pl-1">Write Email whom you assigned the task</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  {...registerAss("assign_email", { required: true })}
                  placeholder="Write Email Here"
                />
                {errorsAss.task_title && (
                  <span className="text-orange-300">
                    This field is required
                  </span>
                )}
              </div>
              <div className="item flex flex-col gap-1">
                <input
                  className="input input-bordered w-full bg-indigo-700 cursor-pointer text-white hover:opacity-90"
                  type="submit"
                  value="Assign"
                />
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Task;
