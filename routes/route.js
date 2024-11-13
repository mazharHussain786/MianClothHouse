import express from 'express'
import { getCloth,createCloth ,changeStatus,searchCloth} from '../repository/clothRepository.js'
import {register} from '../repository/auth.js'
import { verifiyEmail,getUrl } from '../repository/utils.js'


const router=express.Router()

router.get('/',(req,res)=>
{
    res.send("hy")
})
router.get('/api/cloth/search',searchCloth)
router.get('/api/cloth/:id',getCloth)


router.get('/api/cloudinary-url',getUrl)
router.post('/api/cloth',createCloth)


router.post('/api/auth/register',register)
router.get('/api/auth/verify/:token',verifiyEmail)




export {router}