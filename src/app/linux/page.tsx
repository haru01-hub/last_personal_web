// 'use client'

// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import TopicView from '../components/TopicView'
// import RemoveBtn from '../components/RemoveBtn'

// interface Topic {
//   _id: string
//   title: string
//   description: string
//   createdAt: string
//   updatedAt: string
//   category: string
//   year: string
// }

// interface TopicListProps {
//   category: string
// }

// export default function TopicsList({ category }: TopicListProps) {
//   const [topics, setTopics] = useState<Topic[]>([])
//   const [years, setYears] = useState<string[]>([]) // 연도 목록 상태 추가
//   const [selectedYear, setSelectedYear] = useState('2024')
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [editingTopic, setEditingTopic] = useState<Topic | null>(null) // 수정할 토픽 상태

//   const fixedYears = ['2024', '2025', '2026', '2027', '2028', '2029'] // 고정된 연도 탭

//   useEffect(() => {
//     async function fetchTopics() {
//       try {
//         const res = await fetch(`/api/linux?category=${category}`)
//         if (!res.ok) {
//           throw new Error('Failed to fetch topics')
//         }
//         const data = await res.json()
//         setTopics(data.topics)

//         // 생성된 연도 목록을 추출하고, 중복 제거
//         const years = data.topics.map((topic: Topic) =>
//           new Date(topic.createdAt).getFullYear().toString()
//         )
//         const uniqueYears: string[] = Array.from(new Set(years)) // 중복 제거 후 string[] 타입으로 지정
//         setYears(uniqueYears)
//       } catch (error) {
//         console.error('Error loading topics: ', error)
//         setError('Failed to load topics')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchTopics()
//   }, [category]) // 카테고리 변경 시 다시 실행

//   // 선택된 연도의 데이터가 없는지 확인하는 함수
//   const isYearDataEmpty = (year: string) => {
//     return (
//       topics.filter(
//         (topic) => new Date(topic.createdAt).getFullYear().toString() === year
//       ).length === 0
//     )
//   }

//   // 토픽 삭제 함수
//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this topic?')) {
//       try {
//         const res = await fetch(`/api/cloud/${id}`, {
//           method: 'DELETE',
//         })
//         if (res.ok) {
//           // 삭제 후 목록을 다시 로드
//           setTopics(topics.filter((topic) => topic._id !== id))
//         } else {
//           alert('Failed to delete the topic.')
//         }
//       } catch (error) {
//         console.error('Error deleting topic:', error)
//         alert('An error occurred while deleting the topic.')
//       }
//     }
//   }

//   // 수정하려는 토픽 선택 함수
//   const handleView = (topic: Topic) => {
//     setEditingTopic(topic)
//   }

//   return (
//     <div>
//       {editingTopic ? (
//         <div className="p-4">
//           <TopicView topic={editingTopic} handleDelete={handleDelete} />
//         </div>
//       ) : (
//         <>
//           {/* Default로 맨 위에 고정된 내용 */}
//           <h3 className="font-mono text-xl">LINUX</h3>
//           <div className="border-2 border-slate-400 p-4 mt-4 bg-gray-100 rounded-lg shadow-lg ppi-d">
//             <h3 className="font-bold mb-1">PLAN</h3>
//             <hr />
//             <p className="mt-1">
//               2학년 동안 리눅스, 서버 및 셸 스크립트 기초 공부를 끝내어, 3학년
//               때부터는 자동화 시스템을 만드는 프로젝트를 진행할 예정입니다.
//               프로젝트는 한국 인터넷 진흥원에 올라와 있는 취약점 상세 가이드를
//               이용하여 취약점을 파악하고 그것을 막기 위하여, 보안 위험에 문제가
//               있는 설정 파일 중 일부분을 셸 스크립트를 이용하여 자동으로
//               주석처리를 하도록 하는 자동화 시스템을 만들어보는 프로젝트를
//               진행해볼 예정입니다.
//             </p>
//           </div>

//           {/* 연도 선택 탭 */}
//           <div className="flex border-b-2 border-slate-400 mt-4">
//             {fixedYears.map((year) => (
//               <h3
//                 key={year}
//                 onClick={() => setSelectedYear(year)}
//                 className={`mt-10 text-xl font-bold text-gray-500 md:pr-5 md:pl-5 md:pt-2 md:pb-2 border-t-2 border-l-2 border-slate-400 cursor-pointer
//         ${selectedYear === year ? 'bg-slate-300' : ''}`}
//               >
//                 {year}년
//               </h3>
//             ))}
//           </div>

