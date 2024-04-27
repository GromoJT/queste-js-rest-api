import { Router } from "express";
import userRouter from './routes/user.routes'
import statusRouter from './routes/status.routes'
import questRoute from './routes/quest.routes'
import takenQuestRoute from './routes/user_has_quest.routes'
import authRoute from './routes/auth.routes'
const router = Router()

router.use('/auth',authRoute);
router.use('/users',userRouter);
router.use('/status',statusRouter)
router.use('/quests',questRoute)
router.use('/taken_quests',takenQuestRoute)
export default router;
