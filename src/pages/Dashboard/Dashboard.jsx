import DashNav from "./Dashboard/DashNav"
import TaskManager from "./Dashboard/TaskManager"

const Dashboard = () => {
  return (
    <>
        <DashNav/>
        <TaskManager/>
        <div className="w-full h-10"></div>
    </>
  )
}

export default Dashboard