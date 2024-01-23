import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient } from "@tanstack/react-query";

const DashNav = () => {
  const { user } = useContext(AuthContext);
  
  const notify = () => toast("Task Added Successfully");
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const newTask = {...data, status: "todo", email: user?.email};
    
    axios.post('https://realtime-task-manage-server.vercel.app/tasks', newTask)
    .then((data) => {
      if(data.data){
        notify();
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
      }
    })
  }
  return (
    <>
      <div className="contaner-fluid dashnav py-7">
        
      <ToastContainer/>
        <div className="container dashnav-cont mx-auto">
          <div className="navbar">
            <div className="navbar-start">
              <button className="btn bg-transparent mr-2 border-none shadow-none hover:bg-transparent">
                <img
                  className="max-w-24 object-contain w-full h-full"
                  src={user?.photoURL}
                  alt="logo"
                />
              </button>
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className="btn btn-primary"
              >
                Create New Task
              </button>
            </div>
          </div>

          {/* modal to create a new task */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <form
                className="flex mx-auto justify-center flex-col gap-2 px-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="item flex flex-col gap-1">
                  <label className="pl-1" >
                    Task Title
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    {...register("task_title", { required: true })}
                    placeholder="Write Title Here"
                  />
                  {errors.task_title && <span className="text-orange-300">This field is required</span>}
                </div>
                <div className="item flex flex-col gap-1">
                  <label className="pl-1" >
                    Task Description
                  </label>
                  <textarea
                    className="input input-bordered w-full"
                    {...register("task_desc")}
                    placeholder="Write Description Here"
                    cols="30"
                    rows="7"
                  ></textarea>
                </div>
                <div className="item flex flex-col gap-1">
                  <label className="pl-1" >
                    Task Deadline
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="date"
                    {...register("task_deadline", { required: true })}
                    placeholder="Write Deadline Here"
                  />
                  {errors.task_deadline && <span className="text-orange-300">This field is required</span>}
                </div>
                <div className="item flex flex-col gap-1">
                  <input
                    className="input input-bordered w-full bg-indigo-700 cursor-pointer text-white hover:opacity-90"
                    type="submit"
                    value="Create"
                  />
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default DashNav;
