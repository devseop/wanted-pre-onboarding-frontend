import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import {
  RiDeleteBin6Fill,
  RiEditFill,
  RiCheckFill,
  RiCloseFill,
} from "react-icons/ri";
import { ITodoItemProps, ITodoItemPropsToServer } from "../types";

const TodoItem = ({ data, deleteTodo, updateTodo }: ITodoItemProps) => {
  const { id, todo, isCompleted } = data;

  // To-Do 수정을 위한 state 선언
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>(todo);

  const updatedTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUpdatedText(e.target.value);
  };

  /** To-Do 수정  */
  const submitUpdateTodoHandler = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    const updatedTodoItem: ITodoItemPropsToServer = {
      id: id,
      todo: updatedText,
      isCompleted: isCompleted,
    };
    updateTodo(updatedTodoItem);
    setIsUpdate(false);
  };

  /** 완료여부 POST */
  const checkedUpdateHandlger = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    const updatedTodoItem: ITodoItemPropsToServer = {
      id: id,
      todo: updatedText,
      isCompleted: !isCompleted,
    };
    updateTodo(updatedTodoItem);
  };

  return (
    <>
      {!isUpdate ? (
        <Styled.TodoItemContainer key={id}>
          <label>
            <input
              type="checkbox"
              onChange={checkedUpdateHandlger}
              checked={isCompleted ? true : false}
            />
            <Styled.Span isCompleted={isCompleted ? true : false}>
              {todo}
            </Styled.Span>
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

const Span = styled.span<{ isCompleted: boolean }>`
  font-size: 17px;
  font-weight: 500;
  opacity: ${(props) => (props.isCompleted ? 0.2 : 1)};
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

const Styled = { TodoItemContainer, EditForm, ButtonsContainer, Span };

export default TodoItem;
