import { tasksListSelector } from './tasks.selectors';
import * as tasksGateway from './tasksGateway';

export const TASKS_LIST_RECIEVED = 'TASKS_LIST_RECIEVED';

export const tasksListRecieved = tasksList => {
  return {
    type: TASKS_LIST_RECIEVED,
    payload: tasksList,
  };
};

export const getTaskList = () => {
  const thunkAction = function (dispatch) {
    tasksGateway
      .fetchTasksList()
      .then(tasksList => dispatch(tasksListRecieved(tasksList)));
  };

  return thunkAction;
};

export const updateTask = taskId => {
  const thunkAction = function (dispatch, getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const task = tasksList.find(task => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };

    tasksGateway
      .updateTask(taskId, updatedTask)
      .then(() => dispatch(getTaskList()));
  };

  return thunkAction;
};

export const deleteTask = taskId => {
  const thunkAction = function (dispatch) {
    tasksGateway.deleteTask(taskId).then(() => dispatch(getTaskList()));
  };

  return thunkAction;
};

export const createTask = text => {
  const thunkAction = function (dispatch) {
    tasksGateway
      .createNewTask({
        text,
        done: false,
      })
      .then(() => dispatch(getTaskList()));
  };

  return thunkAction;
};
