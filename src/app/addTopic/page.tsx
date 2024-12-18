// 'use client'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'

// export default function AddTopic() {
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     // const category = searchParams.get('category') || 'default'

//     // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     // e.preventDefault()

//     if (!title || !description) {
//       alert('Title and description are required.')
//       return
//     }
//     try {
//       const res = await fetch('/api/linux', {
//         // const res = await fetch(`/api/category=${category}`, {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           category: 'default-category',
//           year: new Date().getFullYear(),
//         }),
//       })
//       if (res.ok) {
//         console.log('Topic created successfully!')
//         router.push('/')
//       } else {
//         throw new Error('Failed to create a topic')
//       }
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }

//   return (
//     <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
//       <input
//         className="border border-slate-500 p-4"
//         type="text"
//         placeholder="Topic Title"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//       />
//       <textarea
//         className="border border-slate-500 p-4 h-32"
//         placeholder="Topic Description"
//         onChange={(e) => setDescription(e.target.value)}
//         value={description}
//       />
//       <button
//         className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md"
//         type="submit"
//       >
//         Add Topic
//       </button>
//     </form>
//   )
// }
// 'use client'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useState } from 'react'

// export default function AddTopic() {
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // URL에서 category 가져오기 (기본값: 'default')
//   const category = searchParams.get('category') || 'default'

//   // 연도 고정: 현재 연도 (MongoDB에서 생성일을 기반으로 자동 추출)
//   const year = new Date().getFullYear()
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     if (!title || !description) {
//       alert('Title and description are required.')
//       return
//     }

//     try {
//       const res = await fetch(`/api/${category}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title,
//           description,
//         }), // title과 description만 전송
//       })

//       if (res.ok) {
//         console.log('Topic created successfully!')
//         router.push('/')
//       } else {
//         const errorData = await res.json()
//         console.error('Failed to post:', errorData)
//         alert(`Failed to create topic: ${errorData.message}`)
//       }
//     } catch (error) {
//       console.error('Error:', error)
//       alert('An error occurred while creating the topic.')
//     }
//   }

//   return (
//     <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
//       <input
//         className="border border-slate-500 p-4"
//         type="text"
//         placeholder="Topic Title"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//       />
//       <textarea
//         className="border border-slate-500 p-4 h-32"
//         placeholder="Topic Description"
//         onChange={(e) => setDescription(e.target.value)}
//         value={description}
//       />
//       <button
//         className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md"
//         type="submit"
//       >
//         Add Topic
//       </button>
//     </form>
//   )
// }
'use client'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function AddTopic() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || 'default'
  // 연도 고정: 현재 연도 (MongoDB에서 생성일을 기반으로 자동 추출)
  // const years = new Date().getFullYear()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !description) {
      alert('Title and description are required.')
      return
    }

    try {
      const res = await fetch(`/api/${category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          // category, // 'linux'로 고정된 값
          // year, // 현재 연도
        }),
      })

      if (res.ok) {
        console.log('Topic created successfully!')
        router.push('/')
      } else {
        const errorData = await res.json()
        console.error('Failed to post:', errorData)
        alert(`Failed to create topic: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while creating the topic.')
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border border-slate-500 p-4 "
        type="text"
        placeholder="Topic Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        className="border border-slate-500 p-4 h-32"
        placeholder="Topic Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button
        className="bg-emerald-300 text-white font-bold px-6 py-3 w-fit rounded-md"
        type="submit"
      >
        Add Topic
      </button>
    </form>
  )
}
