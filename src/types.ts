export interface IUserInfo {
  email: string;
  password: string;
}

export interface ITodoListProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface ITodoItemProps {
  data: ITodoListProps;
  deleteTodo(id: number): void;
  updateTodo(updatedTodoItem: ITodoItemPropsToServer): void;
}

export interface ITodoItemPropsToServer {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export interface ITodoFormProps {
  todoText: string;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
