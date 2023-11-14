# Load required packages
library(gridSVG)
library(svglite)
library(ggplot2)
library(gt)
library(tidymodels)
library(gapminder)



# Bar plot sample
svglite("svglite_bar.svg")
ggplot(diamonds, aes(cut)) +
  geom_bar() +
  labs(title = "The Number of Diamonds by Cut.", x = "Cut", y = "Count")

dev.off()

gridSVG::grid.export("barplot_labels.svg")
dev.off()

library(tidyverse)
library(gapminder)

gapminder %>%
  filter(year == 2007) %>%
  group_by(continent) %>%
  summarise(total_pop = sum(pop, rm.na = TRUE)) %>%
  ungroup() %>%
  ggplot(aes(x = continent, y = total_pop)) +
  geom_col() +
  scale_y_continuous(labels = scales::label_number_auto()) +
  labs(title = "The Total Population of Each Continent in 2007.", x = "Continent", y = "Total Population")

gridSVG::grid.export("barplot_user_study.svg")
dev.off()


gapminder %>%
  filter(year == 2007) %>%
  group_by(continent) %>%
  summarise(total_pop = sum(pop, rm.na = TRUE)) %>%
  ungroup() %>%
  jsonlite::write_json("barplot_user_study_raw_data.json")

# Box plot sample
svglite("tutorial_boxplot.svg")
ggplot(data = mpg, mapping = aes(y = class, x = hwy)) +
  geom_boxplot() +
  labs(title = "Highway Mileage by Car Class.", x = "Highway Mileage", y = "Car Class")

dev.off()

gridSVG::grid.export("boxplot_label.svg")
dev.off()


# Extrac boxplot stat values
mpg %>%
  group_by(class) %>%
  summarise(
    lower_outlier = paste0(boxplot.stats(hwy)$out[boxplot.stats(hwy)$out < boxplot.stats(hwy)$stats[[1]]], collapse = ", "),
    minimum = boxplot.stats(hwy)$stats[[1]],
    Q1 = boxplot.stats(hwy)$stats[[2]],
    median = boxplot.stats(hwy)$stats[[3]],
    Q3 = boxplot.stats(hwy)$stats[[4]],
    maximum = boxplot.stats(hwy)$stats[[5]],
    upper_outlier = paste0(boxplot.stats(hwy)$out[boxplot.stats(hwy)$out > boxplot.stats(hwy)$stats[[5]]], collapse = ", ")
  ) %>%
  jsonlite::write_json("boxplot_data.json")

# gt::gt() %>%
# gtsave("boxplot_data_frame.html")
left_boxside <- median - Q1
right_boxside <- Q3 - median


lower_whisker_length <- Q1 - minimum
upper_whisker_length <- maximum - Q3
range_vector <- c(lower_whisker_length, left_boxside, right_boxside, upper_whisker_length)
total_box_length <- sum(range_vector)
boxplot_ratio <- (range_vector / total_box_length) * 100
# Drop decimal point
boxplot_ratio <- round(boxplot_ratio, 0)




if (left_boxside == right_boxside) {
  box_brl <- "⠿⠸⠇⠿"
} else if (left_boxside < right_boxside) {
  relative_ratio <- round((right_boxside / left_boxside), 0)
  box_brl <- "⠿⠸⠇" + strrep("⠿", relative_ratio)
} else {
  relative_ratio <- round((left_boxside / right_boxside), 0)
  box_brl <- strrep("⠿", relative_ratio) + "⠸⠇⠿"
}

lower_whisker_length <- Q1 - min
upper_whisker_length <- max - Q3

if (lower_whisker_length == upper_whisker_length) {
  "⠒" + box_brl + "⠒"
} else if (lower_whisker_length < upper_whisker_length) {
  "⠒" + box_brl + "⠒⠒"
} else {
  "⠒⠒" + box_brl + "⠒"
}

g <- gapminder %>%
  ggplot(aes(x = lifeExp, y = continent)) +
  geom_boxplot() +
  labs(title = "Life Expectancy by Continent.", x = "Continent", y = "Life Expectancy")

