import { Todo } from '@prisma/client'
import { FaCheck, FaTrash } from 'react-icons/fa'
import { UpdateTodoPayload } from '@/types/todo'
import {
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState
} from 'react'

export type TodoItemProps = {
  item: Todo
  onChange: (payload: UpdateTodoPayload) => void
  onRemove: (id: string) => void
}

export const TodoItem = ({
  item,
  onChange,
  onRemove
}: TodoItemProps): JSX.Element => {
  const editorRef = useRef<HTMLDivElement>(null)

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (editMode) {
      editorRef.current?.focus()
    }
  }, [editMode])

  function handleRemove(e: MouseEvent<SVGAElement>) {
    e.stopPropagation()

    onRemove(item.id)
  }

  function handleStatusChange(e: MouseEvent<SVGAElement>) {
    e.stopPropagation()

    onChange({ id: item.id, isDone: !item.isDone })
  }

  function handleTitleChange(title: string) {
    onChange({ id: item.id, title })

    setEditMode(false)
  }

  function handleActivateEditMode() {
    if (!item.isDone) {
      setEditMode(true)
    }
  }

  function handleEditorKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.code === 'Enter' && e.ctrlKey) {
      e.stopPropagation()
      e.preventDefault()

      handleTitleChange((e.target as HTMLDivElement).innerText)
    }
  }

  function handleEditorBlur(e: FocusEvent<HTMLDivElement>) {
    handleTitleChange(e.target.innerText)
  }

  return (
    <div
      className={`p-2 max-w-full break-all flex justify-between gap-x-2 transition-all items-center rounded cursor-pointer -ml-2 group ${
        !editMode ? 'hover:bg-indigo-700/30' : ''
      }`}
      onClick={handleActivateEditMode}
    >
      <div
        ref={editorRef}
        contentEditable={editMode}
        className={`outline-0 ${item.isDone ? 'italic line-through' : ''}`}
        onBlur={handleEditorBlur}
        onKeyDown={handleEditorKeyDown}
        suppressContentEditableWarning
      >
        {item.title}
      </div>
      <div className="flex gap-x-4">
        <FaTrash
          onClick={handleRemove}
          className="opacity-0 cursor-pointer transition-all hover:text-red-700 active:text-red-800 active:scale-95 group-hover:opacity-100"
        />
        <FaCheck
          onClick={handleStatusChange}
          className={`cursor-pointer transition-all ${
            item.isDone ? 'text-indigo-700' : ''
          } hover:text-indigo-700 active:text-indigo-800 active:scale-95`}
        />
      </div>
    </div>
  )
}
