# Load library
library(ggplot2)
library(gridSVG)
library(here)
library(dplyr)


# Load the dataset
path <- here(getwd(), "user_study_2", "boxplot", "mobile-phone-price-us.csv")
phone_data <- read.csv(path)

# Clean the dataset
colnames(phone_data)[colnames(phone_data) == "Price ($)"] <- "Price"
phone_data$Price <- gsub("\\$", "", phone_data$Price)
phone_data$Price <- gsub(",", "", phone_data$Price)
phone_data$Price <- as.numeric(phone_data$Price)
phone_data <- na.omit(phone_data)

# Create a box plot
boxplot <- ggplot(phone_data, aes(x = Price, y = Brand)) +
  geom_boxplot() +
  theme(axis.text.y = element_text(angle = 45, hjust = 1)) +
  labs(title = "Price Distribution by Brand",
       x = "Price ($)",
       y = "Brand",
       fill = "Brand")

# Draw the plot in R's current graphics device
print(boxplot)

# Export the current graphics device to SVG
output <- here(getwd(), "user_study_2", "boxplot", "phone_prices_boxplot_horizontal.svg")
grid.export(output)
