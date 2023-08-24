import { createClient } from 'redis';
import { Redis } from 'ioredis';
import mongoose from 'mongoose';

export const redisConnection=async() => {

  
  const redis = new Redis({
    host: 'redis-18599.c301.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 18599,
    password: 'PaEtJUDq3Ev5qYy34SlbSHe1iYcMJKLk', // If you set up authentication
  });

 await redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});
    return redis;
}

export const mongoDbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`)
       }).catch((err)=>{
        console.log(err);
       })
   
}