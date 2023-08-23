import React from "react";
import styled from "@emotion/styled";
import { ITodoFormProps } from "../types";

const TodoForm = ({ todoText, onSubmit, onChange }: ITodoFormProps) => {
  const isBtnVaild = !(todoText.length > 0);

  return (
    <Styled.Container>
      <Styled.Form onSubmit={(e) => onSubmit(e)}>
        <input
          data-testid="new-todo-input"
          type="text"
          placeholder="할 일을 입력해주세요."
          value={todoText}
          onChange={(e) => onChange(e)}
          autoFocus
        />
        <Styled.Button
          data-testid="new-todo-add-button"
          type="submit"
          disabled={isBtnVaild ? true : false}
        >
          추가
        </Styled.Button>
      </Styled.Form>
    </Styled.Container>
  );
};

const Container = styled.div`
  padding: 32px;
  background-color: #fff;
  border-radius: 0 0 16px 16px;
`;

const Form = styled.form`
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);

  input {
    width: 100%;
    height: 44px;
    border: none;
    background: #fff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 40px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => (props.disabled ? "lightgray" : "#2f6afe")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  text-align: right;
`;

const Styled = { Container, Form, Button };

export default TodoForm;
