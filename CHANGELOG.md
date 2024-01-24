## [1.2.2](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.2.1...v1.2.2) (2024-01-24)


### Bug Fixes

* **heatmap:** Supported highlighting for rect cell ([#361](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/361)) ([903ff9a](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/903ff9a8c76fa084400f00097a94d62cd6d8f5d7))

## [1.2.1](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.2.0...v1.2.1) (2024-01-23)


### Bug Fixes

* **matplotlib:** Added support to lineplot svg with path tag ([491137a](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/491137a979b3c7735ccd80bdaf6fd8cb693c6865))

# [1.2.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.1.0...v1.2.0) (2024-01-18)


### Bug Fixes

* Supported heatmap svg with path tag ([#343](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/343)) ([a052849](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/a052849025c7598e28b7bc1fdeb27f3b5d581d1e))


### Features

* Added 'other' field to level of skill for LLM interaction ([#344](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/344)) ([05cb48f](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/05cb48f60c85ee04c13005033a663ed7455e7946)), closes [#341](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/341)

# [1.1.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.0.6...v1.1.0) (2024-01-09)

### Bug Fixes

* added json data to LLM first prompt ([#339](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/339)) ([176adc8](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/176adc8dfb2595a96b36a5ff0c4fe470c4773571)), closes [#334](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/334)
* LLM waiting beep always plays ([#338](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/338)) ([ee5491c](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/ee5491c1288e228a83f40326011ae315521c3624)), closes [#337](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/337)

### Features

* Integrated level of skill into initial LLM prompt, pulling from a user setting ([#340](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/340)) ([fc02b42](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/fc02b42390e35dcc33de61bae707c68959a8ca34))


# [1.0.6] - 2024-01-05

### Internal Chores

- Enforced Conventional Commits for commit messages (#327). This is a BREAKING CHANGE because any commit messages that do not follow the Conventional Commits format will not be accepted by the repository. Please see the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) website for more information.
- Added new sections and examples of how to use the Conventional Commits format to the CONTRIBUTING file (#327).

# [1.0.5] - 2024-01-05

### Added

- Added the ability to switch from assertive (default) to polite aria modes, in the help menu (#309).
- Added OpenAI GPT4-vision query system. Hit ? from the main chart to toggle on (#317).
- Added LLM suggestions system for users to be able to more easily click (#333).

### Chores

- Added instructions on how to take a screenshot in in GitHub bug report and pull request templates (#307).
- Commented out the instructions on GitHub templates so that users can keep it while adding new content (#308).
- Added lineplot, stacked bar, dodged bar, and normalized dodge bar info to the README (#310).
- Added Code of Conduct file in the project.

# [1.0.4] - 2023-11-30

### Added

- Added GitHub issue templates for bug report and feature request. [#297](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/297).
- Added some notes on manual testing.
- Added GitHub template for pull requests. [#298](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/298).

### Fixed

- Fixed broken link to the Acknowledgments section in README ([#300](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/300), thanks @sehilyi).
- Fixed typo in scatterplot.js. [#283](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/283).
- Fixed typo in task1_bar_plot.html, correct CSS file now called.
- Fixed initial position out of range. [#287](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/287).
- Fixed issue with sonification and highlight color in bar plots. [#299](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/299).

### Changed

- Updated documentation for all scripts.

# [1.0.0] - 2023-11-01

- Released in NPM.
