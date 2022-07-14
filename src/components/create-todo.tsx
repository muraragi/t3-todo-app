import { ChangeEvent, useState } from 'react'
import { Button, Input } from '@/components'

type CreateTodoProps = {
  onCreateTodo: (todoTitle: string) => void
  loading: boolean
}

export const CreateTodo = ({
  onCreateTodo,
  loading
}: CreateTodoProps): JSX.Element => {
  const [todoTitle, setTodoTitle] = useState('')

  function handleAddTodo() {
    onCreateTodo(todoTitle)
    setTodoTitle('')
  }

  function handleTodoTitleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoTitle(e.target.value)
  }

  return (
    <div className="flex gap-x-2">
      <Input
        type="text"
        onChange={e => handleTodoTitleInputChange(e)}
        onEnterPressed={handleAddTodo}
        value={todoTitle}
        placeholder="Todo title"
      />
      <Button disabled={!todoTitle.length || loading} onClick={handleAddTodo}>
        Add todo
      </Button>
    </div>
  )
}
