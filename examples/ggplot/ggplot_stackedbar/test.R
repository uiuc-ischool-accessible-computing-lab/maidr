library(ggplot2)

# Generate random data
set.seed(123)
data <- data.frame(x = LETTERS[1:10], y1 = runif(10), y2 = runif(10), y3 = runif(10))

# Create stacked barplot using ggplot2
plot <- ggplot(data, aes(x = x)) +
  geom_bar(aes(y = y1), stat = "identity", fill = "blue") +
  geom_bar(aes(y = y2), stat = "identity", fill = "green") +
  geom_bar(aes(y = y3), stat = "identity", fill = "red") +
  labs(title = "Stacked Barplot")

# Save the plot as an SVG file
path<- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_stackedbar/stackedbar.svg"
ggsave(path, plot, device = "svg")

library(jsonlite)
# Convert data to JSON format
json_data <- toJSON(data)

# Save the JSON data to a file
json_file <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_stackedbar/stackedbar.json"
write(json_data, json_file)