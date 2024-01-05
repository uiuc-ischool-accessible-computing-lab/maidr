library(ggplot2)
library(jsonlite)

# Generate random data
set.seed(123)
data <- data.frame(group = rep(c("A", "B", "C"), each = 100), value = rnorm(300))

# Create boxplot
plot <- ggplot(data, aes(x = group, y = value)) +
  geom_boxplot()

# Save the plot as an SVG file
path<- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_boxplot/boxplot.svg"
ggsave(path, plot, device = "svg")

# Convert data to JSON format
json_data <- toJSON(data)

# Save the JSON data to a file
json_file <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_boxplot/boxplot.json"
write(json_data, json_file)