import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { upload ,AddMember,getMembers, getMember, updateMember, fetchMembersByDepId, DeletMember, fetchHighestRegNo} from '../controllers/memberController.js'

const router = express.Router()

router.get('/', authMiddleware, getMembers,)
router.post('/add', authMiddleware, upload.single('image'), AddMember)
router.get('/:id', authMiddleware,getMember)
router.put('/:id', authMiddleware,updateMember)
router.get('/modify/:id', authMiddleware,fetchMembersByDepId)
router.delete('/remove/:id',authMiddleware,DeletMember)



export default router;