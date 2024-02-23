
import Database from "../config/mysql.js";

const getAllUsers = async () => {
  try {
    const query = 'select * from user'
    let [result] = await Database.query(query)
    return result
  } catch (error) {
    throw error
  }
}

export const userService = {
  getAllUsers
}