import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  /** To-Do 가져오기 */
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

  /** To-do 추가하기 */
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
        setTodoList([result, ...todoList]);
        setTodoText("");
      } catch (e) {
        console.error(e);
      }
    },
    [todoText, todoList]
  );

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
          <TodoItem todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
