// mongoose 임포트
import mongoose, { Schema } from 'mongoose'

// 스키마 정의
const PythonSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    year: String,
  },
  {
    timestamps: true, // createdAt과 updatedAt 자동 생성
  }
)

// 모델 생성
const Python =
  mongoose.models.Python || mongoose.model('Python', PythonSchema, 'python')

// linux 모델 내보내기
export default Python
