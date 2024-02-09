export const useTasks = () => {
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
