import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "compeled";

function App() {
  let initialTasks = [
    {
      id: v1(),
      title: "HTML",
      isDone: true,
    },
    {
      id: v1(),
      title: "CSS",
      isDone: true,
    },
    {
      id: v1(),
      title: "JS",
      isDone: false,
    },
  ];

  let [tasks, setTask] = useState(initialTasks);

  function removeTask(id: string) {
    let newTasks = tasks.filter((t) => t.id !== id);
    setTask(newTasks);
  }

  let [filter, setFilter] = useState<FilterValueType>("all");

  let filteredTasks = tasks;

  function filterTask(value: FilterValueType) {
    setFilter(value);
  }

  if (filter === "active") {
    filteredTasks = tasks.filter((t) => t.isDone === false);
  }

  if (filter === "compeled") {
    filteredTasks = tasks.filter((t) => t.isDone === true);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };

    let newTasks = [newTask, ...tasks];
    setTask(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);

    if (task) {
      task.isDone = isDone;
    }

    let copyTasks = [...tasks];

    setTask(copyTasks);
  }

  return (
    <div className="App">
      <Todolist
        title="What to do?"
        tasks={filteredTasks}
        removeTask={removeTask}
        filterTask={filterTask}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
