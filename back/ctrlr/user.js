// const { getDB } = require("../mdl")
const { addUser } = require("../mdl/user.js")

// signup
exports.post = async ({res,queryString, body, header, db}) => {
	try {
		await addUser({db, data: {...body, ...header}})
		res.statusCode = 201;
		res.write(JSON.stringify({statusMsg:'user post ok:'+ queryString + JSON.stringify(body)}))
		res.end()	
	} catch (e) {
		res.statusCode = 400;
		res.write(JSON.stringify({statusMsg:e.message}));
		res.end();
	}  
}
