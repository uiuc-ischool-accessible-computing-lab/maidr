library(ggplot2)

# Generate random data
set.seed(123)
data <- data.frame(x = 1:10, y = runif(10))

# Create line plot using ggplot2
plot <- ggplot(data, aes(x = x, y = y)) +
  geom_line() +
  labs(title = "Line Plot")

# Save the plot as an SVG file
path<- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_lineplot/lineplot.svg"
ggsave(path, plot, device = "svg")

library(jsonlite)
# Convert data to JSON format
json_data <- toJSON(data)

# Save the JSON data to a file
json_file <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_lineplot/lineplot.json"
write(json_data, json_file)