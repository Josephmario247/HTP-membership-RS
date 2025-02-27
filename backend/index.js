import express from 'express';
import dotenv from "dotenv"
import cors from 'cors'
import authRouter from './routes/auth.js';
import memberRouter from './routes/member.js';
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import highestRegNo from './routes/highestRegno.js';

import connectToDatabase from './db/db.js';
dotenv.config()
connectToDatabase()
const app = express()
app.use(cors({
    origin: [process.env.VITE_FRONTEND_URL, process.env.VITE_FRONTEND_URl_www], // allow requests from both client and server
    credentials: true  // enable cookies for authentication
}))
app.use(express.json())
app.use(express.static('public/uploads')) // to access the static images in the serverside from the frontend


app.use('/api/auth', authRouter)  // Mounting the auth routes at '/api/auth'


app.use('/api/member', memberRouter) // mounting the member routes at '/api/member
app.use('/api/highestRegNO', highestRegNo) // mounting the member routes at '/api/member

app.use('/api/setting', settingRouter) // mounting the setting password routes at '/api/setting
app.use('/api/dashboard', dashboardRouter) // mounting the dashboard routes at '/api/dashboard 
app.use("/", (req, res) =>{
    res.send("welcome Api is working")
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})