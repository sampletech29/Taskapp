import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../reducers/taskSlice";
import type { AppDispatch } from "../store"; // import the type if needed

const TaskInput = () => {
  const [inputText, setInputText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) return; // prevent empty task
    dispatch(addTask(inputText));
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter a task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
