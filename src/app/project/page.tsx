'use client'
import React from 'react'
//import { Link } from 'react-router-dom'
import Link from 'next/link'

export default function ProjectPage() {
  return (
    <div>
      <h1 className="text-2xl text-left font-bold mb-2">Project</h1>

      <hr />
      <br />
      <div className="flex">
        <Link href="/linux" className="w-150 mr-4 ">
          <img
            className="bg-gray-400 hover:bg-cyan-200 mr-2 ml-4"
            width={150}
            height={150}
            src="/server.png"
            alt="Linux Page"
          />
          <p className="text-black hover:text-cyan-200 font-bold text-center mt-2">
            Linux
          </p>
        </Link>
        <Link href="/web" className="w-150 mr-4 ">
          <img
            className="bg-gray-400 hover:bg-cyan-200 mr-2 ml-4"
            width={150}
            height={150}
            src="/web.png"
            alt="Web Page"
          />
          <p className="text-black hover:text-cyan-200 font-bold text-center mt-2">
            Web
          </p>
        </Link>
        <Link href="/cloud" className="w-150 mr-4 ">
          <img
            className="bg-gray-400 hover:bg-cyan-200 mr-2 ml-4"
            width={150}
            height={150}
            src="/cloud3.png"
            alt="Cloud Page"
          />
          <p className="text-black hover:text-cyan-200 font-bold text-center mt-2">
            Cloud
          </p>
        </Link>
        <Link href="/python" className="w-150 mr-4 ">
          <img
            className="bg-gray-400 hover:bg-cyan-200 mr-2 ml-4"
            width={150}
            height={150}
            src="/python.png"
            alt="Python Page"
          />
          <p className="text-black hover:text-cyan-200 font-bold text-center mt-2">
            Python
          </p>
        </Link>
        <Link href="/penetration" className="w-150 mr-4 ">
          <img
            className="bg-gray-400 hover:bg-cyan-200 mr-2 ml-4 "
            width={150}
            height={150}
            src="/hacker.png"
            alt="penetration-Testing Page"
          />
          <p className="text-black hover:text-cyan-200 font-bold text-center mt-2">
            Penetration Testing
          </p>
        </Link>
      </div>
    </div>
  )
}
