library(ggplot2)

# Generate random data
set.seed(123)
data <- data.frame(x = LETTERS[1:10], y = runif(10))

# Create barplot using ggplot2
plot <- ggplot(data, aes(x = x, y = y)) +
  geom_bar(stat = "identity") +
  labs(title = "Barplot")

# Save the plot as an SVG file
path<- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_barplot/barplot.svg"
ggsave(path, plot, device = "svg")

library(jsonlite)
# Convert data to JSON format
json_data <- toJSON(data)

# Save the JSON data to a file
json_file <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_barplot/barplot.json"
write(json_data, json_file)