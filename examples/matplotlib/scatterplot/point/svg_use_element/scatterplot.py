import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
import pandas as pd
import json

# Load the Iris dataset
iris = load_iris()
iris_df = pd.DataFrame(iris.data, columns=iris.feature_names)
iris_df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)

# Creating a scatterplot using Matplotlib
plt.figure(figsize=(10, 6))
species_colors = {'setosa': 'r', 'versicolor': 'g', 'virginica': 'b'}
colors = iris_df['species'].map(lambda x: species_colors[x])
plt.scatter(iris_df['sepal length (cm)'], iris_df['sepal width (cm)'], c=colors)
plt.title('Iris Sepal Dimensions')
plt.xlabel('Sepal Length (cm)')
plt.ylabel('Sepal Width (cm)')

# Save the plot as an SVG file
plt.savefig('scatterplot.svg', format='svg')

# Generating the 'maidr' structure for the 'Adelie' species
maidr = {
    'type': ['point'],
    'id': 'scatter',
    'selector': ["TODO: INCLUDE THE POINT SELECTOR HERE"],
    'title': 'Iris Sepal Dimensions',
    'name': 'Scatterplot',
    'axes': {
        'x': {
            'label': 'Sepal Length (cm)',
        },
        'y': {
            'label': 'Sepal Width (cm)',
        },
    },
    'labels': {
        'title': 'Adelie Penguin Bill Dimensions',
        'x': 'Sepal Length (cm)',
        'y': 'Sepal Width (cm)',
    },
    'data': [{
         'x': iris_df['sepal length (cm)'].tolist(),
         'y': iris_df['sepal width (cm)'].tolist()
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
