import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import json

# Load the penguins dataset
data = sns.load_dataset('penguins')

# Filter the data for only the 'Adelie' species
data_adelie = data[data['species'] == 'Adelie']

# Create a scatter plot with the seaborn dataset for only the 'Adelie' species
plt.figure(figsize=(10, 6))
scatter_plot = sns.scatterplot(data=data_adelie, x="bill_length_mm", y="bill_depth_mm", hue="species", style="species", palette="deep")
plt.title('Adelie Penguin Bill Dimensions')
plt.xlabel('Bill Length (mm)')
plt.ylabel('Bill Depth (mm)')

# Save the plot as an SVG file
plt.savefig('scatterplot.svg', format='svg')

# Generating the 'maidr' structure for the 'Adelie' species
maidr = {
    'type': ['point'],
    'id': 'scatter',
    'selector': ["TODO: INCLUDE THE POINT SELECTOR HERE"],
    'title': 'Adelie Penguin Bill Dimensions',
    'name': 'Scatterplot - Adelie',
    'axes': {
        'x': {
            'label': 'Bill Length (mm)',
        },
        'y': {
            'label': 'Bill Depth (mm)',
        },
    },
    'labels': {
        'title': 'Adelie Penguin Bill Dimensions',
        'x': 'Bill Length (mm)',
        'y': 'Bill Depth (mm)',
    },
    'data': [{
         'x': data_adelie['bill_length_mm'].dropna().tolist(),
         'y': data_adelie['bill_depth_mm'].dropna().tolist()
     }],
}

# Writing the raw data to a JSON file
with open("scatterplot_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("scatterplot_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)

# Display the plot
plt.show()

# Close the plot
plt.close()
