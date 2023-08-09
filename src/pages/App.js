import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import styled from "@emotion/styled";

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
    <Styled.Background>
      <Styled.TodoContainer>
        <Styled.TodoHeader>
          <h1>오늘의 할 일</h1>
          <h2>{todoList.length}개</h2>
        </Styled.TodoHeader>
        <Styled.TodoContents>
          <ul>
            {todoList.map((todo) => (
              <TodoItem
                data={todo}
                deleteTodo={deleteTodoHandler}
                updateTodo={updateTodoHandler}
              />
            ))}
          </ul>
          <TodoForm
            todoText={todoText}
            onSubmit={createTodoHandler}
            onChange={todoTextInputHandler}
          />
        </Styled.TodoContents>
      </Styled.TodoContainer>
    </Styled.Background>
  );
};

const Background = styled.div`
  background-color: #23232c;
  height: 100vh;
  padding: 96px 0;
`;

const TodoContainer = styled.div`
  background-color: #fff;
  border-radius: 16px;
  width: 460px;
  height: 768px;
  margin: 0 auto;
`;

const TodoHeader = styled.div`
  padding: 32px;
  display: flex;
  justify-content: space-between;

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #222;
  }

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    text-align: right;
    color: #2f6afe;
  }
`;

const TodoContents = styled.div`
  padding: 32px;
  height: calc(100% - 108px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid #e9ecef;
  ul {
    list-style-type: none;
  }
`;

const Styled = { Background, TodoContainer, TodoHeader, TodoContents };

export default App;
