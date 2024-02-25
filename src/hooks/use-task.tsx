import { useEffect, useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    console.log("get tasks from local storage");
  },[])
  const getTasks = () => {};
  const updateTask = () => {};

  return { getTasks, updateTask };
}

export const useEntityService = () => {
  const getEntities = () => {};
  const getItemById = () => {};
  const updateItem = () => {};
  const deleteItem = () => {};
  return {
    getEntities,
    getItemById,
    updateItem,
    deleteItem
  };
};

export default useTasks;
