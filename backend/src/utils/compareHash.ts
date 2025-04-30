import { compare } from 'bcrypt';
const compareHash = async (plainText: string, hash: string): Promise<boolean> => {
    return compare(plainText, hash);
};
export default compareHash;