# Load the necessary libraries
library(ggplot2)
library(gridSVG)
library(here)
library(jsonlite)

# Read the dataset from the CSV file
path <- here("..", "dataset", "mobile-os-share-us.csv")
market_share_data <- read.csv(path)

market_share_data$Date <- as.Date(as.character(market_share_data$Date), format = "%Y")

# We can use ggplot2 to create the line plot.
ios_market_share_plot <- ggplot(market_share_data, aes(x = Date, y = iOS)) +
  geom_line() + # This adds the line to the plot
  geom_point() + # This adds points to each data point on the line
  scale_x_date(date_labels = "%Y", date_breaks = "1 year") + # This formats the x-axis labels as years and sets the breaks
  labs(title = "iOS Market Share Over Time", x = "Year", y = "Market Share (%)") +
  theme_minimal() # This sets a minimal theme for the plot

# Draw the plot in an off-screen graphics device
print(ios_market_share_plot)

# Export the plot to SVG
grid.export("ios_market_share.svg")

# Extract the year from the Date column (assuming it's in 'YYYY' format as a string)
market_share_data$Date <- format(as.Date(market_share_data$Date, format="%Y"), "%Y")
# Construct the JSON structure
json_data <- list(
  type = "line",
  id = "line",
  title = "",
  axes = list(
    x = list(label = ""),
    y = list(label = "")
  ),
  data = lapply(seq_len(nrow(market_share_data)), function(i) {
    list(x = market_share_data$Date[i], y = market_share_data$`iOS`[i])
  })
)

# Convert the list to JSON
json_plot_data <- toJSON(json_data, pretty = TRUE, auto_unbox = TRUE)

# Print the JSON data
cat(json_plot_data)