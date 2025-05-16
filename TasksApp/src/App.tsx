import "./styles.css";
import TaskList from "./Task/TaskList"
import TaskInput from "./Task/TaskInput"


export default function App() {
  
  return (
    <div className="App">
        <TaskInput/>
        <TaskList />
    </div>
  );
}
