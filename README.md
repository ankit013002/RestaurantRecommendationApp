# Restaurant Recommendation App

## **Overview**
The **Restaurant Recommendation App** is a web application that helps users find restaurants based on specific food items or cuisines in a given location. The app leverages the **Google Places API** to fetch restaurant data and allows users to sort results based on **quality (ratings)** or **value (affordability)**.

---
## **Features**
**Search for Restaurants**: Find restaurants based on cuisine, dish, or keywords.
**Location-based Filtering**: Search for places in a specific city or region.
**Sort by Quality or Value**: Users can choose to sort results by highest rating or affordability.
**Restaurant Details**: View name, address, ratings, number of reviews, and an image of the restaurant.
**Image Handling**: Fetches restaurant images from Google Places API with a fallback to a placeholder image.
**Caching for Faster Performance**: Uses **Redis** to store previous searches, reducing API calls and improving speed.
**Modern UI/UX**: Built with **React, Tailwind CSS**, and an intuitive dark theme.

---
## **Tech Stack**
### **Frontend** (`/frontend`)
- **React.js** (Vite for fast development)
- **Axios** for API requests
- **Tailwind CSS** for styling

### **Backend** (`/backend`)
- **Flask** (Python-based lightweight web framework)
- **Flask-CORS** (Handles cross-origin requests)
- **Redis** (Caches results for improved performance)
- **Google Places API** (Fetches restaurant data)

---
## **Installation & Setup**
### ** 1️ Clone the Repository**
```bash
git clone https://github.com/ankit013002/RestaurantRecommendationApp.git
cd RestaurantRecommendationApp
```

### ** 2️ Backend Setup**
Navigate to the `backend` directory:
```bash
cd backend
```
Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate   # (For Mac/Linux)
venv\Scripts\activate     # (For Windows)
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in `backend/` and add:
```env
GOOGLE_PLACES_API_KEY=your_api_key_here
```

Start Redis (if not already running):
```bash
sudo service redis-server start
```

Run the Flask server:
```bash
python app.py
```
The API will be available at `http://127.0.0.1:5000`.

### ** 3️ Frontend Setup**
Navigate to the `frontend` directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in `frontend/` and add:
```env
VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
```

Start the frontend:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---
## **Usage**
1. Enter a **food type** (e.g., `Pizza`, `Sushi`).
2. Enter a **location** (e.g., `New York`).
3. Click **Find Restaurants**.
4. View restaurant details, including **rating, reviews, and images**.

---
## **Future Features **
- **User Accounts & Favorites**: Save favorite restaurants.
- **Google Maps Integration**: Clickable cards to navigate.
- **Pagination**: Load more results dynamically.
- **AI-Powered Recommendations**: Personalized suggestions based on preferences.

---
## **Contributing**
1. **Fork** the repository.
2. **Clone** your fork: `git clone https://github.com/yourusername/RestaurantRecommendationApp.git`
3. Create a **feature branch**: `git checkout -b feature-name`
4. **Commit changes**: `git commit -m "Added a new feature"`
5. **Push** to your fork: `git push origin feature-name`
6. Open a **pull request**.

---
## **License**
This project is licensed under the **MIT License**.

---
## **Author**
**Ankit Patel**

