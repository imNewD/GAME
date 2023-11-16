def split_word(word):
    # Split the word into two halves with a common letter
    common_letter_index = len(word) // 2
    first_half = word[:common_letter_index + 1]
    second_half = word[common_letter_index:]

    return first_half, second_half, word[common_letter_index]

def calculate_letter_value(letter):
    # Calculate the value of a letter based on its position in the alphabet
    if 'a' <= letter <= 'z':
        return ord(letter) - ord('a') + 1
    elif 'A' <= letter <= 'Z':
        return ord(letter) - ord('A') + 27
    else:
        return 0

def main():
    # Read words from a file
    with open('text.txt', 'r') as file:
        word_list = file.read().splitlines()

    # Initialize a variable to store the sum of common letter values
    sum_of_values = 0

    # Iterate through each word, split it, and calculate the sum
    for word in word_list:
        first_half, second_half, common_letter = split_word(word)
        value = calculate_letter_value(common_letter)
        sum_of_values += value

    print(f"List of words: {word_list}")
    print(f"Sum of common letter values: {sum_of_values}")

if __name__ == "__main__":
    main()
