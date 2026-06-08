from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

import random

from algorithms.simple_hc import run as simple_run
from algorithms.steepest_hc import run as steepest_run
from algorithms.stochastic_hc import run as stochastic_run

from utils.campus_generator import generate_students

app = Flask(__name__)


# =====================================
# HOME PAGE
# =====================================

@app.route("/")
def index():
    return render_template("index.html")


# =====================================
# SIMULATION API
# =====================================

@app.route("/simulate", methods=["POST"])
def simulate():

    try:

        data = request.get_json()

        algorithm = data.get("algorithm", "simple")
        radius = int(data.get("radius", 4))
        student_count = int(data.get("students", 150))

        # Generate mahasiswa acak
        students = generate_students(
            count=student_count,
            size=20
        )

        # Posisi awal vending machine
        start_position = (
            random.randint(0, 19),
            random.randint(0, 19)
        )

        # Jalankan algoritma
        if algorithm == "simple":

            result = simple_run(
                start_position,
                students,
                radius
            )

        elif algorithm == "steepest":

            result = steepest_run(
                start_position,
                students,
                radius
            )

        elif algorithm == "stochastic":

            result = stochastic_run(
                start_position,
                students,
                radius
            )

        else:

            result = simple_run(
                start_position,
                students,
                radius
            )

        return jsonify({

            "success": True,

            "algorithm": algorithm,

            "start_position": list(start_position),

            "students": students,

            "history": result["history"],

            "condition": result["condition"]

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# =====================================
# HEALTH CHECK
# =====================================

@app.route("/health")
def health():

    return jsonify({
        "status": "running"
    })


# =====================================
# RUN APP
# =====================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )