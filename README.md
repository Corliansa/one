# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

Remember to look the .env.example and fill the .env file accordingly. This project currently uses mongodb for the prisma.


## How do I get fake data?

Run <code>yarn db-seed</code>

## How to get this running on my PC on development? 

1. Run <code>yarn install</code>
2. Run mongodb server on localhost:27017. Take a look at installing mongodb from the official website.   
3. Use mongosh to create a user called admin with the password admin at the admin database. Take a look at mongodb and mongosh. 
4. Create .env file and copy the content of .env.local to .env
5. Populate fake data for testing purposes by running <code>yarn db-seed</code> (If this fails, then there might probably be a mismatch with the database config and the .env)
6. Run <code>yarn dev</code>

Go directly to dashboard by typing down localhost:3000/dashboard


## Step by Step for Windows Users
1. Download and install node.js https://nodejs.org/en/download/current
2. Git clone this repo
3. Open Terminal and go to folder where this repo was cloned
4. Type <code>yarn install</code> in terminal (if errors appear try <code>npm install --force</code>)
5. Download the file ".env" from Notion in the Sensus Digitalisasi page and move it to ppi-sensus/ folder
8. Type <code>yarn dev</code> in terminal to start webapp
9. Type <code>http://localhost:3000</code> to open webapp
