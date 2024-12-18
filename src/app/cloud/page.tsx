'use client'
import React from 'react'
import TopicsList from 'src/app/components/TopicsList'

export default function CloudPage() {
  return (
    <div>
      <h3 className="font-mono text-xl">CLOUD</h3>
      <div className="border-2 border-slate-400 p-4 mt-4 bg-gray-100 rounded-lg shadow-lg ppi-d">
        <h3 className="font-bold mb-1">PLAN</h3>
        <hr />
        <p className="mt-1">
          클라우드는 아직 배우지는 않았지만 시스템 보안 분야 쪽을 공부하기
          위해서는 반드시 알아야 하는 요소라고 하여 클라우드 분야를 공부해볼
          예정입니다.
        </p>
      </div>
      <TopicsList category="cloud" />
    </div>
  )
}
