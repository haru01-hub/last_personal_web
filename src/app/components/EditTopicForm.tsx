// components/EditTopicForm.tsx
import React, { useState } from 'react'

interface Topic {
  _id: string
  title: string
  description: string
}

interface EditTopicFormProps {
  topic: Topic
  handleSave: (id: string, title: string, description: string) => void
}

const EditTopicForm: React.FC<EditTopicFormProps> = ({ topic, handleSave }) => {
  const [title, setTitle] = useState(topic.title)
  const [description, setDescription] = useState(topic.description)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSave(topic._id, title, description)
  }

  return (
    <div className="p-4">
      <h3>Edit Topic</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default EditTopicForm
