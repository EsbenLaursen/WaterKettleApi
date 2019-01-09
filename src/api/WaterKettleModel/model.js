import mongoose, { Schema } from 'mongoose'

const waterKettleModelSchema = new Schema({
  temperature: {
    type: String
  },
  weight: {
    type: String
  },
  created: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

waterKettleModelSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      temperature: this.temperature,
      weight: this.weight,
      created: this.created,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('WaterKettleModel', waterKettleModelSchema)

export const schema = model.schema
export default model
