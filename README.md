Before you begin, ensure you have the following installed:

    Node.js: Download and install Node.js
    npm (comes with Node.js)
    Visual Studio Code (optional)


Setup and Installation

Run the following command to install all required dependencies:
```
npm install
```

To start the application in development mode, use:
```
npm run dev
```

Open cypress to run tests
```
npx cypress open
```

The .env file is commited with default values:
    
    VITE_BACKEND_ORIGIN=http://localhost:5000
    VITE_API_TARGET=/api/v1