import { WaterKettleModel } from '.'

let waterKettleModel

beforeEach(async () => {
  waterKettleModel = await WaterKettleModel.create({ temperature: 'test', weight: 'test', created: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = waterKettleModel.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(waterKettleModel.id)
    expect(view.temperature).toBe(waterKettleModel.temperature)
    expect(view.weight).toBe(waterKettleModel.weight)
    expect(view.created).toBe(waterKettleModel.created)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = waterKettleModel.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(waterKettleModel.id)
    expect(view.temperature).toBe(waterKettleModel.temperature)
    expect(view.weight).toBe(waterKettleModel.weight)
    expect(view.created).toBe(waterKettleModel.created)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
