import connectMongoDB from '@/src/libs/mongodb'
import Cloud from '@/src/models/cloud' // Linux 모델 사용
import { NextRequest, NextResponse } from 'next/server'

// PUT 요청: 토픽 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { newTitle: title, newDescription: description } =
      await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const updatedTopic = await Cloud.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )

    if (!updatedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Topic updated', topic: updatedTopic },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/cloud/[id]', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET 요청: 토픽 정보 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()
    const topic = await Cloud.findOne({ _id: id })
    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }
    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/topics/[id]', error)
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()

    const deletedTopic = await Cloud.findByIdAndDelete(id)

    if (!deletedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Topic deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in DELETE /api/cloud/[id]', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
