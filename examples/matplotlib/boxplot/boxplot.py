import matplotlib.pyplot as plt
import seaborn as sns
import json

# Seaborn has a similar dataset to R's 'diamonds' - the 'tips' dataset
# Load dataset
tips = sns.load_dataset('tips')

# Create a boxplot to see the distribution of total bill amounts by day
plt.figure(figsize=(10, 6))
sns.boxplot(x="total_bill", y="day", data=tips)
plt.title("Distribution of Total Bills by Day")

# Save the plot as an SVG file
# plt.savefig('boxplot.svg', format='svg')

# Generating the 'maidr' structure
maidr = {
    'type': 'box',
    'id': 'box',
    'labels': {
        'title': 'Distribution of Total Bills by Day',
        'x': 'Total Bill',
        'y': 'Day of the Week',
    },
    'axes': {
        'x': {
            'label': 'Total Bill',
        },
        'y': {
            'label': 'Day of the Week',
            'level': [],
        },
    },
    'data': []
}

# Function to calculate boxplot stats for horizontal orientation
def calculate_boxplot_stats_horizontal(group):
    q1 = group.quantile(0.25)
    q3 = group.quantile(0.75)
    iqr = q3 - q1
    min_val = group.min()
    max_val = group.max()
    lower_fence = q1 - 1.5 * iqr
    upper_fence = q3 + 1.5 * iqr
    lower_outliers = group[group < lower_fence].tolist()
    upper_outliers = group[group > upper_fence].tolist()

    return {
        'lower_outlier': lower_outliers,
        'min': min_val,
        'q1': q1,
        'q2': group.median(),
        'q3': q3,
        'max': max_val,
        'upper_outlier': upper_outliers
    }

# Group the dataset by 'day' and calculate stats for 'total_bill'
for day, group_data in tips.groupby('day')['total_bill']:
    stats = calculate_boxplot_stats_horizontal(group_data)
    maidr['data'].append(stats)
    maidr['axes']['y']['level'].append(day)
# Reverse the 'level' list for the y-axis
maidr['axes']['y']['level'].reverse()
# Reverse the order of the data list to match the reversed 'level' list
maidr['data'].reverse()

# Writing the raw data to a JSON file
with open("boxplot_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("boxplot_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)   

# Display the plot
plt.show()

# Close the plot
plt.close()