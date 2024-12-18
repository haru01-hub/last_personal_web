import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex">
      {/* <h1 className="text-5xl text-left font-bold text-orange-400 hover:text-cyan-200">
        Hello!
      </h1> */}

      <img
        className="ml-4"
        width={500}
        src="/ppy11.png"
        alt="hell
        "
      />
      <div>
        <h2 className="ppi-c ml-10 font-bold text-5xl font-mono">#PPY11</h2>
        <br />
        <p className="ppi-d ml-10 mb-20 text-lg">
          「 저의 웹 페이지 #PPY11은 Portpolio seoYeon과 리눅스의 루트 권한인
          #이 합쳐진 것으로 저의 포트폴리오를 관리자 권한을 가진 것처럼
          주도적으로 포트폴리오를 채워나가겠다는 의미의 포트폴리오를 관리하는 웹
          페이지입니다. 저의 진로 분야는 시스템 보안 분야로 리눅스, 클라우드,
          모의해킹 등을 위주로 공부하며 프로젝트를 진행해 나갈 예정이며, 이곳에
          업로드 될 예정입니다. 프로젝트가 궁금하신 분들은 아래 더보기란을
          참고해주세요! 」
        </p>
        <Link
          href="/portpolio-intro"
          className="ml-10 font-bold text-slate-400 hover:text-blue-400 hover:text-xl"
        >
          ▶ 더보기
        </Link>
      </div>
    </div>
  )
}
