// mongoose 임포트
import mongoose, { Schema } from 'mongoose'

// 스키마 정의
const PenetrationSchema = new Schema(
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
const Penetration =
  mongoose.models.Penetration ||
  mongoose.model('Penetration', PenetrationSchema, 'penetration')

// linux 모델 내보내기
export default Penetration
