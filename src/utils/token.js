import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js'

const generateAccessToken = (user) => {
  return jwt.sign({
    id: user._id,
    role: user.role,
    placeId: user.placeId,
    email: user.email
  },
  env.JWT_ACCESS_KEY,
  {expiresIn: "2h"}
  )  
} 

const generateRefreshToken = (user) => {
  return jwt.sign({
    id: user._id,
    role: user.role,
    placeId: user.placeId,
    email: user.email
  },
  env.JWT_REFRESH_KEY,
  {expiresIn: "30d"}
  )
}

export const token = {
  generateAccessToken,
  generateRefreshToken
}