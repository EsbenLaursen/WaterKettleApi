import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export WaterKettleModel, { schema } from './model'

const router = new Router()
const { temperature, weight, created } = schema.tree

/**
 * @api {post} /WaterKettleModels Create water kettle model
 * @apiName CreateWaterKettleModel
 * @apiGroup WaterKettleModel
 * @apiParam temperature Water kettle model's temperature.
 * @apiParam weight Water kettle model's weight.
 * @apiParam created Water kettle model's created.
 * @apiSuccess {Object} waterKettleModel Water kettle model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Water kettle model not found.
 */
router.post('/',
  body({ temperature, weight, created }),
  create)

/**
 * @api {get} /WaterKettleModels Retrieve water kettle models
 * @apiName RetrieveWaterKettleModels
 * @apiGroup WaterKettleModel
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of water kettle models.
 * @apiSuccess {Object[]} rows List of water kettle models.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /WaterKettleModels/:id Retrieve water kettle model
 * @apiName RetrieveWaterKettleModel
 * @apiGroup WaterKettleModel
 * @apiSuccess {Object} waterKettleModel Water kettle model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Water kettle model not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /WaterKettleModels/:id Update water kettle model
 * @apiName UpdateWaterKettleModel
 * @apiGroup WaterKettleModel
 * @apiParam temperature Water kettle model's temperature.
 * @apiParam weight Water kettle model's weight.
 * @apiParam created Water kettle model's created.
 * @apiSuccess {Object} waterKettleModel Water kettle model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Water kettle model not found.
 */
router.put('/:id',
  body({ temperature, weight, created }),
  update)

/**
 * @api {delete} /WaterKettleModels/:id Delete water kettle model
 * @apiName DeleteWaterKettleModel
 * @apiGroup WaterKettleModel
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Water kettle model not found.
 */
router.delete('/:id',
  destroy)

export default router
