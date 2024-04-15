import { Router } from "express";
import userRouter from './routes/user.routes'
import statusRouter from './routes/status.routes'
import questRoute from './routes/quest.routes'
import takenQuestRoute from './routes/user_has_quest.routes'
const router = Router()

router.use('/api/v1/quester/users',userRouter);
router.use('/api/v1/quester/status',statusRouter)
router.use('/api/v1/quester/quests',questRoute)
router.use('/api/v1/quester/taken_quests',takenQuestRoute)
export default router;
