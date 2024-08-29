# Load the required libraries
library(ggplot2)
library(palmerpenguins)
library(svglite)

# Load the penguins dataset
data("penguins")
penguins <- na.omit(penguins)

# Create a ggplot
p <- ggplot(penguins, aes(x = bill_length_mm, y = bill_depth_mm)) +
  geom_point() +
  facet_grid(species ~ sex) +
  labs(
    title = "Penguin Bill Dimensions by Species and Sex",
    x = "Bill Length (mm)",
    y = "Bill Depth (mm)"
  ) +
  theme(
    plot.title = element_text(size = 16, hjust = 0.5),
    strip.text = element_text(size = 12),
    axis.title = element_text(size = 12)
  )

# Save the plot as an SVG file using ggsave and svglite
ggsave("multi_panel.svg", plot = p, device = svglite, width = 10, height = 8)

# Extract raw data used for plotting per panel
plot_data <- ggplot_build(p)$data[[1]]
# Split the data by panel
plot_data_split <- split(plot_data, plot_data$PANEL)

# Save each panel data as a separate data frame object
panel_data_list <- lapply(names(plot_data_split), function(panel) {
  panel_data <- plot_data_split[[panel]]
  assign(paste0("panel_data_", panel), panel_data, envir = .GlobalEnv)
  return(panel_data)
})

# Assign names to the list elements for easier reference
names(panel_data_list) <- names(plot_data_split)

# Load the required library for JSON
library(jsonlite)

# Save each panel data as a JSON file containing only x and y variables
lapply(names(panel_data_list), function(panel) {
  panel_data <- panel_data_list[[panel]][, c("x", "y")]
  json_file <- paste0("panel_data_", panel, ".json")
  write_json(panel_data, json_file)
})



# Extract the layout information to get the panel titles
layout_info <- ggplot_build(p)$layout$layout

# Create a data frame that maps panel numbers to species and sex
panel_mapping <- data.frame(
  PANEL = layout_info$PANEL,
  species = layout_info$species,
  sex = layout_info$sex
)

print(panel_mapping)
