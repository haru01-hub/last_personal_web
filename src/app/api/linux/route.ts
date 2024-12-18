// import connectMongoDB from '@/src/libs/mongodb'
// import Linux from '@/src/models/linux'
// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(request: NextRequest) {
//   try {
//     const year = request.nextUrl.searchParams.get('year')
//     await connectMongoDB()
//     const query = year ? { year } : {}
//     const topics = await Linux.find(query)
//     return NextResponse.json({ topics }, { status: 200 })
//   } catch (error) {
//     console.error('Error in GET /api/linux:', error)
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()

//     const { title, description, category, year } = body

//     // 필수 값 체크
//     if (!title || !description || !category || !year) {
//       return NextResponse.json(
//         { message: 'Title, description, category, and year are required' },
//         { status: 400 }
//       )
//     }

//     // MongoDB 연결
//     await connectMongoDB()

//     // 새로운 Topic 생성 (Linux 모델에 저장)
//     const newTopic = new Linux({ title, description, category, year })
//     await newTopic.save()

//     return NextResponse.json(
//       { message: 'Topic created successfully', topic: newTopic },
//       { status: 201 }
//     )
//   } catch (error: unknown) {
//     // 에러 타입 처리
//     const errorMessage =
//       error instanceof Error ? error.message : 'Unknown error'

//     console.error('Error in POST /api/linux:', errorMessage)

//     return NextResponse.json(
//       { message: 'Internal server error', error: errorMessage },
//       { status: 500 }
//     )
//   }
// }
import connectMongoDB from '@/src/libs/mongodb'
import Linux from '@/src/models/linux'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {
  try {
    const year = request.nextUrl.searchParams.get('year')
    await connectMongoDB()
    const query = year ? { year } : {}
    const topics = await Linux.find(query)
    return NextResponse.json({ topics }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/linux:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { title, description } = body
    // const { title, description, category, year } = body
    // 필수 값 체크
    if (!title || !description) {
      // if (!title || !description || !category || !year) {
      return NextResponse.json(
        { message: 'Title, description, category, and year are required' },
        { status: 400 }
      )
    }

    // MongoDB 연결
    await connectMongoDB()

    // 새로운 Topic 생성 (Linux 모델에 저장)
    const newTopic = new Linux({ title, description })
    // const newTopic = new Linux({ title, description, category, year })
    await newTopic.save()

    return NextResponse.json(
      { message: 'Topic created successfully', topic: newTopic },
      { status: 201 }
    )
  } catch (error: unknown) {
    // 에러 타입 처리
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    console.error('Error in POST /api/linux:', errorMessage)

    return NextResponse.json(
      { message: 'Internal server error', error: errorMessage },
      { status: 500 }
    )
  }
}