//           {/* Topics 목록 */}
//           <div className="bg-slate-100">
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>Error: {error}</p>
//             ) : isYearDataEmpty(selectedYear) ? (
//               <p>{selectedYear}년에는 데이터가 없습니다.</p>
//             ) : (
//               topics
//                 .filter(
//                   (topic) =>
//                     new Date(topic.createdAt).getFullYear().toString() ===
//                     selectedYear
//                 )
//                 .map((topic, index) => (
//                   <div
//                     key={topic._id}
//                     className="flex justify-between items-center p-4 hover:bg-slate-200"
//                     onClick={() => handleView(topic)} // 프로젝트 클릭 시 해당 프로젝트 보기
//                   >
//                     <div className="flex items-center">
//                       <p className="pr-4">Project_{index + 1}</p>
//                       <p className="font-medium">{topic.title}</p>
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       {new Date(topic.createdAt).toLocaleDateString()}
//                     </p>
//                     <RemoveBtn id={topic._id} category={category} />
//                   </div>
//                 ))
//             )}
//           </div>

//           {/* Add Topic 버튼 */}
//           <Link href={{ pathname: '/addTopic', query: { category: 'python' } }}>
//             <button className="bg-gray-200 p-3 mt-2 rounded-full justify-end">
//               Add Topic
//             </button>
//           </Link>
//         </>
//       )}
//     </div>
//   )
// }
// TopicsList.tsx
// 'use client'

// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import TopicView from '../components/TopicView'
// import RemoveBtn from '../components/RemoveBtn' // RemoveBtn 컴포넌트 import

// interface Topic {
//   _id: string
//   title: string
//   description: string
//   createdAt: string
//   updatedAt: string
//   category: string
//   year: string
// }

// interface TopicListProps {
//   category: string
// }

// export default function TopicsList({ category }: TopicListProps) {
//   const [topics, setTopics] = useState<Topic[]>([])
//   const [years, setYears] = useState<string[]>([]) // 연도 목록 상태 추가
//   const [selectedYear, setSelectedYear] = useState('2024')
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [editingTopic, setEditingTopic] = useState<Topic | null>(null) // 수정할 토픽 상태

//   const fixedYears = ['2024', '2025', '2026', '2027', '2028', '2029'] // 고정된 연도 탭

//   useEffect(() => {
//     async function fetchTopics() {
//       try {
//         const res = await fetch(`/api/linux?category=${category}`)
//         if (!res.ok) {
//           throw new Error('Failed to fetch topics')
//         }
//         const data = await res.json()
//         setTopics(data.topics)

//         // 생성된 연도 목록을 추출하고, 중복 제거
//         const years = data.topics.map((topic: Topic) =>
//           new Date(topic.createdAt).getFullYear().toString()
//         )
//         const uniqueYears: string[] = Array.from(new Set(years)) // 중복 제거 후 string[] 타입으로 지정
//         setYears(uniqueYears)
//       } catch (error) {
//         console.error('Error loading topics: ', error)
//         setError('Failed to load topics')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchTopics()
//   }, [category]) // 카테고리 변경 시 다시 실행

//   // 선택된 연도의 데이터가 없는지 확인하는 함수
//   const isYearDataEmpty = (year: string) => {
//     return (
//       topics.filter(
//         (topic) => new Date(topic.createdAt).getFullYear().toString() === year
//       ).length === 0
//     )
//   }

//   // 토픽 삭제 후 상태 갱신 함수
//   const handleDelete = (id: string) => {
//     setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id))
//   }

//   // 수정하려는 토픽 선택 함수
//   const handleView = (topic: Topic) => {
//     setEditingTopic(topic)
//   }

//   return (
//     <div>
//       {editingTopic ? (
//         <div className="p-4">
//           <TopicView topic={editingTopic} handleDelete={handleDelete} />
//         </div>
//       ) : (
//         <>
//           {/* Default로 맨 위에 고정된 내용 */}
//           <h3 className="font-mono text-xl">LINUX</h3>
//           <div className="border-2 border-slate-400 p-4 mt-4 bg-gray-100 rounded-lg shadow-lg ppi-d">
//             <h3 className="font-bold mb-1">PLAN</h3>
//             <hr />
//             <p className="mt-1">
//               2학년 동안 리눅스, 서버 및 셸 스크립트 기초 공부를 끝내어, 3학년
//               때부터는 자동화 시스템을 만드는 프로젝트를 진행할 예정입니다.
//               프로젝트는 한국 인터넷 진흥원에 올라와 있는 취약점 상세 가이드를
//               이용하여 취약점을 파악하고 그것을 막기 위하여, 보안 위험에 문제가
//               있는 설정 파일 중 일부분을 셸 스크립트를 이용하여 자동으로
//               주석처리를 하도록 하는 자동화 시스템을 만들어보는 프로젝트를
//               진행해볼 예정입니다.
//             </p>
//           </div>

