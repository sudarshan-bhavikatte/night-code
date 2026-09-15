#include <stdio.h>

int main() {
    double num1, num2, sum;

    // Prompt user for inputs
    printf("Enter first number: ");
    if (scanf("%lf", &num1) != 1) {
        printf("Error: Invalid input.\n");
        return 1;
    }

    printf("Enter second number: ");
    if (scanf("%lf", &num2) != 1) {
        printf("Error: Invalid input.\n");
        return 1;
    }

    // Calculate sum
    sum = num1 + num2;

    // Output result
    printf("Sum of %.2lf and %.2lf is: %.2lf\n", num1, num2, sum);

    return 0;
}
