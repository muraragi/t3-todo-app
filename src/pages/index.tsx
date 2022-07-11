import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import { TodoList, CreateTodo } from '@/components'
import { UpdateTodoPayload } from '@/types/todo'
import Head from 'next/head'

const Home: NextPage = () => {
  const utils = trpc.useContext()

  const { data, isLoading, error } = trpc.useQuery(['todo.getAll'])

  const { mutate: createMutation } = trpc.useMutation(['todo.create'], {
    onSuccess() {
      utils.invalidateQueries(['todo.getAll'])
    }
  })

  const { mutate: deleteMutation } = trpc.useMutation(['todo.delete'], {
    onSuccess() {
      utils.invalidateQueries(['todo.getAll'])
    }
  })

  const { mutate: updateMutation } = trpc.useMutation(['todo.update'], {
    onSuccess() {
      utils.invalidateQueries(['todo.getAll'])
    }
  })

  if (isLoading) return <p>Loading...</p>

  if (error) return <div>Error: {error.message}</div>

  function createTodo(todoTitle: string) {
    createMutation({
      title: todoTitle
    })
  }

  function removeTodo(id: string) {
    deleteMutation({
      id
    })
  }

  function updateTodo(payload: UpdateTodoPayload) {
    updateMutation(payload)
  }

  return (
    <div className="my-0 mx-auto py-56 h-screen w-1/6">
      <Head>
        <title>T3 stack todo list</title>
      </Head>
      <div className="mb-4">
        <CreateTodo onCreateTodo={createTodo} />
      </div>
      <TodoList
        onTodoChange={payload => updateTodo(payload)}
        onRemoveTodo={removeTodo}
        todos={data || []}
      />
    </div>
  )
}

export default Home
