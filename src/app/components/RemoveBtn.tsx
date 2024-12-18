'use client'
import { useRouter } from 'next/navigation'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBtn({
  id,
  category,
}: {
  id: string
  category: string
}) {
  const router = useRouter()

  async function removeTopic() {
    const confirmed = confirm(
      `Are you sure you want to delete the topic with ID ${id}?`
    )
    if (confirmed) {
      const res = await fetch(`/api/${category}?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh() // 페이지 새로 고침
      } else {
        alert('Failed to delete the topic')
      }
    }
  }

  return (
    <button className="text-red-400" onClick={removeTopic}>
      <HiOutlineTrash size={24} />
    </button>
  )
}
