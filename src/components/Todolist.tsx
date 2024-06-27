import { useState, ChangeEvent } from "react";
import { FilterValueType } from "../App";

type TaskPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type Todolist = {
  title: string;
  tasks: TaskPropsType[];
  removeTask: (id: string) => void;
  filterTask: (value: FilterValueType) => void;
  addTask: (title: string) => void
};

export function Todolist(props: Todolist) {
  let [newTaskTitle, setnewTaskTitle] = useState("");

  const filterAllTask = () => {
    return props.filterTask("all");
  };

  const filterActiveTask = () => {
    return props.filterTask("active");
  };

  const filterCompletedTask = () => {
    return props.filterTask("compeled");
  };

  const onChangeTaskHandler = (event:  ChangeEvent<HTMLInputElement>) => {
    setnewTaskTitle(event.currentTarget.value);
    
  };

  const addTask = () => {
    props.addTask(newTaskTitle);
    setnewTaskTitle("");
  }

  return (
    <div className="tdl-card">
      <h3>What to do?</h3>

      <div>
        <input
          onChange={onChangeTaskHandler}
          value={newTaskTitle}
        />
        <button onClick={addTask}> Add + </button>
      </div>

      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => {
            props.removeTask(t.id);
          };

          return (
            <li>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={removeTask}> x </button>
            </li>
          );
        })}
      </ul>

      <div>
        <button onClick={filterAllTask}>All</button>
        <button onClick={filterActiveTask}>Active</button>
        <button onClick={filterCompletedTask}>Completed</button>
      </div>
    </div>
  );
}
