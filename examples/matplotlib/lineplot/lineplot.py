import matplotlib.pyplot as plt
import seaborn as sns
import json

# Load the 'tips' dataset from seaborn
tips = sns.load_dataset('tips')

# Choose a specific subset of the dataset (e.g., data for 'Thursday')
subset_data = tips[tips['day'] == 'Thur']

# Create a line plot
plt.figure(figsize=(10, 6))
line_plot = sns.lineplot(data=subset_data, x='total_bill', y='tip', markers=True, style='day', legend=False)
plt.title('Line Plot of Tips vs Total Bill (Thursday)')
plt.xlabel('Total Bill')
plt.ylabel('Tip')

# Save the plot as an SVG file
plt.savefig('lineplot.svg', format='svg')

# Generate the 'maidr' structure
maidr = {
    "type": "line",
    "id": "line",
    "title": "Line Plot of Tips vs Total Bill (Thursday)",
    "axes": {
        "x": {"label": "Total Bill"},
        "y": {"label": "Tip"}
    },
    "data": [{"x": x, "y": y} for x, y in line_plot.get_lines()[0].get_xydata()]
}

# Writing the raw data to a JSON file
with open("lineplot_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# # Writing the dictionary to a JSON file
with open("lineplot_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)   

# Show the plot
plt.show()

# Close the plot
plt.close()
