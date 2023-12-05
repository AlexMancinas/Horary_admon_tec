const express = require('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (filename) => {
    return filename.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter((file)=> {
    const name = removeExtension(file);
    if(name !== 'index'){
        console.log(`Adding route: /${name}`);
        router.use(`/${name}`, require(`./${file}`));
    }
});

module.exports = router;   // export the router object so it can be used by the rest of the app