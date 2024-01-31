import json
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load the dataset
iris = sns.load_dataset('iris')

# Choose a column for the histogram, for example, the 'petal_length'
data = iris['petal_length']

# Calculate histogram data
counts, bin_edges = np.histogram(data, bins=20)

# Create the histogram plot
plt.hist(data, bins=20, edgecolor='black')
plt.title('Histogram of Petal Lengths in Iris Dataset')
plt.xlabel('Petal Length (cm)')
plt.ylabel('Frequency')

# Save the plot as an SVG file
plt.savefig('histogram.svg', format='svg')

# Bin widths
bin_widths = np.diff(bin_edges)

# Generating the 'maidr' structure
maidr = {
    "type": "hist",
    "id": "hist",
    "selector": "TODO: TYPE YOUR HISTOGRAM SELECTOR HERE",
    "title": "Histogram of Petal Lengths in Iris Dataset",
    "axes": {
        "x": {
            "label": "Petal Length (cm)",
        },
        "y": {
            "label": "Frequency",
        },
    },
    "data": []
}

# Populate data structure
for i in range(len(counts)):
    maidr["data"].append({
         "y": int(counts[i]),  # Convert to int
         "count": int(counts[i]),  # Convert to int
         "x": float(bin_edges[i]),  # Convert to float
         "xmin": float(bin_edges[i]),  # Convert to float
         "xmax": float(bin_edges[i+1]),  # Convert to float
         "density": float(counts[i]) / sum(counts),
         "ncount": float(counts[i]) / len(data),
         "ndensity": float(counts[i]) / (sum(counts) * bin_widths[i]),
         "flipped_aes": False,
         "PANEL": "1",
         "group": "1",
         "ymin": 0,
         "ymax": int(counts[i]),  # Convert to int
         "fill": "",
         "linewidth": 1,
         "linetype": "solid",
     })

# Writing the raw data to a JSON file
with open("histogram_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("histogram_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)

# Display the plot
plt.show()

# Close the plot
plt.close()