//           {/* 연도 선택 탭 */}
//           <div className="flex border-b-2 border-slate-400 mt-4">
//             {fixedYears.map((year) => (
//               <h3
//                 key={year}
//                 onClick={() => setSelectedYear(year)}
//                 className={`mt-10 text-xl font-bold text-gray-500 md:pr-5 md:pl-5 md:pt-2 md:pb-2 border-t-2 border-l-2 border-slate-400 cursor-pointer
//         ${selectedYear === year ? 'bg-slate-300' : ''}`}
//               >
//                 {year}년
//               </h3>
//             ))}
//           </div>

//           {/* Topics 목록 */}
//           <div className="bg-slate-100">
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>Error: {error}</p>
//             ) : isYearDataEmpty(selectedYear) ? (
//               <p>{selectedYear}년에는 데이터가 없습니다.</p>
//             ) : (
//               topics
//                 .filter(
//                   (topic) =>
//                     new Date(topic.createdAt).getFullYear().toString() ===
//                     selectedYear
//                 )
//                 .map((topic, index) => (
//                   <div
//                     key={topic._id}
//                     className="flex justify-between items-center p-4 hover:bg-slate-200"
//                   >
//                     <div
//                       className="flex items-center cursor-pointer"
//                       onClick={() => handleView(topic)}
//                     >
//                       <p className="pr-4">Project_{index + 1}</p>
//                       <p className="font-medium">{topic.title}</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <p className="text-sm text-gray-500">
//                         {new Date(topic.createdAt).toLocaleDateString()}
//                       </p>
//                       {/* RemoveBtn 컴포넌트 사용, onDelete 전달 */}
//                       <RemoveBtn
//                         id={topic._id}
//                         category={category}
//                         // onDelete={handleDelete}
//                       />
//                     </div>
//                   </div>
//                 ))
//             )}
//           </div>

//           {/* Add Topic 버튼 */}
//           <Link href={{ pathname: '/addTopic', query: { category: 'python' } }}>
//             <button className="bg-gray-200 p-3 mt-2 rounded-full justify-end">
//               Add Topic
//             </button>
//           </Link>
//         </>
//       )}
//     </div>
//   )
// }
// 'use client'

// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { HiOutlineTrash } from 'react-icons/hi' // React Icons 추가
// import TopicView from '../components/TopicView'

// interface Topic {
//   _id: string
//   title: string
//   description: string
//   createdAt: string
//   updatedAt: string
//   category: string
//   year: string
// }

// interface TopicListProps {
//   category: string
// }

// export default function TopicsList({ category }: TopicListProps) {
//   const [topics, setTopics] = useState<Topic[]>([])
//   const [, setYears] = useState<string[]>([]) // 연도 목록 상태 추가
//   const [selectedYear, setSelectedYear] = useState('2024')
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [editingTopic, setEditingTopic] = useState<Topic | null>(null) // 수정할 토픽 상태

//   const fixedYears = ['2024', '2025', '2026', '2027', '2028', '2029'] // 고정된 연도 탭
//   // ... existing code ...

//   useEffect(() => {
//     async function fetchTopics() {
//       try {
//         const res = await fetch(`/api/linux?category=${category}`)
//         if (!res.ok) {
//           throw new Error('Failed to fetch topics')
//         }
//         const data = await res.json()
//         setTopics(data.topics)

//         // Extract and deduplicate the list of years from the topics
//         const years: string[] = data.topics.map((topic: Topic) =>
//           new Date(topic.createdAt).getFullYear().toString()
//         )
//         const uniqueYears: string[] = Array.from(new Set(years)) // Ensure type is string[]
//         setYears(uniqueYears)
//       } catch (error) {
//         console.error('Error loading topics: ', error)
//         setError('Failed to load topics')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchTopics()
//   }, [category]) // Re-run when category changes

//   // ... existing code ...

//   // 선택된 연도의 데이터가 없는지 확인하는 함수
//   const isYearDataEmpty = (year: string) => {
//     return (
//       topics.filter(
//         (topic) => new Date(topic.createdAt).getFullYear().toString() === year
//       ).length === 0
//     )
//   }

//   // 토픽 삭제 함수
//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this topic?')) {
//       try {
//         const res = await fetch(`/api/linux/${id}`, {
//           method: 'DELETE',
//         })
//         if (res.ok) {
//           // 삭제 후 목록을 다시 로드
//           setTopics(topics.filter((topic) => topic._id !== id))
//         } else {
//           alert('Failed to delete the topic.')
//         }
//       } catch (error) {
//         console.error('Error deleting topic:', error)
//         alert('An error occurred while deleting the topic.')
//       }
//     }
//   }

//   // 수정하려는 토픽 선택 함수
//   const handleEdit = (topic: Topic) => {
//     setEditingTopic(topic)
//   }

