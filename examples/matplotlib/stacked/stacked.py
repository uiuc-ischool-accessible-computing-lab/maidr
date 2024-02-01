import json
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
titanic = sns.load_dataset("titanic")

# Grouping the data by 'class' and 'survived' and then counting the number of occurrences
grouped = titanic.groupby(['class', 'survived']).size().unstack()

# Plotting the stacked bar chart
grouped.plot(kind='bar', stacked=True)

# Adding labels and title
plt.title('Passenger Count by Class and Survival Status on the Titanic')
plt.xlabel('Class')
plt.ylabel('Number of Passengers')
plt.xticks(rotation=0)

# Save the plot as an SVG file
plt.savefig('stacked.svg', format='svg')

# Generating the 'maidr' structure
maidr = {
    "type": "stacked_bar",
    "id": "stacked_bar",
    "selector": "TODO: TYPE YOUR STACKED SELECTOR HERE",
    "labels": {
        "title": "Passenger Count by Class and Survival Status on the Titanic",
        "x": "Class",
        "y": "Number of Passengers",
        "fill": "Survival Status"
    },
    "axes": {
        "x": {
            "label": "Class",
            "level": grouped.index.tolist(),
        },
        "y": {
            "label": "Number of Passengers",
        },
        "fill": {
            "label": "Survival Status",
            "level": ["Survived", "Not Survived"],
        },
    },
    "data": []
}

# Populate the data section, first "Not Survived", then "Survived"
for fill in [0, 1]:  # 0 for Not Survived, 1 for Survived
    for x in grouped.index:
        y = grouped.loc[x][fill]
        survival_status = "Survived" if fill == 1 else "Not Survived"
        maidr["data"].append({
            "x": x,
            "fill": survival_status,
            "y": int(y)
        })

# Writing the raw data to a JSON file
with open("stacked_raw_data.json", 'w') as json_file:
    json.dump(maidr["data"], json_file, indent=4)

# Writing the dictionary to a JSON file
with open("stacked_maidr.json", 'w') as json_file:
    json.dump(maidr, json_file, indent=4)

# Show the plot
plt.show()

# Close the plot
plt.close()
