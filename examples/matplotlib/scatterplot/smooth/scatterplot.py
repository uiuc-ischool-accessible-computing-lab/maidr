import json
import numpy as np
import matplotlib.pyplot as plt

# Set seed for reproducibility
np.random.seed(0)

# Generate sine wave data
x_sine = np.linspace(0, 60, 100)  # X values for sine wave
y_sine = 0.5 + 0.5 * np.sin(np.pi * x_sine / 30)  # Sine wave with amplitude 0.5 and period of 60

# Create the plot
plt.figure(figsize=(8, 6))
plt.plot(x_sine, y_sine, label='Sine Wave')  # Sine wave line plot
plt.title('Random Scatter Plot with Sine Wave')
plt.xlabel('X values')
plt.ylabel('Y values')

# Save the plot as an SVG file
plt.savefig('scatterplot_smooth.svg', format='svg')

# Generating the 'maidr' structure
maidr = {
    'type': ['smooth'],
    'id': 'scatter',
    'selector': [
        "TODO: TYPE YOUR SMOOTH SELECTOR HERE"
    ],
    'title': 'Sine Wave',
    'name': 'Sine Plot',
    'axes': {
        'x': {
            'label': 'X values',
        },
        'y': {
            'label': 'Y values',
        },
    },
    'labels': {
        'title': 'Sine Wave',
        'x': 'X values',
        'y': 'Y values',
    },
    'data': [
        [
            # Data for sine wave line plot
            {'x': x_val, 'y': y_val} for x_val, y_val in zip(x_sine, y_sine)
        ]
    ],
}

# Writing the raw data to a JSON file
with open("scatterplot_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("scatterplot_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)

# Show the plot
plt.show()

# Close the plot
plt.close()
