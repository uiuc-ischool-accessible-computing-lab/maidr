library(ggplot2)
library(reshape2)
library(jsonlite)

# Define the data object
data <- data.frame(
  var1 = rnorm(100),
  var2 = rnorm(100),
  var3 = rnorm(100),
  var4 = rnorm(100),
  var5 = rnorm(100)
)

# Generate correlation matrix
cor_matrix <- cor(data)

# Create ggplot correlation heatmap
heatmap <- ggplot(data = melt(cor_matrix), aes(x = Var1, y = Var2, fill = value)) +
  geom_tile() +
  labs(title = "Correlation Heatmap")

# Save the plot as an SVG file
path <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_heatmap/heatmap.svg"
ggsave(path, heatmap, device = "svg")

# Convert data to JSON format
json_data <- toJSON(data)  # Removed the unnecessary jsonlite:: prefix

# Save the JSON data to a file
json_file <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_heatmap/heatmap.json"
write(json_data, json_file)