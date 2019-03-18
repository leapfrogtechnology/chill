import { Router } from 'express';

import { verifySlackRequest } from './validators/slack';
import { validateStatusLog } from './validators/statusLog';

import * as slackController from './controllers/slack';
import * as homeController from './controllers/home';
import * as statusController from './controllers/status';
import * as serviceController from './controllers/service';
import * as statusLogController from './controllers/statusLog';

const router = Router();

router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/', homeController.getAppInfo);

// Current status of services
router.get('/status', statusLogController.getLatestStatus);

// Status Change logs
router.get('/status/logs', statusLogController.getAll);
router.post('/status/logs', validateStatusLog, statusLogController.save); // TODO: Auth Token

// Services
router.get('/services', serviceController.getAll);
router.get('/services/:id(\\d+)', serviceController.get);
router.get('/services/:id(\\d+)/status', serviceController.getServiceStatus);

// Statuses
router.get('/statuses', statusController.getAll);

// Slack Request
router.post('/chill', verifySlackRequest, slackController.getStatus);

export default router;
