import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import 'express-async-errors';
import jwt from 'jwt-simple';

const db = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.json({
    msg: 'Server is up and running!'
  });
});


// Create a new user in the users table
app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await db.user.create({
        data: {
            email: email,
            password: password
        },
        select: {
            id: true,
            email: true,
            password: true
        }
    });

    res.json(user);
});

// Flow:
// 1. Gets email and password
// 2. Check if user exists in the database with the same password
// 3. If user exists, return a jwt

app.get('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.user.findFirst({
        where: {
            email: {equals: email},
            password: {equals: password}
        },
        select: {
            id: true,
            email: true,
        }
    })
    const token = jwt.encode(user, process.env.JWT_SECRET!);
    res.json({
        token: token,
        user: user
    });
});

app.use('/api',(req, res, next) => {
    const token = req.headers.authorization;
    console.log('token', token);
    
    let payload;
    try {
        payload = jwt.decode(token!, process.env.JWT_SECRET!);
    } catch (error) {
        res.json({error});
        return;
    }
    console.log('payload', payload);
    
    if (!payload) {     
        res.json({error: 'No valid token'});
        return;
    }

    next();
});

app.get('/api/subjects/all', async (req, res) => {
    const subjects = await db.subject.findMany();
    res.json(subjects);
});



//@ts-ignore
app.use((error, req, res, next) => {
    // Check if headers have been sent, if they have, invoke the next middleware
    if (res.headersSent) {
      return next(error);
    }
    res.status(error.code || 500).send(error.message || 'Error occurred in specific route' );
  })

const port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});