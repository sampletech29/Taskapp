import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTasks } from "../reducers/taskSlice";
import TaskItem from "./TaskItem";
import type { RootState, AppDispatch } from "../store";

type FilterType = "all" | "completed" | "pending";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { taskList, status } = useSelector((state: RootState) => state.tasks);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = taskList.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; 
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
     
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>


      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <div>No tasks found for this filter.</div>
      )}
    </div>
  );
};

export default TaskList;
