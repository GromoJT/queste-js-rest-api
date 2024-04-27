const bcrypt = require("bcrypt");

(async () =>{
    const salt = await bcrypt.genSalt(24);
    console.log(salt)
    console.log(await bcrypt.hash("test",salt));
})();