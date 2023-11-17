import { useState, useEffect } from "react";
import axios from "axios";
import TaskComponent from "./TaskComponent";

const MainWindow = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/todos", { task, category, priority })
      .then(() => {
        setTask("");
        setCategory("");
        setPriority("");
        axios.get("http://localhost:3000/api/todos").then((response) => {
          setTodos(response.data);
        });
      });
  };

  const handleTaskDelete = async () => {
    axios.get("http://localhost:3000/api/todos").then((response) => {
      setTodos(response.data);
    });
  };

  return (
    <div className="px-24 py-8 text-center font-montserrat">
      <h1 className="text-5xl mb-4 tracking-widest text-slate-800 font-bold">
        PrioriTask
      </h1>
      <p className="text-xl">Full-stack goodness</p>

      <form className="my-12">
        <p className="text-xl mb-1">Task</p>
        <input
          name="task"
          type="text"
          autoComplete="off"
          className="p-2 mb-6 rounded-md  transition-all duration-75 ease-in-out border hover:shadow-md  hover:border-blue-500"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />

        <p className="text-xl mb-1">Category</p>
        <input
          name="category"
          list="categories"
          className="p-2 mb-6 rounded-md border transition-all duration-150 ease-in-out hover:shadow-md  hover:border-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <datalist id="categories">
          <option value="Business"></option>
          <option value="Personal"></option>
        </datalist>

        <p className="text-xl mb-1">Priority</p>
        <input
          name="priority"
          list="priority"
          className="p-2 mb-6 rounded-md border transition-all duration-150 ease-in-out hover:shadow-md  hover:border-blue-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        />
        <datalist id="priority">
          <option value="High"></option>
          <option value="Medium"></option>
          <option value="Low"></option>
        </datalist>
        <br />
        <button
          type="submit"
          onClick={addTask}
          className="p-3 text-2xl bg-slate-200 rounded-md hover:drop-shadow-md hover:bg-green-500 hover:text-slate-100 hover:px-6 transition-all duration-150 ease-in "
        >
          Add task
        </button>
      </form>

      <div className="py-2 ">
        <ul className="px-8 text-xl font-semibold">
          {todos.map((todo) => (
            <TaskComponent
              taskId={todo.id}
              task={todo.task}
              status={todo.status}
              category={todo.category}
              priority={todo.priority}
              onDelete={handleTaskDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainWindow;
