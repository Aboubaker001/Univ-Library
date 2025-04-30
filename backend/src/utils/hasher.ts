import {hash} from 'bcrypt'
const hasher = (data : string) : Promise<string> => {
    const hashed = hash(data,14);
    return hashed;
}
export default hasher;