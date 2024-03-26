import json
import matplotlib.pyplot as plt
import os
import pandas as pd


def get_filepath(name):
    current_file_path = os.path.abspath(__file__)
    directory = os.path.dirname(current_file_path)
    return os.path.join(directory, name)


def plot(dataframe):
    # Plot the 'iOS' column
    plt.figure(figsize=(10, 6))
    plt.plot(dataframe['Date'], dataframe['iOS'], marker='.')
    plt.title('iOS Market Share Over Time')
    plt.xlabel('Year')
    plt.ylabel('Market Share (%)')
    plt.grid(True)
    plt.xticks(rotation=45)  # Rotate the x-axis labels for better readability

    # Save the plot to SVG
    output = get_filepath("ios_market_share_lineplot.svg")
    plt.savefig(output, format='svg')
    plt.show()  # Display the plot


def maidr(dataframe):
    # Construct the JSON structure
    maidr_data = {
        "type": "line",
        "id": "line",
        "title": "iOS Market Share Over Time",
        "selector": "g[id='line2d_25'] > path",
        "axes": {
            "x": {
                "label": "Year"
            },
            "y": {
                "label": "Market Share (%)"
            }
        },
        "data": [
            {"x": year, "y": share} for year, share in zip(dataframe['Date'], dataframe['iOS'])
        ]
    }

    # Convert the dictionary to JSON
    output = get_filepath("lineplot_maidr_data.json")
    with open(output, 'w') as json_file:
        json.dump(maidr_data, json_file, indent=4)


if __name__ == '__main__':
    # Load the dataset
    filename = get_filepath("mobile-os-share-us.csv")
    df = pd.read_csv(filename)
    plot(df)
    maidr(df)
