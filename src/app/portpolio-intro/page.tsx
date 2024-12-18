import React from 'react'

export default function Repositorypage() {
  return (
    <div className="border-2 p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">Portpolio Intro</h1>
      <hr />
      <div className="flex mt-5 mb-5 font-bold">
        <h2>Life Goals </h2>
        <p className="ml-10 text-xl text-center text-blue-500 hover:text-emerald-300">
          시스템 보안
        </p>
      </div>

      <hr />
      <p className="mt-4 text-xl font-bold mb-2">2024.</p>
      <div className="mt-2 mb-2">
        <p className="mt-2 font-bold mb-2">대학교 2학년 2학기</p>
        <p>
          리눅스 명령어 및 리눅스 서버와 클라우드 시스템에 대해서 공부할
          예정입니다. 또한 한국 인터넷 진흥원 사이트에 올라온 취약점 상세
          가이드를 읽어보며 분석할 예정입니다.
        </p>
      </div>
      <hr />
      <p className="mt-4 text-xl font-bold mb-2">2025.</p>
      <div className="mt-2 mb-2">
        <p className="mt-2 font-bold mb-2">대학교 3학년 1학기</p>
        <p>
          대학교에서 진행하는 CCIT에 참여하여, 시스템 보안, 네트워크 등에 관련된
          지식을 쌓아나갈 예정입니다. 또한, 리눅스 마스터 등 자격증 공부를
          시작할 것입니다.
        </p>
      </div>

      <hr />
      <div>
        <div className="mt-2 mb-2">
          <p className="mt-2 font-bold mb-2">대학교 3학년 2학기</p>
          <p>
            그리고 상세 취약점 가이드에 맞춰 시스템 취약점에 대한 진단 자동화
            시스템 및 보안 자동화 시스템을
            <br /> 셸 스크립트를 이용하여 구현해보는 프로젝트를 진행해볼
            예정입니다. 가이드를 읽어보며 분석할 예정입니다.
          </p>
        </div>
      </div>
      <hr />
      <p className="mt-4 text-xl font-bold mb-2">2026.</p>
      <div className="mt-2 mb-2">
        <p className="mt-2 font-bold mb-2">대학교 4학년 1학기</p>
        <p>No PLAN Yet.</p>
      </div>
      <hr />
      <div className="mt-2 mb-2">
        <p className="mt-2 font-bold mb-2">대학교 4학년 2학기</p>
        <p>졸업 예정 및 No PLAN Yet.</p>
      </div>
      <hr />
      <div className="mt-2 mb-2">
        <p className="mt-2 font-bold mb-2">대학원 or 회사 입사</p>
        <p> No PLAN</p>
      </div>
    </div>
  )
}
