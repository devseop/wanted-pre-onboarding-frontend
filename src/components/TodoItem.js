import styled from "@emotion/styled";
import { useState } from "react";
import {
  RiDeleteBin6Fill,
  RiEditFill,
  RiCheckFill,
  RiCloseFill,
} from "react-icons/ri";

const TodoItem = ({ data, deleteTodo, updateTodo }) => {
  const { id, todo, isCompleted } = data;

  // To-Do 수정을 위한 state 선언
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo);
  const [updatedCheck, setUpdatedCheck] = useState(isCompleted);

  const updatedTextHandler = (e) => {
    setUpdatedText(e.target.value);
  };

  const updatedCheckHandler = (e) => {
    setUpdatedCheck((prev) => !prev);
  };

  const submitUpdateTodoHandler = (e) => {
    e.preventDefault();
    const updatedTodoItem = {
      id: id,
      todo: updatedText,
      isCompleted: updatedCheck,
    };
    updateTodo(updatedTodoItem);
    setIsUpdate(false);
  };

  return (
    <>
      {!isUpdate ? (
        <Styled.TodoItemContainer key={id}>
          <label>
            <input type="checkbox" onChange={updatedCheckHandler}></input>
            <span>{todo}</span>
          </label>
          <Styled.ButtonsContainer>
            <button
              data-testid="modify-button"
              onClick={() => setIsUpdate(true)}
            >
              <RiEditFill />
            </button>
            <button data-testid="delete-button" onClick={() => deleteTodo(id)}>
              <RiDeleteBin6Fill />
            </button>
          </Styled.ButtonsContainer>
        </Styled.TodoItemContainer>
      ) : (
        <Styled.TodoItemContainer key={id}>
          <Styled.EditForm onSubmit={submitUpdateTodoHandler}>
            <input
              data-testid="modify-input"
              type="text"
              value={updatedText}
              onChange={updatedTextHandler}
            />
            <Styled.ButtonsContainer>
              <button data-testid="submit-button" type="submit">
                <RiCheckFill />
              </button>
              <button
                data-testid="cancel-button"
                type="button"
                onClick={() => setIsUpdate(false)}
              >
                <RiCloseFill />
              </button>
            </Styled.ButtonsContainer>
          </Styled.EditForm>
        </Styled.TodoItemContainer>
      )}
    </>
  );
};

const TodoItemContainer = styled.li`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  label {
    width: 100%;
    display: flex;
    gap: 12px;
    align-items: center;

    input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      cursor: pointer;
      height: 16px;
      outline: 0;
      width: 16px;
    }

    input[type="checkbox"]::after {
      border: solid #fff;
      border-width: 0 2px 2px 0;
      content: "";
      display: none;
      height: 40%;
      left: 40%;
      position: relative;
      top: 20%;
      transform: rotate(45deg);
      width: 15%;
    }

    input[type="checkbox"]:checked {
      background: #2f6afe;
    }
    input[type="checkbox"]:checked::after {
      display: block;
    }
  }
`;

const EditForm = styled.form`
  width: 100%;
  display: flex;
  gap: 24px;
  justify-content: space-between;

  input {
    width: 100%;
    height: 44px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    outline: none;

    :focus {
      border-color: #2f6afe;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;

  button {
    font-size: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.2);

    :hover {
      color: #222;
    }
  }
`;

const Styled = { TodoItemContainer, EditForm, ButtonsContainer };

export default TodoItem;
