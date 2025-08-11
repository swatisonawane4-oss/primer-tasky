'use client'
import { useEffect, useState } from 'react'

type Task = { id: string; title: string; done: boolean }

async function gql<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error('Network error')
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  const load = async () => {
    const data = await gql<{ tasks: Task[] }>(`query { tasks { id title done } }`)
    setTasks(data.tasks)
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!title.trim()) return
    await gql(`mutation($title:String!){ addTask(title:$title){ id } }`, { title })
    setTitle('')
    await load()
  }
  const toggle = async (id: string) => {
    await gql(`mutation($id:ID!){ toggleTask(id:$id){ id } }`, { id })
    await load()
  }
  const remove = async (id: string) => {
    await gql(`mutation($id:ID!){ deleteTask(id:$id) }`, { id })
    await load()
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Task</h1>
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Add a task…"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={add} className="border rounded px-3 py-2">Add</button>
      </div>
      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="flex items-center gap-3 border rounded px-3 py-2">
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span className={`flex-1 ${t.done ? 'line-through text-gray-500' : ''}`}>{t.title}</span>
            <button onClick={() => remove(t.id)} className="text-sm">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
