# Video-streaming

This repository contains backend routes for video uploading, streaming and downloading.
Most important point here is that the front end is just for testing purposes of backend. It is very static and you might feel it is not working as expected.
To know if the backend is working properly or not, test the routes in postman.

## Things to remember

- The tech-stack used for the project is HTML, CSS, JS(For Frontend),
 NodeJS, Express(For Backend), fs and multer(middleware).
- The backend will work on port 3030. So make sure to clear the port before running backend.
- All the videos will be saved in `backend/uploads` folder

## Changes


1.  In `Frontend/index.html`, change the http://localhost:3030/video/stream/cute-cat-3921.mp4 to https://localhost:3030/video/stream/fileName. (where fileName is the name of video file that you want to stream).
2.  Do same changes if you want to download different video.

## Available Script

In the project, First go to **BackEnd** directory and run below command on terminal:

    npm install

The above command would install all the dependencies needed.

To run the Node server:

    nodemon/node index.js

After successfully running the server, just open `Frontend/index.html` file on your browser.
