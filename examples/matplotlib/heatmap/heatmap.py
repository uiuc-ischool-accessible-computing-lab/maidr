import matplotlib.pyplot as plt
import seaborn as sns
import json

# Load the 'flights' dataset from seaborn
flights = sns.load_dataset('flights')

# Convert 'passengers' column to integers
flights['passengers'] = flights['passengers'].astype(int)

# Pivot the dataset to create a matrix suitable for a heatmap
flights_pivot = flights.pivot_table(index='month', columns='year', values='passengers')

# Create a heatmap
plt.figure(figsize=(10, 6))
sns.heatmap(flights_pivot, cmap='viridis', annot=True, fmt='g', linewidths=.5)
plt.title('Heatmap of Flight Passengers')
plt.xlabel('Year')
plt.ylabel('Month')

# Save the plot as an SVG file
plt.savefig('heatmap.svg', format='svg')

# Generating the 'maidr' structure
maidr = {
    "type": "heat",
    "id": "heat",
    "selector": "TODO: INCLUDE THE PATH SELECTOR HERE",
    "title": "Heatmap of Flight Passengers",
    "labels": {
        "fill": "Passenger Count"
    },
    "axes": {
        "x": {"label": "Year", "level": list(flights_pivot.columns)},
        "y": {"label": "Month", "level": list(flights_pivot.index)},
    },
    "data": [list(row) for row in flights_pivot.values],
}

# Writing the raw data to a JSON file
with open("heatmap_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# # Writing the dictionary to a JSON file
with open("heatmap_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)   

# Display the plot
plt.show()

# Close the plot
plt.close()