//   return (
//     <div>
//       {editingTopic ? (
//         <div className="p-4">
//           <TopicView topic={editingTopic} handleDelete={handleDelete} />
//         </div>
//       ) : (
//         <>
//           {/* Default로 맨 위에 고정된 내용 */}
//           <h3 className="font-mono text-xl">LINUX</h3>
//           <div className="border-2 border-slate-400 p-4 mt-4 bg-gray-100 rounded-lg shadow-lg ppi-d">
//             <h3 className="font-bold mb-1">PLAN</h3>
//             <hr />
//             <p className="mt-1">
//               2학년 동안 리눅스, 서버 및 셸 스크립트 기초 공부를 끝내어, 3학년
//               때부터는 자동화 시스템을 만드는 프로젝트를 진행할 예정입니다.
//               프로젝트는 한국 인터넷 진흥원에 올라와 있는 취약점 상세 가이드를
//               이용하여 취약점을 파악하고 그것을 막기 위하여, 보안 위험에 문제가
//               있는 설정 파일 중 일부분을 셸 스크립트를 이용하여 자동으로
//               주석처리를 하도록 하는 자동화 시스템을 만들어보는 프로젝트를
//               진행해볼 예정입니다.
//             </p>
//           </div>

//           {/* 연도 선택 탭 */}
//           <div className="flex border-b-2 border-slate-400 mt-4">
//             {fixedYears.map((year) => (
//               <h3
//                 key={year}
//                 onClick={() => setSelectedYear(year)}
//                 className={`mt-10 text-xl font-bold text-gray-500 md:pr-5 md:pl-5 md:pt-2 md:pb-2 border-t-2 border-l-2 border-slate-400 cursor-pointer
//           ${selectedYear === year ? 'bg-slate-300' : ''}`}
//               >
//                 {year}년
//               </h3>
//             ))}
//           </div>

//           {/* Topics 목록 */}
//           <div className="bg-slate-100">
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>Error: {error}</p>
//             ) : isYearDataEmpty(selectedYear) ? (
//               <p>{selectedYear}년에는 데이터가 없습니다.</p>
//             ) : (
//               topics
//                 .filter(
//                   (topic) =>
//                     new Date(topic.createdAt).getFullYear().toString() ===
//                     selectedYear
//                 )
//                 .map((topic, index) => (
//                   <div
//                     key={topic._id}
//                     className="flex justify-between items-center p-4 hover:bg-slate-200"
//                   >
//                     <div
//                       className="flex items-center cursor-pointer"
//                       onClick={() => handleEdit(topic)} // 프로젝트 클릭 시 해당 프로젝트 보기
//                     >
//                       <p className="pr-4">Project_{index + 1}</p>
//                       <p className="font-medium">{topic.title}</p>
//                     </div>
//                     <div className="flex space-x-4">
//                       {/* 수정 아이콘
//                       <button onClick={() => handleEdit(topic)}>
//                         <HiOutlinePencil
//                           size={20}
//                           className="text-yellow-500"
//                         />
//                       </button> */}

//                       {/* 삭제 아이콘 */}
//                       <button onClick={() => handleDelete(topic._id)}>
//                         <HiOutlineTrash size={20} className="text-red-500" />
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       {new Date(topic.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))
//             )}
//           </div>

//           {/* Add Topic 버튼 */}
//           <Link href={{ pathname: '/addTopic', query: { category: 'linux' } }}>
//             <button className="bg-gray-200 p-3 mt-2 rounded-full justify-end">
//               Add Topic
//             </button>
//           </Link>
//         </>
//       )}
//     </div>
//   )
// }
'use client'

import React from 'react'
import TopicsList from 'src/app/components/TopicsList'

export default function CloudPage() {
  return (
    <div>
      <h3 className="font-mono text-xl">LINUX</h3>
      <div className="border-2 border-slate-400 p-4 mt-4 bg-gray-100 rounded-lg shadow-lg ppi-d">
        <h3 className="font-bold mb-1">PLAN</h3>
        <hr />
        <p className="mt-1">
          2학년 동안 리눅스, 서버 및 셸 스크립트 기초 공부를 끝내어, 3학년
          때부터는 자동화 시스템을 만드는 프로젝트를 진행할 예정입니다.
          프로젝트는 한국 인터넷 진흥원에 올라와 있는 취약점 상세 가이드를
          이용하여 취약점을 파악하고 그것을 막기 위하여, 보안 위험에 문제가 있는
          설정 파일 중 일부분을 셸 스크립트를 이용하여 자동으로 주석처리를
          하도록 하는 자동화 시스템을 만들어보는 프로젝트를 진행해볼 예정입니다.
        </p>
      </div>
      <TopicsList category="linux" />
    </div>
  )
}
