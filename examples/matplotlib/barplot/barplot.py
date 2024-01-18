import matplotlib.pyplot as plt
import seaborn as sns
import json

# Seaborn has a similar dataset to R's 'diamonds' - the 'tips' dataset
# Load dataset
tips = sns.load_dataset('tips')

# Create a bar plot (similar to 'diamonds' plot in R)
cut_counts = tips['day'].value_counts()
plt.figure(figsize=(10, 6))
plt.bar(cut_counts.index, cut_counts.values, color='skyblue')
plt.title('The Number of Tips by Day')
plt.xlabel('Day')
plt.ylabel('Count')

# Save the plot as an SVG file
plt.savefig('barplot.svg', format='svg')

# Generating the 'maidr' structure
maidr = {
    "type": "bar",
    "id": "bar",
    "title": "The Number of Tips by Day",
    "axes": {
        "x": {
            "label": "Day",
            "level": list(cut_counts.index),
        },
        "y": {
            "label": "Count",
        },
    },
    # Convert int64 values to Python native int type
    "data": [int(value) for value in cut_counts.values],
}

# Writing the raw data to a JSON file
with open("barplot_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("barplot_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)   

# Display the plot
plt.show()

# Close the plot
plt.close()