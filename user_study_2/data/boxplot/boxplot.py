import os
import pandas as pd
import seaborn as sns
import maidr
import matplotlib.pyplot as plt


def get_filepath(name):
    current_file_path = os.path.abspath(__file__)
    directory = os.path.dirname(current_file_path)
    return os.path.join(directory, name)


def main():
    # Load your dataset
    # Replace 'path_to_your_dataset.csv' with the actual path to your CSV file
    file = get_filepath("mobile-phone-price-us.csv")
    df = pd.read_csv(file)

    # Clean the 'Price ($)' column if necessary (removing dollar signs and commas)
    # Assuming the column might contain strings like '$1,000'
    df['Price ($)'] = df['Price ($)'].replace({'\$': '', ',': ''}, regex=True).astype(float)
    # Sort the DataFrame by 'Brand' alphabetically
    df = df.sort_values(by='Brand')
    # List of brands to include
    selected_brands = ['Apple', 'Samsung', 'Sony', 'Google', 'Huawei', 'Oneplus', 'Motorola']

    # Filter the DataFrame for selected brands and sort
    df = df[df['Brand'].isin(selected_brands)].sort_values(by='Brand')


# Create a box plot
    plt.figure(figsize=(12, 6))  # Adjust the figure size as needed
    box = sns.boxplot(x='Brand', y='Price ($)', data=df)

    plt.xticks(rotation=45)  # Rotate brand names for better readability
    plt.title('Price Distribution by Brand')  # Add a title to the plot
    plt.ylabel('Price ($)')  # Optionally, adjust the y-axis label
    plt.xlabel('Brand')  # Optionally, adjust the x-axis label

    # Show the plot
    plt.tight_layout()  # Adjust subplot parameters to give some padding
    output = get_filepath("test.html")
    box_maidr = maidr.box(box)
    box_maidr.save(output)

    plt.show()


if __name__ == '__main__':
    main()
