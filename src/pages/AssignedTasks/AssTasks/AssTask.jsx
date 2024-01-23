const AssTask = ({ task }) => {
  return (
    <>
      <div
        style={{ position: "relative" }}
        className="card w-full bg-base-100 shadow-md border border-slate-50"
      >
        <div className="card-body items-center">
          <h2 className="card-title">{task.task_title}</h2>
          <p>{task.task_desc}</p>
          <div className="flex w-full justify-center">
            <p className="flex-grow-0">
              <span className="font-medium">Deadline:</span>{" "}
              {task.task_deadline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssTask;
