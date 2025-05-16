import { toggleComplete, deleteTask } from "../reducers/taskSlice";
import { useDispatch } from "react-redux";
import type { Task } from "../reducers/taskSlice";
import type { AppDispatch } from "../store";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "5px",
      }}
    >
      <span style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "red" : "black" }}>
        {task.title}
      </span>
      <button onClick={() => dispatch(toggleComplete(task.id))}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
    </div>
  );
};

export default TaskItem;