g

gridSVG::grid.export("boxplot_user_study.svg")
dev.off()

layer_data(g, 1) %>%
  gt::gt()

# Extract boxplot raw data as a json format:
gapminder %>%
  group_by(continent) %>%
  summarise(
    lower_outlier = paste0(boxplot.stats(lifeExp)$out[boxplot.stats(lifeExp)$out < boxplot.stats(lifeExp)$stats[[1]]], collapse = ", "),
    minimum = boxplot.stats(lifeExp)$stats[[1]],
    Q1 = boxplot.stats(lifeExp)$stats[[2]],
    median = boxplot.stats(lifeExp)$stats[[3]],
    Q3 = boxplot.stats(lifeExp)$stats[[4]],
    maximum = boxplot.stats(lifeExp)$stats[[5]],
    upper_outlier = paste0(boxplot.stats(lifeExp)$out[boxplot.stats(lifeExp)$out > boxplot.stats(lifeExp)$stats[[5]]], collapse = ", ")
  ) %>%
  jsonlite::write_json("boxplot_user_study_raw_data.json")

# Scatter plot sample
svglite("tutorial_scatterplot.svg")
ggplot(data = mpg, mapping = aes(x = displ, y = hwy)) +
  # geom_point(position = "jitter") +
  geom_point() +
  geom_smooth(method = "loess", se = FALSE) +
  labs(title = "Highway Mileage by Engine Displacement.", x = "Engine Displacement", y = "Highway Mileage")

dev.off()

# Save ggplot data to json
library(tidyverse)
library(tidymodels)

# Best Line
g <- ggplot(data = mpg, mapping = aes(x = displ, y = hwy)) +
  geom_point() +
  geom_smooth(method = "loess", se = FALSE)

point_layer <- layer_data(g, 1) %>%
  select(x, y)


smooth_layer <- layer_data(g, 2) %>%
  select(x, y)


point_layer %>%
  jsonlite::write_json("point_layer.json")

smooth_layer %>%
  jsonlite::write_json("smooth_layer.json")


gridSVG::grid.export("scatterplot_label.svg")
dev.off()





library(tidymodels)
lm_fit <- linear_reg() %>%
  set_engine("lm") %>%
  fit(hwy ~ displ, data = mpg)

fit_tidy <- tidy(lm_fit$fit)

fit_tidy %>%
  gt()

# Need to learn how sonify package draw a smoothed line
prediction <- augment(lm_fit$fit)$.fitted

resid <- augment(lm_fit$fit)$.resid

jsonlite::toJSON(prediction) %>%
  jsonlite::write_json("prediction_array.json")


jsonlite::toJSON(resid) %>%
  jsonlite::write_json("residual_array.json")


lm_df <- augment(lm_fit$fit)

lm_df %>%
  ggplot(aes(x = .resid)) +
  geom_histogram()


gridSVG::grid.export("histogram_for_residual.svg")
dev.off()


# Residual = actual y value - predicted y

gridSVG::grid.export("scatterplot.svg")
dev.off()


# Heat map sample
## More example: https://r-charts.com/correlation/heat-map-ggplot2/
library(palmerpenguins)
library(dplyr)

penguins %>%
  count(island, species, sort = TRUE) %>%
  ggplot(aes(x = island, y = species, fill = n)) +
  geom_tile(color = "black") +
  scale_fill_gradient(low = "#56B1F7", high = "#132B43") +
  coord_fixed() +
  labs(title = "Penguin Species by Island", x = "Island", y = "Species", fill = "Count")

gridSVG::grid.export("heatmap_label.svg")
dev.off()


# heat map for user study
df <- gapminder %>%
  filter(year >= 1987) %>%
  group_by(year, continent) %>%
  summarise(mean_gdp = round(mean(gdpPercap, rm.na = TRUE), digits = 2)) %>%
  ungroup() %>%
  mutate(year = factor(year))

