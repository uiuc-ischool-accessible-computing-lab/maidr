import matplotlib.pyplot as plt
import seaborn as sns
import pydataset

diamonds = pydataset.data("diamonds")
sns.countplot(x="cut", data=diamonds)

#  Export the plot as an SVG file without the xml header
plt.savefig("seabornplot.svg", format="svg")
