// mongoose 임포트
import mongoose, { Schema } from 'mongoose'

// 스키마 정의
const webSchema = new Schema(
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
const Web = mongoose.models.Web || mongoose.model('Web', webSchema, 'web')

// linux 모델 내보내기
export default Web
