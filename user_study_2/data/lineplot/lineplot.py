import json
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
import os
import pandas as pd


def get_filepath(name):
    current_file_path = os.path.abspath(__file__)
    directory = os.path.dirname(current_file_path)
    return os.path.join(directory, name)


def plot(dataframe):
    # Plot the 'iOS' column
    fig = plt.figure(figsize=(10, 6))
    plt.plot(dataframe['Date'], dataframe['Apple'], marker='.')
    plt.suptitle("Apple's Market Share Worldwide", x="0.26", fontsize="12")
    plt.title("From 2010 to 2023", loc="left", fontsize="10")
    plt.xlabel("Year-Month")
    plt.ylabel('Market Share (%)')
    plt.grid(True)
    txt = "Source: Mobile vendor market share from https://gs.statcounter.com/vendor-market-share/mobile"
    plt.figtext(0.5, 0.001, txt, horizontalalignment='left', fontsize=8)
    # plt.xticks(rotation=45)  # Rotate the x-axis labels for better readability

    # Set the x-axis major locator to reduce the number of ticks
    ax = plt.gca()  # Get the current axis
    ax.xaxis.set_major_locator(MaxNLocator(nbins=6))  # Set maximum number of x-axis bins

    # Save the plot to SVG
    output = get_filepath("apple_market_share_alltime_lineplot.svg")
    plt.savefig(output, format='svg')
    plt.show()  # Display the plot


def maidr(dataframe):
    # Construct the JSON structure
    maidr_data = {
        "type": "line",
        "id": "line",
        "title": "Apple's Market Share Worldwide",
        "subtitle": "From 2010 to 2023",
        "caption": "Source: Mobile vendor market share from https://gs.statcounter.com/vendor-market-share/mobile",
        "selector": "g[id='line2d_25'] > path",
        "axes": {
            "x": {
                "label": "Year-Month"
            },
            "y": {
                "label": "Market Share (%)"
            }
        },
        "data": [
            {"x": year, "y": share} for year, share in zip(dataframe['Date'], dataframe['Apple'])
        ]
    }

    # Convert the dictionary to JSON
    output = get_filepath("lineplot_alltime_maidr_data.json")
    with open(output, 'w') as json_file:
        json.dump(maidr_data, json_file, indent=4)


if __name__ == '__main__':
    # Load the dataset
    filename = get_filepath("mobile-vendor-share-alltime.csv")
    df = pd.read_csv(filename)
    plot(df)
    maidr(df)
