import json
import numpy as np
import matplotlib.pyplot as plt

# Set seed for reproducibility
np.random.seed(0)

# Generate random data for the scatter plot
x_random = np.random.rand(50) * 60  # X values between 0 and 60
y_random = np.random.rand(50)  # Y values between 0 and 1

# Generate sine wave data
x_sine = np.linspace(0, 60, 100)  # X values for sine wave
y_sine = 0.5 + 0.5 * np.sin(np.pi * x_sine / 30)  # Sine wave with amplitude 0.5 and period of 60

# Create the plot
plt.figure(figsize=(8, 6))
plt.scatter(x_random, y_random, color='blue', label='Random Scatter')  # Scatter plot
plt.plot(x_sine, y_sine, color='red', label='Sine Wave')  # Sine wave line plot
plt.title('Random Scatter Plot with Sine Wave')
plt.xlabel('X values')
plt.ylabel('Y values')

# Save the plot as an SVG file
plt.savefig('scatterplot_point_smooth.svg', format='svg')

# Generating the 'maidr' structure
maidr = {
    'type': ['point', 'smooth'],
    'id': 'scatter',
    'selector': [
        "TODO: TYPE YOUR POINT SELECTOR HERE",
        "TODO: TYPE YOUR SMOOTH SELECTOR HERE"
    ],
    'title': 'Random Scatter Plot with Sine Wave',
    'name': 'Scatter Sine Plot',
    'axes': {
        'x': {
            'label': 'X values',
        },
        'y': {
            'label': 'Y values',
        },
    },
    'labels': {
        'title': 'Random Scatter Plot with Sine Wave',
        'x': 'X values',
        'y': 'Y values',
    },
    'data': [
        [
            # Data for scatter plot
            {'x': x_val, 'y': y_val} for x_val, y_val in zip(x_random, y_random)
        ],
        [
            # Data for sine wave line plot
            {'x': x_val, 'y': y_val} for x_val, y_val in zip(x_sine, y_sine)
        ]
    ],
}

# Writing the raw data to a JSON file
with open("scatterplot_point_smooth_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("scatterplot_point_smooth_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)

# Show the plot
plt.show()

# Close the plot
plt.close()
