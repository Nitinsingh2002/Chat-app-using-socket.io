import jwt from 'jsonwebtoken';


const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send("Unauthorized acess");
    }
    try {
        const secretKey = process.env.JWTKEY
        const payload = jwt.verify(token, secretKey);
        req.id = payload.id;
        req.email = payload.email;
        req.name = payload.name;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized acess");
    }


}


export default jwtAuth;