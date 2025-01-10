from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Park-Themed Fake Data
events = [
    {
        "id": 1,
        "name": "Magic Kingdom Parade",
        "date": "2025-01-20",
        "capacity": 100,
        "booked": 45,
        "description": "Experience the wonder of Disney magic with this spectacular parade down Main Street, U.S.A."
    },
    {
        "id": 2,
        "name": "Epcot Fireworks Show",
        "date": "2025-01-21",
        "capacity": 200,
        "booked": 150,
        "description": "End your day at Epcot with a dazzling fireworks show celebrating the beauty of the world."
    },
    {
        "id": 3,
        "name": "Animal Kingdom Safari Tour",
        "date": "2025-01-22",
        "capacity": 50,
        "booked": 20,
        "description": "Join a thrilling guided safari to see exotic wildlife up close in their natural habitats."
    },
    {
        "id": 4,
        "name": "Hollywood Studios Stunt Show",
        "date": "2025-01-23",
        "capacity": 150,
        "booked": 75,
        "description": "Witness incredible stunts and special effects inspired by your favorite action movies."
    },
    {
        "id": 5,
        "name": "Frozen Sing-Along Celebration",
        "date": "2025-01-24",
        "capacity": 120,
        "booked": 80,
        "description": "Sing along with Elsa, Anna, and Olaf in this magical musical experience."
    }
]

# API Routes
@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(events)

@app.route('/book', methods=['POST'])
def book_event():
    data = request.json
    event_id = data.get('id')
    for event in events:
        if event['id'] == event_id:
            if event['booked'] < event['capacity']:
                event['booked'] += 1
                return jsonify({"success": True, "event": event}), 200
            else:
                return jsonify({"success": False, "message": "Event is fully booked"}), 400
    return jsonify({"success": False, "message": "Event not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
