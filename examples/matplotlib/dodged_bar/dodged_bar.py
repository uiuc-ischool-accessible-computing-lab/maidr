import json
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
titanic = sns.load_dataset("titanic")

# Grouping the data by 'class' and 'survived', then counting the number of occurrences
grouped = titanic.groupby(['class', 'survived']).size().reset_index(name='count')

# Sorting the DataFrame to ensure the correct order
grouped.sort_values(by=['survived', 'class'], ascending=[True, True], inplace=True)

# Plotting the dodged bar chart
sns.barplot(x='class', y='count', hue='survived', data=grouped)

# Adding labels and title
plt.title('Passenger Count by Class and Survival Status on the Titanic')
plt.xlabel('Class')
plt.ylabel('Number of Passengers')

# Save the plot as an SVG file
plt.savefig('dodged_bar.svg', format='svg')

# Generating the 'maidr' structure
maidr = {
    "type": "dodged_bar",
    "id": "dodged_bar",
    "selector": "TODO: TYPE YOUR DODGED SELECTOR HERE",
    "labels": {
        "title": "Passenger Count by Class and Survival Status on the Titanic",
        "x": "Class",
        "y": "Number of Passengers",
        "fill": "Survival Status"
    },
    "axes": {
        "x": {
            "label": "Class",
            "level": grouped['class'].unique().tolist(),
        },
        "y": {
            "label": "Number of Passengers",
        },
        "fill": {
            "label": "Survival Status",
            "level": grouped['survived'].map({0: "Not Survived", 1: "Survived"}).unique()[::-1].tolist(),
        },
    },
    "data": []
}

# Populate the data structure
for _, row in grouped.iterrows():
    maidr["data"].append({
        "x": row['class'].capitalize(),
        "fill": "Survived" if row['survived'] else "Not Survived",
        "y": row['count']
    })

# Writing the raw data to a JSON file
with open("dodged_bar_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("dodged_bar_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)

# Show the plot
plt.show()

# Close the plot
plt.close()
