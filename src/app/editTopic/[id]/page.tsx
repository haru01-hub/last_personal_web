// // // src/app/editTopic/[id]/page.tsx
// // 'use client'

// // import React, { useState, useEffect } from 'react'
// // import { useRouter } from 'next/navigation'
// // import EditTopicForm from '../../components/EditTopicForm'

// // interface Topic {
// //   _id: string
// //   title: string
// //   description: string
// // }

// // const apiUrl = process.env.API_URL

// // // 특정 주제 ID로 API 요청하여 토픽을 가져오는 함수
// // const getTopicById = async (id: string) => {
// //   try {
// //     const res = await fetch(`${apiUrl}/api/cloud/${id}`, {
// //       cache: 'no-store', // 데이터가 항상 최신이 되도록
// //     })
// //     if (!res.ok) {
// //       throw new Error('Failed to fetch topic.')
// //     }
// //     const data = await res.json()
// //     console.log('Fetched topic:', data)
// //     return data
// //   } catch (error) {
// //     console.log('Error fetching topic:', error)
// //   }
// // }

// // const EditTopic = ({ params }: { params: { id: string } }) => {
// //   const { id } = params
// //   const router = useRouter()

// //   // ID 값이 제대로 전달되는지 확인
// //   useEffect(() => {
// //     console.log('Received ID:', id)
// //   }, [id])

// //   const [topic, setTopic] = useState<Topic | null>(null)

// //   // 컴포넌트가 마운트되면 API 요청하여 topic 데이터를 불러옴
// //   useEffect(() => {
// //     if (!id) {
// //       console.log('ID is missing')
// //       return
// //     }

// //     const fetchData = async () => {
// //       const data = await getTopicById(id)
// //       console.log('Fetched data:', data)
// //       if (data?.topic) {
// //         setTopic(data.topic)
// //       } else {
// //         console.log('Topic not found for ID:', id)
// //       }
// //     }

// //     fetchData()
// //   }, [id])

// //   // 주제를 저장하는 함수
// //   const handleSave = async (id: string, title: string, description: string) => {
// //     try {
// //       const res = await fetch(`${apiUrl}/api/cloud/${id}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ title, description }),
// //       })

// //       if (res.ok) {
// //         router.push(`/topics/${id}`)
// //       } else {
// //         console.log('Failed to save changes')
// //       }
// //     } catch (error) {
// //       console.log('Error saving topic:', error)
// //     }
// //   }

// //   // 로딩 중일 때
// //   if (!topic) {
// //     return <div>Loading...</div>
// //   }

// //   return <EditTopicForm topic={topic} handleSave={handleSave} />
// // }

// // export default EditTopic
// // /pages/editTopic/[id].tsx

// // /pages/editTopic/[id].tsx

// 'use client'

// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

// interface Topic {
//   _id: string
//   title: string
//   description: string
//   createdAt: string
//   updatedAt: string
//   category: string
//   year: string
// }

// export default function EditTopic() {
//   const [topic, setTopic] = useState<Topic | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//   })

//   const router = useRouter()
//   const { id: topicId, category } = router.query // URL에서 topicId와 category 추출

//   useEffect(() => {
//     async function fetchTopic() {
//       if (topicId && category) {
//         try {
//           // category와 topicId를 동적으로 사용하여 API 호출
//           const res = await fetch(`/api/${category}/${topicId}`)
//           if (!res.ok) {
//             throw new Error('Failed to fetch topic')
//           }
//           const data = await res.json()
//           setTopic(data.topic)
//           setFormData({
//             title: data.topic.title,
//             description: data.topic.description,
//           })
//         } catch (error) {
//           console.error('Error fetching topic: ', error)
//           setError('Failed to load topic')
//         } finally {
//           setLoading(false)
//         }
//       }
//     }
//     fetchTopic()
//   }, [topicId, category])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!formData.title || !formData.description) {
//       alert('Title and description are required')
//       return
//     }

//     try {
//       // category와 topicId를 동적으로 사용하여 PUT 요청
//       const res = await fetch(`/api/${category}/${topicId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: formData.title,
//           description: formData.description,
//         }),
//       })

//       if (res.ok) {
//         router.push(`/topics?category=${category}`) // 수정 후 목록으로 리디렉션
//       } else {
//         alert('Failed to update the topic')
//       }
//     } catch (error) {
//       console.error('Error updating topic:', error)
//       alert('An error occurred while updating the topic.')
//     }
//   }

//   if (loading) return <p>Loading...</p>
//   if (error) return <p>Error: {error}</p>

//   return (
//     <div>
//       <h2>Edit Topic</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//           />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   )
// }
import React from 'react'

export default function page() {
  return <div>page</div>
}
