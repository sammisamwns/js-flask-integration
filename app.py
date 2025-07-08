from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)  # Allow CORS for all domains

def validate_email(email):
    """Validate email format"""
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(pattern, email) is not None

def validate_name(name):
    """Validate name (not empty and reasonable length)"""
    return len(name.strip()) >= 2 and len(name.strip()) <= 50

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data received',
                'error': 'Missing JSON data'
            }), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        
        # Validation
        if not name:
            return jsonify({
                'success': False,
                'message': 'Name is required',
                'error': 'Missing name field'
            }), 400
        
        if not email:
            return jsonify({
                'success': False,
                'message': 'Email is required',
                'error': 'Missing email field'
            }), 400
        
        if not validate_name(name):
            return jsonify({
                'success': False,
                'message': 'Name must be between 2 and 50 characters',
                'error': 'Invalid name format'
            }), 400
        
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Please enter a valid email address',
                'error': 'Invalid email format'
            }), 400
        
        # Process the data (in a real app, you might save to database)
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        return jsonify({
            'success': True,
            'message': 'Data received and processed successfully! ',
            'name': name,
            'email': email,
            'timestamp': timestamp,
            'status': 'processed',
            'details': {
                'name_length': len(name),
                'email_domain': email.split('@')[1] if '@' in email else 'unknown',
                'submission_time': timestamp
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'An error occurred while processing your request',
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'JS-Flask Integration',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True) 