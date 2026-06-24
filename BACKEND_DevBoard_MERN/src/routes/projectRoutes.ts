import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validationMiddleware'
import { TaskController } from '../controllers/TaskController'
import { ProjectExists } from '../middleware/projectMiddleware'
import { taskBelongToProject, taskExists } from '../middleware/taskMiddleware'

const router = Router()

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('The name of the Project is obligatory'),
    body('clientName')
        .notEmpty().withMessage('The name of the Client is obligatory'),
    body('description')
        .notEmpty().withMessage('The description of the project is obligatory'),
    handleInputErrors, /* Middleware to validate the "express-validator" */
    ProjectController.createProject
)
 
router.get('/', ProjectController.getAllProjects)

router.get('/:id', 
    param('id').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id', 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    body('projectName')
        .notEmpty().withMessage('The name of the Project is obligatory'),
    body('clientName')
        .notEmpty().withMessage('The name of the Client is obligatory'),
    body('description')
        .notEmpty().withMessage('The description of the project is obligatory'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id', 
    param('id').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    ProjectController.deleteProject
)

/*  ------------------------ ROUTES FOR TASKS ------------------------ */

/* To reuse the same route for a param, we can use the "route.param" of express.
with this form we can pass it the middleware to validate the project and, remove it of the others routes*/
router.param('projectId', ProjectExists)

router.post('/:projectId/tasks',
    param('projectId')
        .isMongoId().withMessage('Invalid Project ID'),
    /* validateProjectExists, */ /* Validate if the project exists // (moved to the router.param)"*/
    body('taskName')
        .notEmpty().withMessage('The name of the task is obligatory'),
    body('description')
        .notEmpty().withMessage('The description is obligatory'),
    handleInputErrors, /* Valite the "express-validator" errors */
    TaskController.createTask /* Then we're gonna passt to the controller en create the project */
)

router.get('/:projectId/tasks',
    param('projectId')
        .isMongoId().withMessage('Invalid Project ID'),
    handleInputErrors,
    TaskController.getProjectTasks
)

/* Validation of the "taskId" param in order, first we're gonna validate if exists and then if the tasks belongs to the project*/
router.param('taskId', taskExists)
router.param('taskId', taskBelongToProject)

router.get('/:projectId/tasks/:taskId',
    param('projectId')
        .isMongoId().withMessage('Invalid Project ID'),
    param('taskId')
        .isMongoId().withMessage('Invalid Task ID'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('projectId')
        .isMongoId().withMessage('Invalid Project ID'),
    param('taskId')
        .isMongoId().withMessage('Invalid Task ID'),
    body('taskName')
        .notEmpty().withMessage('The name of the task is obligatory'),
    body('description')
        .notEmpty().withMessage('The description is obligatory'),
    handleInputErrors, /* Valite the "express-validator" errors */
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('projectId')
        .isMongoId().withMessage('Invalid Project ID'),
    param('taskId')
        .isMongoId().withMessage('Invalid Task ID'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('projectId')
        .isMongoId().withMessage('Invalid Project ID'),
    param('taskId')
        .isMongoId().withMessage('Invalid Task ID'),
    body('status')
        .notEmpty().withMessage('The status is obligatory'),
    handleInputErrors,
    TaskController.updateTaskStatus
)

export default router