import { Todo } from '@prisma/client'
import { FaCheck } from 'react-icons/fa'
import { UpdateTodoPayload } from '@/types/todo'

export type TodoItemProps = {
  item: Todo
  onStatusChange: (payload: UpdateTodoPayload) => void
}

export const TodoItem = ({
  item,
  onStatusChange
}: TodoItemProps): JSX.Element => {
  return (
    <div className="p-2 flex justify-between items-center rounded -ml-2">
      <div className={item.isDone ? 'italic line-through' : ''}>
        {item.title}
      </div>
      <div>
        <FaCheck
          onClick={() => onStatusChange({ id: item.id, isDone: !item.isDone })}
          className={`cursor-pointer transition-all ${
            item.isDone ? 'text-indigo-700' : ''
          } hover:text-indigo-700 active:text-indigo-800 active:scale-95`}
        />
      </div>
    </div>
  )
}
