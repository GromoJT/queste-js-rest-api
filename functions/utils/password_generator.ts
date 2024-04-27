const bcrypt = require("bcrypt");

export const password_generator = async (password: string):Promise<string> =>{
    const salt = await bcrypt.genSalt(15);
    return bcrypt.hash(password,salt);
};

