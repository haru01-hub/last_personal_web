// // mongoose 임포트
// import mongoose, { Schema } from 'mongoose'

// // 스키마 정의
// const cloudSchema = new Schema(
//   {
//     title: String,
//     description: String,
//     category: String,
//     year: String,
//   },
//   {
//     timestamps: true, // createdAt과 updatedAt 자동 생성
//   }
// )

// // 모델 생성
// const Cloud =
//   mongoose.models.Cloud || mongoose.model('Cloud', cloudSchema, 'cloud')

// // linux 모델 내보내기
// export default Cloud
import mongoose, { Schema } from 'mongoose'

// 스키마 정의
const cloudSchema = new Schema(
  {
    title: String,
    description: String,
    // category: { type: String, required: true },
    // year: { type: Number, required: true }, // 연도를 자동으로 추출하거나 수동으로 설정할 수 있습니다.
  },
  {
    timestamps: true, // createdAt과 updatedAt 자동 생성
  }
)

// 모델 생성 (이미 정의된 모델이 있으면 재사용)
const Cloud =
  mongoose.models.Cloud || mongoose.model('Cloud', cloudSchema, 'cloud')

// 모델 내보내기
export default Cloud
