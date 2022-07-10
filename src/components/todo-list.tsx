import { Todo } from '@prisma/client'
import { TodoItem } from '@/components'
import { UpdateTodoPayload } from '@/types/todo'

export type TodoListProps = {
  todos: Todo[]
  onRemoveTodo: (id: string) => void
  onTodoStatusChange: (payload: UpdateTodoPayload) => void
}

export const TodoList = ({
  todos,
  onTodoStatusChange
}: TodoListProps): JSX.Element => {
  if (!todos.length) {
    return <div>No todos yet</div>
  }

  const renderTodos = todos.map(todo => (
    <TodoItem onStatusChange={onTodoStatusChange} key={todo.id} item={todo} />
  ))

  return <div className="flex flex-col">{renderTodos}</div>
}
