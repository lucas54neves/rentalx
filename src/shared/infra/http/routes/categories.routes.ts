import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { CategoryImportingController } from '@modules/cars/useCases/categoryImporting/CategoryImportingController'
import { CategoryListingController } from '@modules/cars/useCases/categoryListing/CategoryListingController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'

const upload = multer({
  dest: './tmp',
  limits: {
    fileSize: 8000000 // Compliant: 8MB
  }
})

const categoriesRoutes = Router()

const categoryCreationController = new CreateCategoryController()

const categoryImportingController = new CategoryImportingController()

const categoryListingController = new CategoryListingController()

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  categoryCreationController.handle
)

categoriesRoutes.get('/', categoryListingController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  categoryImportingController.handle
)

export { categoriesRoutes }