svglite("task_heatmap.svg")
df %>%
  ggplot(aes(x = year, y = continent, fill = mean_gdp)) +
  scale_fill_gradient(low = "#56B1F7", high = "#132B43") +
  geom_tile(color = "black") +
  coord_fixed() +
  labs(title = "Average GDP per Continent by Year.", x = "Year", y = "Continent", fill = "Average GDP")

dev.off()

gridSVG::grid.export("heatmap_user_study.svg")
dev.off()

# Scatterplot for user study

g <- gapminder %>%
  filter(year == 2007 & continent == "Europe") %>%
  ggplot(aes(x = gdpPercap, y = lifeExp)) +
  geom_point() +
  geom_smooth(method = "loess", se = FALSE) +
  scale_x_log10(labels = scales::comma) +
  labs(title = "The Relationship between GDP and Life Expectancy of European Countries in 2007.", x = "GDP (log10 transformed)", y = "Life Expectancy")

g

gridSVG::grid.export("scatterplot_user_study.svg")
dev.off()

point_layer <- layer_data(g, 1) %>%
  select(x, y)

# Yu Jun said the above did not work so I am extracting from the original data directly:
gapminder %>%
  filter(year == 2007 & continent == "Europe") %>%
  select(gdpPercap, lifeExp) %>%
  # mutate(gdpPercap = log10(gdpPercap)) %>%
  rename(x = gdpPercap, y = lifeExp) %>%
  jsonlite::write_json("new_scatterplot_user_study_point_layer.json")

smooth_layer <- layer_data(g, 2) %>%
  select(x, y)


point_layer %>%
  jsonlite::write_json("scatterplot_user_study_point_layer.json")

smooth_layer %>%
  jsonlite::write_json("scatterplot_user_study_smooth_layer.json")


# Histogram
## Tutorial
# Create a histogram from mpg data
g <- ggplot(data = mpg, mapping = aes(x = displ)) +
  geom_histogram(bins = 20) +
  labs(title = "Distribution of Engine Displacement", x = "Displacement", y = "Count")

g

gridSVG::grid.export("histogram_tutorial.svg")
dev.off()

layer_data(g, 1) %>%
  jsonlite::write_json("histogram_tutorial_raw_data.json")


# Create histogram from gampminder package
g <- gapminder %>%
  filter(year == 2007) %>%
  ggplot(aes(x = lifeExp)) +
  geom_histogram(bins = 20) +
  labs(title = "Distribution of Life Expectancy in 2007", x = "Life Expectancy", y = "Count")

g

gridSVG::grid.export("histogram_user_study.svg")
dev.off()

layer_data(g, 1) %>%
  jsonlite::write_json("histogram_user_study_raw_data.json")


# Lineplot
## Tutorial
### Create a lineplot from gapminder data
g <- gapminder %>%
  filter(continent == "Europe") %>%
  ggplot(aes(x = year, y = lifeExp)) +
  geom_line() +
  labs(title = "Life Expectancy in Europe", x = "Year", y = "Life Expectancy")

g

gridSVG::grid.export("lineplot_user_study.svg")
dev.off()

layer_data(g, 1) %>%
  jsonlite::write_json("lineplot_user_study_raw_data.json")

# Stacked bar plot
library(tidyverse)


# create segmented bar plot
svglite::svglite("stacked_normalized_bar.svg")

g <- ggplot(mpg, aes(x = class, fill = drv)) +
  geom_bar(position = "fill") +
  labs(
    title = "Bar Plot", x = "Class", y = "Count", fill = "Drive",
    subtitle = "Segmented bar plot of the number of cars in each class by drive type", caption = "Source: mpg dataset from ggplot2 package"
  )

# Extract data
layer_data(g, 1) %>%
  gt::gt()

dev.off()

jsonlite::write_json("stacked_bar_raw_data.json")
BrailleR::VI(g)
g

mpg %>%
  count(class, drv) %>%
  rename(x = class, fill = drv, y = n) %>%
  # gt::gt()
  # Save it ss a json file
  jsonlite::write_json("stacked_bar_raw_data.json")
