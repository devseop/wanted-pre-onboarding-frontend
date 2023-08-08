import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  /** Get To-Do */
  useEffect(() => {
    const axiosGetHeaders = {
      Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
    };
    axios
      .get(`https://www.pre-onboarding-selection-task.shop/todos`, {
        headers: axiosGetHeaders,
      })
      .then((res) => setTodoList(res.data))
      .catch((err) => console.error(err));
  }, []);

  /** Create To-Do */
  const createTodoHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const axiosPostHeaders = {
        Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
        "Content-Type": "application/json",
      };

      try {
        const res = await axios.post(
          `https://www.pre-onboarding-selection-task.shop/todos`,
          { todo: todoText },
          {
            headers: axiosPostHeaders,
          }
        );
        const result = res.data;
        setTodoList([...todoList, result]);
        setTodoText("");
      } catch (e) {
        console.error(e);
      }
    },
    [todoText, todoList]
  );

  /** Update To-Do */
  const updateTodoHandler = async (data) => {
    const axiosPutHeaders = {
      Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
      "Content-Type": "application/json",
    };

    const updatedData = {
      todo: data.todo,
      isCompleted: data.isCompleted,
    };

    try {
      const res = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
        updatedData,
        { headers: axiosPutHeaders }
      );
      const newTodoList = todoList.map((todo) => {
        if (todo.id === res.data.id) {
          return data;
        } else {
          return todo;
        }
      });
      setTodoList(newTodoList);
    } catch (e) {
      console.error(e);
    }
  };

  /** Delete To-Do */
  const deleteTodoHandler = async (id) => {
    const axiosDeleteHeaders = {
      Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
    };
    try {
      const res = await axios.delete(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,

        {
          headers: axiosDeleteHeaders,
        }
      );
      if (res.status === 204) {
        setTodoList(todoList.filter((todo) => todo.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  /** Save To-Do Text */
  const todoTextInputHandler = (e) => {
    setTodoText(e.target.value);
  };

  return (
    <div>
      <h3>To-Do List</h3>
      <TodoForm
        todoText={todoText}
        onSubmit={createTodoHandler}
        onChange={todoTextInputHandler}
      />
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            data={todo}
            deleteTodo={deleteTodoHandler}
            updateTodo={updateTodoHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
