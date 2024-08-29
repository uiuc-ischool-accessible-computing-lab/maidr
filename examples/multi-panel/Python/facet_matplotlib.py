import matplotlib.pyplot as plt
import seaborn as sns

# Load the penguins dataset using seaborn
penguins = sns.load_dataset("penguins")

# Get unique species and sexes
species = penguins["species"].dropna().unique()
sexes = penguins["sex"].dropna().unique()

# Create a figure and a grid of subplots
fig, axes = plt.subplots(
    nrows=len(species), ncols=len(sexes), figsize=(12, 8), sharex=True, sharey=True
)

# Set a global title for the figure
fig.suptitle("Penguin Bill Dimensions by Species and Sex", fontsize=16)

# Loop through species and sexes to create each subplot
for i, sp in enumerate(species):
    for j, sex in enumerate(sexes):
        ax = axes[i, j]
        subset = penguins[(penguins["species"] == sp) & (penguins["sex"] == sex)]
        ax.scatter(subset["bill_length_mm"], subset["bill_depth_mm"])

        # Set panel-specific titles
        ax.set_title(f"{sp} - {sex}", fontsize=12)

        # Set x and y labels for the leftmost and bottom plots only
        if i == len(species) - 1:
            ax.set_xlabel("Bill Length (mm)")
        if j == 0:
            ax.set_ylabel("Bill Depth (mm)")

# Adjust layout to prevent overlap
plt.tight_layout(rect=[0, 0, 1, 0.95])  # Adjust rect to make space for the global title

# Show the plot
plt.show()
