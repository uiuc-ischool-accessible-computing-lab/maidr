import matplotlib.pyplot as plt
import seaborn as sns

penguins = sns.load_dataset("penguins")

g = sns.FacetGrid(penguins, row="species", col="sex")
g.map(sns.scatterplot, "bill_length_mm", "bill_depth_mm")
g.fig.suptitle("Penguin Bill Dimensions by Species and Sex", fontsize=16)
g.fig.subplots_adjust(top=0.9)  # Adjust subplots to fit the title
g.set_axis_labels("Bill Length (mm)", "Bill Depth (mm)")
g.set_titles(row_template="{row_name}", col_template="{col_name}")
plt.show()
