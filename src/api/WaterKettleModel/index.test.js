import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { WaterKettleModel } from '.'

const app = () => express(apiRoot, routes)

let waterKettleModel

beforeEach(async () => {
  waterKettleModel = await WaterKettleModel.create({})
})

test('POST /WaterKettleModels 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ temperature: 'test', weight: 'test', created: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.temperature).toEqual('test')
  expect(body.weight).toEqual('test')
  expect(body.created).toEqual('test')
})

test('GET /WaterKettleModels 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /WaterKettleModels/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${waterKettleModel.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(waterKettleModel.id)
})

test('GET /WaterKettleModels/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /WaterKettleModels/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${waterKettleModel.id}`)
    .send({ temperature: 'test', weight: 'test', created: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(waterKettleModel.id)
  expect(body.temperature).toEqual('test')
  expect(body.weight).toEqual('test')
  expect(body.created).toEqual('test')
})

test('PUT /WaterKettleModels/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ temperature: 'test', weight: 'test', created: 'test' })
  expect(status).toBe(404)
})

test('DELETE /WaterKettleModels/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${waterKettleModel.id}`)
  expect(status).toBe(204)
})

test('DELETE /WaterKettleModels/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
