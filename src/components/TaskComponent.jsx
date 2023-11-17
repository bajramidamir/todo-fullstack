import { useState } from "react";
import axios from "axios";

const TaskComponent = ({
  taskId,
  task,
  status,
  category,
  priority,
  onDelete,
}) => {
  const [isChecked, setChecked] = useState(status);

  const generateCategoryImage = (category) => {
    if (category === "Business") {
      return "/business.svg";
    } else {
      return "/personal.svg";
    }
  };

  const generateTaskClass = (priority) => {
    if (priority === "High") {
      return "bg-red-400";
    } else if (priority === "Medium") {
      return "bg-amber-300";
    } else {
      return "bg-sky-300";
    }
  };

  const handleCheckboxChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todos/${taskId}`,
        {
          status: isChecked ? false : true,
        }
      );

      if (response.status === 200) {
        setChecked(!isChecked);
      } else {
        console.error("Failed to update todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  const handleTaskDeletion = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/todos-delete/${taskId}`
      );
      if (response.status === 200) {
        console.log("Deleted!");
        onDelete();
      } else {
        console.log("Failed to delete!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`mx-auto flex items-center align-middle 
      justify-between rounded-md 
      ${generateTaskClass(priority)} w-7/12 p-6 my-2`}>
      <img
        src={`${generateCategoryImage(category)}`}
        className="w-12"
        alt="category"
      />
      <li
        className="text-xl bg-gray-200 p-2 rounded-md text-slate-800 drop-shadow"
        key={taskId}
      >
        {task}
      </li>
      <button
        onClick={handleTaskDeletion}
        className="p-2 transition-all 
        hover:bg-red-700 hover:text-white 
        duration-150 ease-in-out text-slate-100 
        rounded-md bg-red-600">
        Delete
      </button>

      <input
        type="checkbox"
        className="appearance-none transition-all
        hover:border-green-400 duration-75 
        ease-out w-6 h-6 bg-slate-100 rounded-full 
        border-2 border-black checked:border-green-600 
        checked:bg-green-400"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
    </div>
  );
};

export default TaskComponent;
