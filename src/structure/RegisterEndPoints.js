import Bundle from './Bundle'

let endPoints = {}

/**
 *@author khalid
 *publish module endpoints
 */

Bundle.forEach(module => endPoints = Object.assign({...endPoints}, {...module.EndPoints}))

export default endPoints
