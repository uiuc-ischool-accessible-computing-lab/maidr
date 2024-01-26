library(ggplot2)
library(jsonlite)
# Generate random values
set.seed(123)
values <- rnorm(1000)

# Create histogram using ggplot
ggplot(data = data.frame(values), aes(x = values)) +
  geom_histogram(binwidth = 0.5, fill = "steelblue", color = "white") +
  labs(title = "Histogram of Random Values", x = "Values", y = "Frequency")

# Save plot as svg
path <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_histogram/histogram.svg"
ggsave(path, width = 5, height = 4, units = "in")

# Save the JSON data to a file
json_file <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_histogram/histogram.json"
write(json_data, json_file)