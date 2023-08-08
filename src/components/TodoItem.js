import { useState } from "react";

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
        <li key={id}>
          <span>{updatedCheck.toString()}</span>
          <label>
            <input type="checkbox" onChange={updatedCheckHandler} />
            <span>{todo}</span>
          </label>
          <div>
            <button
              data-testid="modify-button"
              onClick={() => setIsUpdate(true)}
            >
              수정
            </button>
            <button data-testid="delete-button" onClick={() => deleteTodo(id)}>
              삭제
            </button>
          </div>
        </li>
      ) : (
        <li key={id}>
          <form onSubmit={submitUpdateTodoHandler}>
            <input
              data-testid="modify-input"
              type="text"
              value={updatedText}
              onChange={updatedTextHandler}
            />
            <div>
              <button data-testid="submit-button" type="submit">
                제출
              </button>
              <button
                data-testid="cancel-button"
                type="button"
                onClick={() => setIsUpdate(false)}
              >
                취소
              </button>
            </div>
          </form>
        </li>
      )}
    </>
  );
};

export default TodoItem;
