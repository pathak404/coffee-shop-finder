# Coffee Shop Finder
A web app to find coffee shops and pre-book food.

Preview available at [https://coffee-shop.pathak404.me](https://coffee-shop.pathak404.me/)




## Features
- Modern UI design, converted from Figma to reusable React components
- Authentication using JWT with re-login functionality by using refresh token
- Custom hook for data fetching and proper error handling
- Cart and checkout functionalities
- Separate layouts for mobile and desktop devices
- Wishlist feature and dynamic store page



## Getting Started

Clone the repo:
```bash
git clone https://github.com/pathak404/coffee-shop-finder.git
```


## Setup Backend Service
Change the working directory:
```bash
cd coffee-shop-finder/backend
```

then, install all the dependencies:

```bash
npm install
```

Create an .env file or rename existing .env.example to .env and replace values with your own.
```env
PORT=3000
MONGODB_URL=YOUR_MONGO_CONNECTION_STRING
RAZORPAY_KEY=YOUR_RAZORPAY_KEY_ID
RAZORPAY_SECRET=Your_RAZORPAY_SECRET
FRONTEND_URL=http://localhost:5173
JWT_SECRET=ANY_RANDOM_CHARACTERS
```

then, run the backend server:

```bash
npm start
```

Now [http://localhost:3000](http://localhost:3000) is ready to serve.


## Setup Frontend Service
Open a new terminal and change the working directory:
```bash
cd coffee-shop-finder/frontend
```

then, install all the dependencies:

```bash
npm install
```

Create an .env file or rename existing .env.example to .env and replace values with your own.
```env
VITE_API_URL=http://localhost:3000
VITE_RAZORPAY_KEY=YOUR_RAZORPAY_KEY_ID
```

then, run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to access the web app.


## REST API Structure

Proper HTTP status code for operation failure:\
The `status` value will be `true` only if the status code is >=200 and <=299 \
The `data` key is only available when `status` is `true` and it can be an object or list of objects

```json
{
  "status": true,
  "message": "The success meaage",
  "data": {}
}
```

```json
{
  "status": false,
  "message": "The error meaage"
}
```

