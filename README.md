## **Deployed Web Service:** [https://js-flask-integration.onrender.com](https://js-flask-integration.onrender.com)


# JS ↔ Flask Integration

A simple integration between JavaScript frontend and Flask backend where:
- **JavaScript frontend** collects user input (name, email) and sends it to
- **Flask backend**, which receives it and returns a confirmation as **JSON**.

## Project Structure

```
project/
│
├── static/
│   ├── script.js       # JavaScript file
│   └── styles.css      # CSS stylesheet
├── templates/
│   └── index.html      # HTML file
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
└── README.md          # This file
```



---

## Quick Start

1. **Create Python virtual environment:**
   ```bash
   python3 -m venv .venv
   ```

2. **Activate virtual environment:**
   ```bash
   # On Windows:
   .\.venv\Scripts\activate
   
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application:**
   ```bash
   python app.py
   ```

5. **Open your browser and visit:**
   ```
   http://127.0.0.1:5000/
   ```

6. **Test the application:**
   - Fill in the name and email fields
   - Click "Submit"
   - See the JSON response from the Flask backend

## How It Works

1. **Frontend (`index.html` + `script.js` + `styles.css`):**
   - Collects user input via a form
   - Uses `fetch()` API to send POST request to Flask
   - Displays the JSON response
   - Professional styling with separate CSS file

2. **Backend (`app.py`):**
   - Flask server with CORS enabled
   - `/` route serves the HTML page
   - `/submit` route receives JSON data and returns confirmation

## API Endpoints

- `GET /` - Serves the main HTML page
- `POST /submit` - Receives JSON data and returns confirmation

## Technologies Used

- **Frontend:** HTML, JavaScript (Vanilla)
- **Backend:** Python Flask
- **CORS:** flask-cors for cross-origin requests 