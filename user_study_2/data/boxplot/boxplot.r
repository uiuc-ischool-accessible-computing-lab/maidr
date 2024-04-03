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

selected_brands <- c("Apple", "Samsung", "Sony", "Google", "Huawei", "Oneplus", "Motorola")
filtered_phone_data <- phone_data[phone_data$Brand %in% selected_brands, ]

# Order the levels of the Brand factor based on the selected brands
filtered_phone_data$Brand <- factor(filtered_phone_data$Brand, levels = sort(selected_brands))


# Create a box plot
boxplot <- ggplot(filtered_phone_data, aes(x = Price, y = Brand)) +
  geom_boxplot() +
  theme(axis.text.y = element_text(angle = 45, hjust = 1)) +
  labs(
    title = "Phone Price Distribution by Brand in the US",
    caption = "Source: https://www.kaggle.com/datasets/rkiattisak/mobile-phone-price",
    x = "Price ($)",
    y = "Brand",
    fill = "Brand"
  )



# Export the current graphics device to SVG
output <- here(getwd(), "user_study_2", "boxplot", "phone_prices_boxplot_horizontal.svg")
grid.export(output)

# JY script below
library(tidyverse)
library(janitor)
library(skimr)
library(gt)
library(here)

# Set path
path <- here::here(getwd(), "user_study_2", "data", "boxplot", "mobile-phone-price-us.csv")

# Clean variable names
df <- read_csv(path) %>%
  clean_names()

# Filter data
clean_df <- df %>%
  filter(brand %in% c("Apple", "Samsung", "Sony", "Google", "Huawei", "Oneplus", "Motorola")) %>%
  select(brand, price) %>%
  mutate(price = as.numeric(gsub("[$,]", "", price))) %>%
  # remove missing values using pairwise deletion
  drop_na()

# Extrac boxplot stat values
clean_df %>%
  group_by(brand) %>%
  summarise(
    lower_outlier = paste0(boxplot.stats(price)$out[boxplot.stats(price)$out < boxplot.stats(price)$stats[[1]]], collapse = ", "),
    minimum = boxplot.stats(price)$stats[[1]],
    Q1 = boxplot.stats(price)$stats[[2]],
    median = boxplot.stats(price)$stats[[3]],
    Q3 = boxplot.stats(price)$stats[[4]],
    maximum = boxplot.stats(price)$stats[[5]],
    upper_outlier = paste0(boxplot.stats(price)$out[boxplot.stats(price)$out > boxplot.stats(price)$stats[[5]]], collapse = ", ")
  ) %>%
  gt()
