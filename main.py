import math
import pygame
import random

pygame.init()

class DrawInformation:
    BLACK = 0, 0, 0
    WHITE = 255, 255, 255
    GREEN = 0, 255, 0
    RED = 255, 0, 0
    BLUE = 0, 0, 255
    BACKGROUND_COLOR = WHITE

    GRADIENTS = [
        (128, 128, 128), (160, 160, 160), (192, 192, 192)
    ]

    Font = pygame.font.SysFont("comicsans", 20)
    LARGE_Font = pygame.font.SysFont("comicsans", 40)

    SIDE_PAD = 100
    TOP_PAD = 150

    def __init__(self, width, height, lst):
        self.width = width
        self.height = height

        self.window = pygame.display.set_mode((width, height))
        pygame.display.set_caption("Sorting Algorithm Visualization")

        self.set_list(lst)

    def set_list(self, lst):
        self.lst = lst
        self.max_val = max(lst)
        self.min_val = min(lst)

        self.block_width = round((self.width - self.SIDE_PAD) / len(lst))
        self.block_height = math.floor((self.height - self.TOP_PAD) / (self.max_val - self.min_val))
        self.start_x = self.SIDE_PAD // 2


def draw(draw_info: DrawInformation, current_algorithm, current_order):
    draw_info.window.fill(draw_info.BACKGROUND_COLOR)

    current = draw_info.Font.render(f"{current_algorithm} - {current_order}", 1, draw_info.BLUE)
    draw_info.window.blit(current, (draw_info.width / 2 - current.get_width() / 2, 5))

    controls = draw_info.Font.render("R - Reset | A - Ascending | D - Descending | B - BubbleSort |", 1, draw_info.BLACK)
    draw_info.window.blit(controls, (draw_info.width / 2 - controls.get_width() / 2, 35))

    controls2 = draw_info.Font.render("Q - QuickSort | S - SelectionSort | W - WeirdSort", 1, draw_info.BLACK)
    draw_info.window.blit(controls2, (draw_info.width / 2 - controls2.get_width() / 2, 60))

    draw_list(draw_info)
    pygame.display.update()


def draw_list(draw_info: DrawInformation, color_positions={}, clear_bg=False):
    lst = draw_info.lst

    if clear_bg:
        clear_rect = (draw_info.SIDE_PAD // 2, draw_info.TOP_PAD, draw_info.width - draw_info.SIDE_PAD,
                     draw_info.height - draw_info.TOP_PAD)

        pygame.draw.rect(draw_info.window, draw_info.BACKGROUND_COLOR, clear_rect)

    for i, val in enumerate(lst):
        x = draw_info.start_x + i * draw_info.block_width
        y = draw_info.height - (val - draw_info.min_val) * draw_info.block_height

        color = draw_info.GRADIENTS[i % 3]

        if i in color_positions:
            color = color_positions[i]

        pygame.draw.rect(draw_info.window, color, (x, y, draw_info.block_width, draw_info.height))

    if clear_bg:
        pygame.display.update()


def bubbleSort(draw_info: DrawInformation, ascending = True):
    lst = draw_info.lst
    for i in range(len(lst) - 1):
        for j in range(len(lst) - i - 1):
            if (lst[j] > lst[j + 1] and ascending) or (lst[j] < lst[j + 1] and not ascending):
                lst[j], lst[j + 1] = lst[j + 1], lst[j]
                draw_list(draw_info, {j: draw_info.RED, j + 1: draw_info.GREEN}, True)
                yield True

    return lst

def quickSort(draw_info: DrawInformation, ascending = True):
    lst = draw_info.lst
    for i in range(len(lst) - 1):
        pivot = random.choice(lst)
        if pivot > lst[j]:
            pass

def weirdSort(draw_info: DrawInformation, ascending = True):
    lst = draw_info.lst
    for i in range(len(lst)):
        for j in range(i, len(lst)):
            if (lst[i] > lst[j] and ascending) or (lst[i] < lst[j] and not ascending):
                lst[i], lst[j] = lst[j], lst[i]
                draw_list(draw_info, {i: draw_info.RED, j : draw_info.GREEN}, True)
                yield True

    return lst

def insertionSort(draw_info: DrawInformation, ascending = True):
    lst = draw_info.lst
    for i in range(1, len(lst)):
        j = i
        while j > 0 and ((lst[j - 1] > lst[j] and ascending) or (lst[j] > lst[j - 1] and not ascending)):
            lst[j - 1], lst[j] = lst[j], lst[j - 1]
            draw_list(draw_info, {j: draw_info.RED, j - 1: draw_info.GREEN}, True)
            j -= 1
            yield True

    return lst

def selectionSort(draw_info: DrawInformation, ascending = True):
    lst = draw_info.lst
    for i in range(len(lst)):
        min_idx = i
        for j in range(min_idx, len(lst)):
            if (lst[j] < lst[min_idx] and ascending) or (lst[j] > lst[min_idx] and not ascending):
                min_idx = j

        lst[min_idx], lst[i] = lst[i], lst[min_idx]
        draw_list(draw_info, {min_idx: draw_info.RED, i: draw_info.GREEN}, True)
        yield True

    return lst


def generateArray(n, min_val, max_val):
    l = []
    for _ in range(n):
        val = random.randint(min_val, max_val)
        l.append(val)

    return l


def main():
    run = True
    clock = pygame.time.Clock()

    n = 50
    min_val = 0
    max_val = 100
    lst = generateArray(n, min_val, max_val)
    draw_info = DrawInformation(800, 600, lst)
    sorting = False
    ascending = True
    sorting_algorithm = bubbleSort
    current_algorithm = "BubbleSort"
    current_order = "Ascending"
    sorting_generator = None

    while run:
        # The higher the tick the faster It solves
        clock.tick(60)

        if sorting:
            try:
                next(sorting_generator)

            except StopIteration:
                sorting = False

        else:
            draw(draw_info, current_algorithm, current_order)

        pygame.display.update()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

            # Checking If a key is pressed
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_r:
                    lst = generateArray(n, min_val, max_val)
                    draw_info.set_list(lst)
                    sorting = False

                elif event.key == pygame.K_SPACE and sorting == False:
                    sorting_generator = sorting_algorithm(draw_info, ascending)
                    sorting = True

                if event.key == pygame.K_i:
                    sorting_algorithm = insertionSort
                    current_algorithm = "InsertionSort"

                elif event.key == pygame.K_s:
                    sorting_algorithm = selectionSort
                    current_algorithm = "SelectionSort"

                elif event.key == pygame.K_b:
                    sorting_algorithm = bubbleSort
                    current_algorithm = "BubbleSort"

                elif event.key == pygame.K_q:
                    sorting_algorithm = quickSort
                    current_algorithm = "QuickSort"

                elif event.key == pygame.K_w:
                    sorting_algorithm = weirdSort
                    current_algorithm = "WeirdSort"

                if event.key == pygame.K_d:
                    ascending = False
                    current_order = "Descending"

                elif event.key == pygame.K_a:
                    ascending = True
                    current_order = "Ascending"

    pygame.quit()

if __name__ == '__main__':
    main()