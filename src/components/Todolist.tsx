import { useState, ChangeEvent, KeyboardEvent } from "react";
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
  addTask: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
};

export function Todolist(props: Todolist) {
  let [newTaskTitle, setnewTaskTitle] = useState("");

  let [error, setError] = useState<string | null>(null)

  const filterAllTask = () => {
    return props.filterTask("all");
  };

  const filterActiveTask = () => {
    return props.filterTask("active");
  };

  const filterCompletedTask = () => {
    return props.filterTask("compeled");
  };

  const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setnewTaskTitle(event.currentTarget.value);
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setnewTaskTitle("");
    } else {
      setError("Title is required")
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if(e.charCode === 13) {
      addTask();
    }
  }



  return (
    <div className="tdl-card">
      <h3>What to do?</h3>

      <div>
        <input onChange={onChangeTaskHandler} onKeyPress={onKeyPressHandler} value={newTaskTitle} className={error ? "error" : ""}/>
        <button onClick={addTask}> Add + </button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => {
            props.removeTask(t.id);
          };

          const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked);
          };

          

          return (
            <li>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeFilter}
                
              />
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
