import User from "./models/User.js"
import bcrypt from 'bcrypt';
import connectToDataBase from "./db/db.js";

const userRegister = async () => {
    connectToDataBase()
    try {
        const hashPassword = await bcrypt.hash("admin",10)
        const newUser = new User({
            name:"Joseph",
            email:"josephbarth247@gmail.com",
            password: hashPassword,
            role:"Admin"

        })
        await newUser.save()
        const newUser2 = new User({
            name:"Rev. Sr. Veronica",
            email:"nwaiwuamaka315@gmail.com",
            password: hashPassword,
            role:"Admin"
        })
        await newUser2.save()
        const newUser3 = new User({
            name:"Rev. Fr. Jimbili Moses",
            email:"mjimbili@yahoo.co.uk",
            password: hashPassword,
            role:"Admin"
        })
        await newUser3.save()
      
        
    } catch (error) {
        console.log(error)
    }
}
userRegister()