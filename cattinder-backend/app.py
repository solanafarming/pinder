from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

profiles = [
    {"name": "Catasha", "age": 22, "job": "Purrgrammer", "location": "Meow York", "height": "3 ft 1 in",
     "bio": "Loves naps and debugging. 🐾", "filePath": "/static/images/Catasha.webp"},
    {"name": "Cate", "age": 19, "job": "Catfluencer", "location": "Purris", "height": "2 ft 8 in",
     "bio": "Chasing laser pointers is life!", "filePath": "/static/images/Cate.webp"},
    {"name": "Catelin", "age": 20, "job": "Felineologist", "location": "Purris", "height": "3 ft 0 in",
     "bio": "Always on the prowl for fun.", "filePath": "/static/images/Catelin.webp"},
    {"name": "Pawsley", "age": 21, "job": "Furmer", "location": "Meowbourne", "height": "3 ft 7 in",
     "bio": "Swipe right if you like: sunbeams, chin scritches, and judging people from a distance.",
     "filePath": "/static/images/Pawsley.webp"},
]

@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/static/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('static/images', filename)

@app.route('/profiles', methods=['GET'])
def get_profiles():
    return jsonify(profiles)

if __name__ == '__main__':
    app.run(debug=True)
