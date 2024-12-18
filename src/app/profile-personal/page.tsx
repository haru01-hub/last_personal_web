'use client'
import { useAuth, useUser } from '@clerk/nextjs'
//import React from 'react'

export default function ProfilepersonalPage() {
  const { isLoaded: isLoadedAuth, userId } = useAuth()
  const { isLoaded: isLoadedUser, isSignedIn, user } = useUser()
  if (!isLoadedAuth || !userId) {
    return null
  }
  if (!isLoadedUser || !isSignedIn) {
    return null
  }
  return (
    <div>
      <h1 className="text-2xl text-left font-bold ">Profile-Personal</h1>
      <hr />
      <h3 className="text-xl text-left font-bold mt-8">Introduction letter</h3>
      <div>
        <p className="mt-1 mb-1">
          {user.fullName}님, 저의 포트폴리오 웹 사이트에 접속해주셔서
          감사합니다. 저는 시스템 보안 분야로 가기 위하여 리눅스, 서버 공부 및
          셸 스크립트 공부를 하고 있습니다. 클라우드 컴퓨팅 또는 시스템도
          구축해볼 예정입니다. 또한, 이들을 전부 공부를 마친 후에는, 그때까지
          공부한 것과 리눅스 취약점을 결합시켜 모의해킹을 하거나, 셸 스크립트를
          이용하여 취약점 진단 자동화 시스템을 구축해볼 예정입니다. 마지막으로
          이번에 배운 웹 기술인 Next.js 기능을 이용하여 클라우드 기술의
          프론트엔드 부분과 백엔드를 결합한 웹 페이지를 간단하게나마 구현해 볼
          생각입니다. 긴 글 읽어주셔서 감사하며 행복한 하루 보내시길 바랍니다.
        </p>
        <hr />
        <h3 className="text-xl text-left font-bold mt-9">Info.</h3>
        <ul className="list-disc mt-1 ml-5 mb-1">
          <li> Name : 이서연</li>
          <li> Major : 정보보호학과</li>
          <li> e-mail : inhd01@naver.com</li>
          <li>
            <a
              href="https://blog.naver.com/systemd_b"
              className="text-black hover:text-blue-500 hover:font-bold"
              style={{ textDecorationLine: 'underline' }}
            >
              MY Study BLOG
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <h3 className="text-xl text-left font-bold mt-9">Introduction Video</h3>
      <video
        className="mt-2"
        autoPlay={false}
        controls={true}
        muted={true}
        loop={true}
        width={700}
        src="/webvideo.mp4"
      />
      <p className="mt-1">
        Music provided by 브금대통령 Track : 어디를 털어볼까 2-
        <a
          href="https://youtu.be/ulMzAcHdU7w"
          className="text-black hover:text-blue-400"
          style={{ textDecorationLine: 'underline' }}
        >
          https://youtu.be/ulMzAcHdU7w
        </a>
      </p>
    </div>
  )
}
