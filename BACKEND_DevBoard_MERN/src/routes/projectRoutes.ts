import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validationMiddleware'
import { TaskController } from '../controllers/TaskController'
import { ProjectExists } from '../middleware/projectMiddleware'
import { hasAuthorization, taskBelongToProject, taskExists } from '../middleware/taskMiddleware'
import { authenticate } from '../middleware/authMiddleware'
import { TeamMemberController } from '../controllers/TeamController'
import { NoteController } from '../controllers/NoteController'

const router = Router()

// Protect all the routes when the user create or modify a project or a task, to be authenticated
router.use(authenticate)

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

/* To reuse the same route for a param, we can use the "route.param" of express.
with this form we can pass it the middleware to validate the project and, remove it of the others routes*/
router.param('projectId', ProjectExists)

router.put('/:projectId',
    hasAuthorization,
    param('projectId')
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

router.delete('/:projectId',
    hasAuthorization,
    param('projectId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    ProjectController.deleteProject
)

/*  ----------------------------------------- ROUTES FOR TASKS -------------------------------------- */

router.param('projectId', ProjectExists)

router.post('/:projectId/tasks',
    hasAuthorization,
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
    hasAuthorization,
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
    hasAuthorization,
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

/*  ----------------------------------------- ROUTES FOR TEAMS -------------------------------------- */

router.get('/:projectId/team',
    TeamMemberController.getProjectTeam
)

router.post('/:projectId/team/find',
    body('email')
        .isEmail().withMessage('Invalid Email'),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    TeamMemberController.removeMemberById
)

/*  ----------------------------------------- ROUTES FOR NOTES -------------------------------------- */

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage('The content of the note is obligatory'),
    handleInputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('Invalid Id'),
    handleInputErrors,
    NoteController.deleteNote
)

export default router