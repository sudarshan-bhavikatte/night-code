def swap_tuple(a, b):
    """Swap using Python's tuple unpacking (Idiomatic Python)"""
    a, b = b, a
    return a, b


def swap_temp(a, b):
    """Swap using a temporary variable"""
    temp = a
    a = b
    b = temp
    return a, b


def swap_arithmetic(a, b):
    """Swap using addition and subtraction"""
    a = a + b
    b = a - b
    a = a - b
    return a, b


def swap_xor(a, b):
    """Swap using XOR bitwise operator (for integers)"""
    a = a ^ b
    b = a ^ b
    a = a ^ b
    return a, b


if __name__ == "__main__":
    print("--- Python Swapping of Two Numbers ---")
    try:
        x = float(input("Enter first number: "))
        y = float(input("Enter second number: "))

        print(f"\nOriginal values: x = {x}, y = {y}")

        # Method 1: Tuple Unpacking (Recommended)
        x, y = y, x
        print(f"After swapping:   x = {x}, y = {y}")

    except ValueError:
        print("Invalid input! Please enter valid numbers.")
