#include <stdio.h>

int main() {
    double num1, num2, sum;

    // Prompt user for two numbers
    printf("Enter first number: ");
    if (scanf("%lf", &num1) != 1) {
        printf("Invalid input.\n");
        return 1;
    }

    printf("Enter second number: ");
    if (scanf("%lf", &num2) != 1) {
        printf("Invalid input.\n");
        return 1;
    }

    // Calculate sum
    sum = num1 + num2;

    // Display result
    printf("Sum: %.2lf + %.2lf = %.2lf\n", num1, num2, sum);

    return 0;
}
