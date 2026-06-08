import random

def generate_students(count=150, size=20):

    students = []

    for _ in range(count):

        students.append([
            random.randint(0, size - 1),
            random.randint(0, size - 1)
        ])

    return students