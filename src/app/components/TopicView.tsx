// components/TopicView.tsx
import React from 'react'
//

interface Topic {
  _id: string
  title: string
  description: string
}

interface TopicViewProps {
  topic: Topic
  handleDelete: (id: string) => void
}

const TopicView: React.FC<TopicViewProps> = ({ topic }) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 className="font-medium text-xl">{topic.title}</h2>
      <p>{topic.description}</p>

      {/* <div className="mt-4 flex gap-4">
        Edit 버튼 클릭 시 해당 토픽의 수정 페이지로 이동
        <Link href={`/editTopic/${topic._id}`}>
          <button className="text-blue-500 hover:underline">Edit Topic</button>
        </Link>

        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(topic._id)}
        >
          <FaTrash size={20} />
          Delete Topic
        </button> */}
      {/* </div> */}
    </div>
  )
}

export default TopicView
