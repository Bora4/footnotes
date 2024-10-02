import { Router } from 'express';
import userRoutesJson from './userRoutesJson';
import threadRoutesJson from './threadRoutesJson';

const router = Router();

// Since it is not realistic for this project to use two different data sources at the same time, you have to edit line below to change your data source

router.use('/users', userRoutesJson);
// router.use('/users', userRoutesMysql);
// router.use('/users', userRoutesMongo);

router.use('/threads', threadRoutesJson);

export default router;
