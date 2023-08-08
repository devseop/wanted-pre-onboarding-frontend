const TodoForm = ({ todoText, onSubmit, onChange }) => {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        data-testid="new-todo-input"
        type="text"
        placeholder="할 일을 입력해주세요."
        value={todoText}
        onChange={(e) => onChange(e)}
      />
      <button data-testid="new-todo-add-button" type="submit">
        추가
      </button>
    </form>
  );
};

export default TodoForm;
