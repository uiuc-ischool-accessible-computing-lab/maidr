library(ggplot2)


# Add regression lines with geom_smooth
ggplot(iris, aes(x = Sepal.Length, y = Sepal.Width)) +
    geom_point() + 
    geom_smooth()

# Save the plot as an SVG file
path <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_scatterplot/scatterplot.svg"
ggsave(path, plot, device = "svg")


library(jsonlite)
# Convert data to JSON format
json_data <- toJSON(data)

# Save the JSON data to a file
json_file <- "C:/Users/kamat/OneDrive/Desktop/Work/UIUC/MAIDR/maidr/examples/ssk/ggplot/ggplot_lineplot/lineplot.json"
write(json_data, json_file)