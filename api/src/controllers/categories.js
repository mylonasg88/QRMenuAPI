const con = require("../db/index");

const allCategories = () => {
    try {
        return con.query('select * from categories', (err, results, rows) => {
            if (err) throw err;

            const categories = [];
            results.forEach(cat => {
                const obj = {};
                rows.forEach(field => {
                    obj[field.name] = cat[field.name];
                })
                ;
                categories.push(Object.assign({}, obj));
            });

            let res = JSON.stringify(categories);

            console.log(categories, res);

            return categories;
        })
    } catch (err) {
        console.log(err);
        return err;
    }
}

const createCategory = () => {
    try{}catch(err){
        console.log(err);
    }
}

module.exports = {
    allCategories
}
