from utils.fitness import calculate_fitness

MOVES = [
    (-1, 0),
    (1, 0),
    (0, -1),
    (0, 1)
]

GRID_SIZE = 20


def is_valid(position):
    x, y = position
    return 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE


def run(start, students, radius):

    current = start

    history = []

    while True:

        current_fitness = calculate_fitness(
            current,
            students,
            radius
        )

        history.append({
            "position": list(current),
            "fitness": current_fitness
        })

        best_neighbor = current
        best_score = current_fitness

        neighbor_scores = []

        for dx, dy in MOVES:

            neighbor = (
                current[0] + dx,
                current[1] + dy
            )

            if not is_valid(neighbor):
                continue

            score = calculate_fitness(
                neighbor,
                students,
                radius
            )

            neighbor_scores.append(score)

            if score > best_score:

                best_score = score

                best_neighbor = neighbor

        if best_score > current_fitness:

            current = best_neighbor

        else:

            if len(neighbor_scores) > 0 and \
               all(score == current_fitness
                   for score in neighbor_scores):

                condition = "plateau"

            else:

                condition = "local_optimum"

            break

    return {
        "history": history,
        "condition": condition
    }