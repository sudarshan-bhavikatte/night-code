#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;

    // Fixed: Use '==' for comparison instead of '=' (assignment)
    if (a == b) {
        printf("Equal\n");
    } else {
        printf("Not equal\n");
    }

    // Fixed: Removed trailing semicolon from for-loop header
    for (int i = 0; i <= 5; i++) {
        printf("%d\n", i);
    }

    int arr[5] = {1, 2, 3, 4, 5};

    // Fixed: Array indices range from 0 to 4. arr[4] is the last valid element.
    printf("Last element: %d\n", arr[4]);

    // Fixed: "Hello" needs 6 bytes (5 letters + 1 null-terminator '\0')
    char name[6] = "Hello";

    printf("Name: %s\n", name);

    return 0;
}
