# fileHandling
### About
FileHandling is a full-stack web application built using the MERN stack. It allows users to upload, store, and manage various file types such as PDFs, images, DOCX, and other formats securely.
### Features
- **User Authentication** – Secure login and registration system using JWT and cookies.
- **File Upload & Storage** – Upload files like PDFs, images, Word documents, etc., and store them in the database or cloud storage (e.g., Cloudinary).
- **File Preview** – View uploaded files.
- **File Metadata Display** – See details such as file name, type, and size.

### Tech Stack
- Frontend: React.js, Tailwind CSS , DaisyUi
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Others: clouidnary , React-Toastify , React DropZone

### Installation & Setup
- git clone ```repo-url```

### Install Dependencies
- Frontend
```
cd client 
npm install
``` 
- Backend
```
cd server 
npm install
```
### Setup Environment Variables
Create a `.env` file in the `server` directory using the structure in `env.example` and provide your own values.

### Run the Application
- Frontend
```
cd client 
npm run dev
``` 
- Backend
```
cd server 
npm run dev
```
### API Endpoints
For sample API endpoints, refer to the routes folder located in the server directory. It includes:
- User Authentication routes
- FileHandling routes

### Notes
- Make sure MongoDB is running locally or configured via cloud (e.g., MongoDB Atlas).
- The app uses React DropZone for file handling like selecting a file and Drag and Drop file.
- Toast notifications are implemented with React-Toastify.

- **Sign Up for Cloudinary**: Create a free account at [Cloudinary](https://cloudinary.com/).
- **Install Cloudinary SDK**: Run `npm install cloudinary`.
- **Configure Cloudinary**: Add your credentials to `.env` like ***CLOUDINARY_CLOUD_NAME*** , ***CLOUDINARY_API_KEY*** ,                ***CLOUDINARY_API_SECRET***.
For more details, refer to the [Cloudinary Official Documentation](https://cloudinary.com/documentation).

### Screenshots
![fh5](https://github.com/user-attachments/assets/a21e614f-ef4d-431a-9894-7bfa76efd6b5)
![fh4](https://github.com/user-attachments/assets/ad4634c4-7254-4141-a4ee-851f3d303324)
![fh3](https://github.com/user-attachments/assets/b23e5298-80ea-4eaa-8a5d-1c65ea24a8d2)
![fh2](https://github.com/user-attachments/assets/6e5963ab-20b2-4335-aa1c-8c4f5be56646)
![fh1](https://github.com/user-attachments/assets/edc9c7f9-08a4-43a3-8c65-4c483741e5ec)

### Contact
- Gmail: shivanandcrew034@gmail.com
