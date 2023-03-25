import axios from 'axios';
import { baseUrl } from '../../Base';
export const GetUsers = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/Users`);
        return data
    } catch (error) {
        throw Error(error)
    }
}


//Delete
export const UserDel = async () => {
    try {
        await axios.delete()
    } catch (error) {
        
    }
}