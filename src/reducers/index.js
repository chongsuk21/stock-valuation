import { combineReducers } from 'redux'
import users from './users'
import finance from './finance';

export default combineReducers({
    users,
    finance
})