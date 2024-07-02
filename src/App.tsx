import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "compeled";

type TodolistsPropsType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

function App() {

  let todolist1 = v1();
  let todolist2 = v1();

  let [todolists, setTodolist] = useState<Array<TodolistsPropsType>>([
    {
      id: todolist1,
      title: "What to do?",
      filter: "all",
    },
    {
      id: todolist2,
      title: "What to learn?",
      filter: "active",
    },
  ]);

  let [tasks, setTask] = useState({
    [todolist1]: [
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
      }
    ],
    [todolist2]: [
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
      }
    ]

  });

  function removeTask(id: string, todolistId: string) {
    let newTasks = tasks[todolistId];

    let newTask = newTasks.filter((t) => t.id != id);
    tasks[todolistId] = newTask;
    setTask({...tasks});
  }

  function filterTask(value: FilterValueType, todolistId: string) {
    //setFilter(value);

    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolist([...todolists]);
  }

  function addTask(title: string, todolistId: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false,
    };

    let newTasks = tasks[todolistId];

    let newTask = [task, ...newTasks];
    tasks[todolistId] = newTask;
    setTask({...tasks});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let newTasks = tasks[todolistId];

    let task = newTasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTask({...tasks});
    }


  }

  return (
    <div className="App">
      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = tasks[tl.id].filter((t) => t.isDone === false);
        }

        if (tl.filter === "compeled") {
          filteredTasks = tasks[tl.id].filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            filterTask={filterTask}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
