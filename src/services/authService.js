import Database from "../config/mysql.js"
import { hashPassword } from "../utils/hashPassword.js"
import { comparePassword } from "../utils/hashPassword.js"
import { token } from "../utils/token.js"


const Register = async (firstname, lastname, email, password, address, phone) => {
  try {
    const role = "user" 
    const created_at = new Date()
    password = await hashPassword(password)
    const values = [
      [
      firstname,
      lastname,
      email,
      password,
      role,
      address,
      phone,
      created_at
      ]
    ]
    const query = 'INSERT INTO  user(firstname, lastname, email, password,role, address, phone, created_at) VALUES?'
    let [result ] = await Database.query(query, [values])
    return result
  } catch (error) {
    throw error
  }
}

const Login = async (email, password) => {
  try {
    const query = `SELECT DISTINCT * FROM user WHERE email = ?`
    const values = [email]
    let [result] = await Database.query(query, values)
    
    if(result.length >0) {
      if(await comparePassword(password, result[0].password)) {
        let userId = result[0].id
        let role = result[0].role
        const accessToken = token.generateAccessToken({
          userId,
          role
        })

        const refreshToken = token.generateRefreshToken({
          userId,
          role
        })
        let fullName = result[0].firstname + ' ' + result[0].lastname
        return {
          email, 
          fullName,
          role,
          accessToken,
          refreshToken
        }
      } else {
        return "Invalid password"
      }
    } else {
      return result
    }
  } catch (error) {
    throw error
  }
}


export const authService = {
  Register,
  Login
}