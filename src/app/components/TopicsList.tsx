'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import TopicView from 'src/app/components/TopicView'
const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface Topic {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  category: string
  year: string
}

interface TopicListProps {
  category: string
}

export default function TopicsList({ category }: TopicListProps) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [, setYears] = useState<string[]>([]) // 연도 목록 상태 추가
  const [selectedYear, setSelectedYear] = useState('2024')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null) // 수정할 토픽 상태

  const fixedYears = ['2024', '2025', '2026', '2027', '2028', '2029'] // 고정된 연도 탭

  useEffect(() => {
    console.log('Current category:', category)
    async function fetchTopics() {
      try {
        const res = await fetch(
          `${apiUrl}/api/${category}?category=${category}`
        )
        if (!res.ok) {
          const errorText = await res.text() // Fetch the error message from the response
          console.error('Failed to fetch topics:', res.status, errorText) //여기 수정해버렸다=====원래 없었음.
          throw new Error('Failed to fetch topics')
        }
        const data = await res.json()
        setTopics(data.topics)

        // 생성된 연도 목록을 추출하고, 중복 제거
        const years = data.topics.map((topic: Topic) =>
          new Date(topic.createdAt).getFullYear().toString()
        )
        const uniqueYears: string[] = Array.from(new Set(years)) // 중복 제거 후 string[] 타입으로 지정
        setYears(uniqueYears)
      } catch (error) {
        console.error('Error loading topics: ', error)
        setError('Failed to load topics')
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [category]) // 카테고리 변경 시 다시 실행

  // 선택된 연도의 데이터가 없는지 확인하는 함수
  const isYearDataEmpty = (year: string) => {
    return (
      topics.filter(
        (topic) => new Date(topic.createdAt).getFullYear().toString() === year
      ).length === 0
    )
  }

  // 토픽 삭제 함수
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      try {
        const res = await fetch(`${apiUrl}/api/${category}/${id}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          // 삭제 후 목록을 다시 로드
          setTopics(topics.filter((topic) => topic._id !== id))
        } else {
          alert('Failed to delete the topic.')
        }
      } catch (error) {
        console.error('Error deleting topic:', error)
        alert('An error occurred while deleting the topic.')
      }
    }
  }

  // 수정하려는 토픽 선택 함수
  const handleView = (topic: Topic) => {
    setEditingTopic(topic)
  }

  return (
    <div>
      {editingTopic ? (
        <div className="p-4">
          <TopicView topic={editingTopic} handleDelete={handleDelete} />
        </div>
      ) : (
        <>
          {/* Default로 맨 위에 고정된 내용 */}
          {/* <h3 className="font-mono text-xl">CLOUD</h3>
          <div className="border-2 border-slate-400 p-4 mt-4 bg-gray-100 rounded-lg shadow-lg ppi-d">
            <h3 className="font-bold mb-1">PLAN</h3>
            <hr />
            <p className="mt-1">
              클라우드는 아직 배우지는 않았지만 시스템 보안 분야 쪽을 공부하기
              위해서는 반드시 알아야 하는 요소라고 하여 클라우드 분야를 공부해볼
              예정입니다.
            </p>
          </div> */}

          {/* 연도 선택 탭 */}
          <div className="flex border-b-2 border-slate-400 mt-4">
            {fixedYears.map((year) => (
              <h3
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`mt-10 text-xl font-bold text-gray-500 md:pr-5 md:pl-5 md:pt-2 md:pb-2 border-t-2 border-l-2 border-slate-400 cursor-pointer
      ${selectedYear === year ? 'bg-slate-300' : ''}`}
              >
                {year}년
              </h3>
            ))}
          </div>

          {/* Topics 목록 */}
          <div className="bg-slate-100">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : isYearDataEmpty(selectedYear) ? (
              <p>{selectedYear}년에는 데이터가 없습니다.</p>
            ) : (
              topics
                .filter(
                  (topic) =>
                    new Date(topic.createdAt).getFullYear().toString() ===
                    selectedYear
                )
                .map((topic, index) => (
                  <div
                    key={topic._id}
                    className="flex justify-between items-center p-4 hover:bg-slate-200"
                    onClick={() => handleView(topic)} // 프로젝트 클릭 시 해당 프로젝트 보기
                  >
                    <div className="flex items-center">
                      <p className="pr-4">Project_{index + 1}</p>
                      <p className="font-medium">{topic.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(topic.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
            )}
          </div>

          {/* Add Topic 버튼 */}
          <Link
            href={{ pathname: '/addTopic', query: { category: '${category}' } }}
          >
            <button className="bg-gray-200 p-3 mt-2 rounded-full justify-end">
              Add Topic
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
