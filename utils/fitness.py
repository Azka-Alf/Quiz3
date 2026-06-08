import math

def calculate_fitness(vending_pos, students, radius):

    covered = 0

    for student in students:

        distance = math.sqrt(
            (student[0] - vending_pos[0]) ** 2 +
            (student[1] - vending_pos[1]) ** 2
        )

        if distance <= radius:
            covered += 1

    return covered