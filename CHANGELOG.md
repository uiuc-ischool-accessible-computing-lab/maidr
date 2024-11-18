# [2.21.0](https://github.com/xability/maidr/compare/v2.20.0...v2.21.0) (2024-10-24)


### Features

* add an instruction on how to activate maidr plot ([98237b4](https://github.com/xability/maidr/commit/98237b443caa4871bceb32079c45f436b25c9dc3))

# [2.20.0](https://github.com/xability/maidr/compare/v2.19.1...v2.20.0) (2024-10-23)


### Features

* provide alt text for maidr plot before init ([#586](https://github.com/xability/maidr/issues/586)) ([749f262](https://github.com/xability/maidr/commit/749f26269d594d376225c6e35af156295bf7ad35))

## [2.19.1](https://github.com/xability/maidr/compare/v2.19.0...v2.19.1) (2024-10-17)


### Bug Fixes

* address failure in release action ([#583](https://github.com/xability/maidr/issues/583)) ([64b90f4](https://github.com/xability/maidr/commit/64b90f469e118001583a6e65f2e02533ec48678e))
* address failure in release action ([#584](https://github.com/xability/maidr/issues/584)) ([992a18a](https://github.com/xability/maidr/commit/992a18a959cdf087516127bf315cfafd217789d0))
* barplot autoplay left ([#582](https://github.com/xability/maidr/issues/582)) ([749da16](https://github.com/xability/maidr/commit/749da1674b233a3d99b24b31218e2c221b721000))
* include retry logic for semantic-release job ([#577](https://github.com/xability/maidr/issues/577)) ([5c67114](https://github.com/xability/maidr/commit/5c6711465f90e3a18fde5e7ec6e8d24eac778a8f))
* update semantic-release job to utilize bash instead of js ([#585](https://github.com/xability/maidr/issues/585)) ([89ce7db](https://github.com/xability/maidr/commit/89ce7db17da912820e1e0d17f708dde7f67a5c43))

# [2.19.0](https://github.com/xability/maidr/compare/v2.18.0...v2.19.0) (2024-10-16)


### Bug Fixes

* prevent autocomplete for review input ([#579](https://github.com/xability/maidr/issues/579)) ([4742cb4](https://github.com/xability/maidr/commit/4742cb453781e537e6da75abf4a6cab527b3c280))
* replaying current point with Space doesn't work on histogram ([d0c565a](https://github.com/xability/maidr/commit/d0c565af3072d7216a278ead282621f618c51a98))


### Features

* scale autoplay rate to chart size, expose var AUTOPLAY_RATE to users ([#580](https://github.com/xability/maidr/issues/580)) ([ebb19a9](https://github.com/xability/maidr/commit/ebb19a9e3df4d8953593abfa81fa1a88787e1237))

# [2.18.0](https://github.com/xability/maidr/compare/v2.17.3...v2.18.0) (2024-10-12)


### Bug Fixes

* **help:** add a missing keybinding for the autoplay speed reset ([8c3fadf](https://github.com/xability/maidr/commit/8c3fadff2f96b98fe5c0b1b07ac2cf5600cb40bd))


### Features

* add alt-text for maidr plot ([#568](https://github.com/xability/maidr/issues/568)) ([7752123](https://github.com/xability/maidr/commit/7752123dc16390acd4af2c4dc93e7a094b4bad9d))

## [2.17.3](https://github.com/xability/maidr/compare/v2.17.2...v2.17.3) (2024-10-08)


### Bug Fixes

* selection change no longer calls itself and gets stuck in an infinite loop, messing up audio and more while in braille mode ([#572](https://github.com/xability/maidr/issues/572)) ([ade8fdb](https://github.com/xability/maidr/commit/ade8fdb9ebbc8676e270954bca5d0ba0fc6899f2))

## [2.17.2](https://github.com/xability/maidr/compare/v2.17.1...v2.17.2) (2024-10-01)


### Bug Fixes

* replaying current point with Space doesn't work on histogram ([#570](https://github.com/xability/maidr/issues/570)) ([f4bf11f](https://github.com/xability/maidr/commit/f4bf11f21326166059397e4332a4353af356e850))

## [2.17.1](https://github.com/xability/maidr/compare/v2.17.0...v2.17.1) (2024-09-30)


### Bug Fixes

* don't repeat last point when you try to move past it ([#569](https://github.com/xability/maidr/issues/569)) ([041d752](https://github.com/xability/maidr/commit/041d7522008f818f026341fb691aa67170269562))

# [2.17.0](https://github.com/xability/maidr/compare/v2.16.1...v2.17.0) (2024-09-25)


### Features

* allow shift select, select all, copy, in review mode ([#564](https://github.com/xability/maidr/issues/564)) ([2a839f3](https://github.com/xability/maidr/commit/2a839f3a21cd2498d1af6a8dc52598b0a0cab518))

## [2.16.1](https://github.com/xability/maidr/compare/v2.16.0...v2.16.1) (2024-09-21)


### Bug Fixes

* address an issue where label keybindings are not included in Help menu ([#563](https://github.com/xability/maidr/issues/563)) ([102733f](https://github.com/xability/maidr/commit/102733fbb45631442d38518ad65d53c86f0f512a))
* enable aria live announcement of name or title on load ([#557](https://github.com/xability/maidr/issues/557)) ([6553aa8](https://github.com/xability/maidr/commit/6553aa87108080bd7595d8c570077a7aa093ede1))

# [2.16.0](https://github.com/xability/maidr/compare/v2.15.1...v2.16.0) (2024-09-19)


### Features

* support cursor within Review mode ([#553](https://github.com/xability/maidr/issues/553)) ([64f362d](https://github.com/xability/maidr/commit/64f362d150390afcf757fa72967a7e0d395c8301))

## [2.15.1](https://github.com/xability/maidr/compare/v2.15.0...v2.15.1) (2024-09-18)


### Bug Fixes

* autoplay on line plots ([#551](https://github.com/xability/maidr/issues/551)) ([7b6ac3e](https://github.com/xability/maidr/commit/7b6ac3e657fcf02d3749c91399ff2a0de021086f))
* autoplay on scatter and line plots ([#552](https://github.com/xability/maidr/issues/552)) ([49de1e3](https://github.com/xability/maidr/commit/49de1e35c9261e611997757426103991e828d59f))

# [2.15.0](https://github.com/xability/maidr/compare/v2.14.8...v2.15.0) (2024-09-14)


### Features

* **llm:** update OpenAI model to gpt-4o-2024-08-06 ([e97c81f](https://github.com/xability/maidr/commit/e97c81ff20cb901df9fdb362a77f404f2de23377))

## [2.14.8](https://github.com/xability/maidr/compare/v2.14.7...v2.14.8) (2024-08-30)


### Bug Fixes

* update current active element's highlight color or fill on color change ([#538](https://github.com/xability/maidr/issues/538)) ([d001287](https://github.com/xability/maidr/commit/d00128715d52d2deab1b2a3d95c4bfc76cf731b0))

## [2.14.7](https://github.com/xability/maidr/compare/v2.14.6...v2.14.7) (2024-08-29)


### Bug Fixes

* **ci:** rectify formatting in affected file for build workflow ([#536](https://github.com/xability/maidr/issues/536)) ([03ed380](https://github.com/xability/maidr/commit/03ed3807e002ca64873eada3daf99f7968bcd648))
* **heatmap:** kill visual selector and autoplay post maidr teardown ([#534](https://github.com/xability/maidr/issues/534)) ([17c286d](https://github.com/xability/maidr/commit/17c286df25aaa2652ee2c32270321c0ec9ea3e66))

## [2.14.6](https://github.com/xability/maidr/compare/v2.14.5...v2.14.6) (2024-08-28)


### Bug Fixes

* cease autoplay when maidr is deactivated (outside the plot) ([#526](https://github.com/xability/maidr/issues/526)) ([dd564ec](https://github.com/xability/maidr/commit/dd564ecdf147536a9354ee1fda019bbb7fb1b043))

## [2.14.5](https://github.com/xability/maidr/compare/v2.14.4...v2.14.5) (2024-08-25)


### Bug Fixes

* **lineplot:** destroy highlight and cease autoplay if active on lineplot ([#530](https://github.com/xability/maidr/issues/530)) ([c65ef3c](https://github.com/xability/maidr/commit/c65ef3c407b1ecc8bf59c91108182e68f0d45045))

## [2.14.4](https://github.com/xability/maidr/compare/v2.14.3...v2.14.4) (2024-08-24)


### Bug Fixes

* **scatterplot:** destroy highlight and cease autoplay if active on scatterplot ([#528](https://github.com/xability/maidr/issues/528)) ([5b8d3e2](https://github.com/xability/maidr/commit/5b8d3e28922cf07353d5b928e184227d33f1f998))

## [2.14.3](https://github.com/xability/maidr/compare/v2.14.2...v2.14.3) (2024-08-23)


### Bug Fixes

* destroy chatLLM dialog when maidr is deactivated ([#525](https://github.com/xability/maidr/issues/525)) ([6b705d8](https://github.com/xability/maidr/commit/6b705d8852c09fc398f4b1bcb028364bae0ebdd3))

## [2.14.2](https://github.com/xability/maidr/compare/v2.14.1...v2.14.2) (2024-08-11)


### Bug Fixes

* add lx and ly for stacked plots ([fe6db71](https://github.com/xability/maidr/commit/fe6db7113bf9d740854518151468d95866fcca67))
* use level instead of y label in verbose mode for stacked bar ([#517](https://github.com/xability/maidr/issues/517)) ([1363d5c](https://github.com/xability/maidr/commit/1363d5cc8245aa440fe2e477775865e541285dcd)), closes [#515](https://github.com/xability/maidr/issues/515)

## [2.14.1](https://github.com/xability/maidr/compare/v2.14.0...v2.14.1) (2024-07-30)


### Bug Fixes

* disabled tracking while it's getting fixed ([#512](https://github.com/xability/maidr/issues/512)) ([cf5dbc5](https://github.com/xability/maidr/commit/cf5dbc5bb0d6910992c2f22089171b0b981b19de)), closes [#508](https://github.com/xability/maidr/issues/508) [#486](https://github.com/xability/maidr/issues/486)

# [2.14.0](https://github.com/xability/maidr/compare/v2.13.0...v2.14.0) (2024-07-18)


### Features

* add cursor routing; the ability to click braille keys to move position on all charts ([#509](https://github.com/xability/maidr/issues/509)) ([5c42ef9](https://github.com/xability/maidr/commit/5c42ef93cff6e39a31c3b4110c44b855ef69f954))

# [2.13.0](https://github.com/xability/maidr/compare/v2.12.0...v2.13.0) (2024-06-20)


### Bug Fixes

* fix prefix mode for x and y for histogram ([#505](https://github.com/xability/maidr/issues/505)) ([9acc5fa](https://github.com/xability/maidr/commit/9acc5fa90d87a6490c79b18b1d419e6f68255dee)), closes [#502](https://github.com/xability/maidr/issues/502)


### Features

* proper documentation part 1: all classes and functions in constants.js ([#504](https://github.com/xability/maidr/issues/504)) ([c32f43b](https://github.com/xability/maidr/commit/c32f43b9ed90bd2fb35deb0ff4fff58a59fad380))

# [2.12.0](https://github.com/xability/maidr/compare/v2.11.0...v2.12.0) (2024-06-17)


### Features

* add cursor routing functionality in beta mode, just for barplots ([#503](https://github.com/xability/maidr/issues/503)) ([719c684](https://github.com/xability/maidr/commit/719c68451c2df3602169e8f6b256a2d535156af0))

# [2.11.0](https://github.com/xability/maidr/compare/v2.10.0...v2.11.0) (2024-04-18)


### Bug Fixes

* LLM window now resizes and scrolls properly as content updates ([#484](https://github.com/xability/maidr/issues/484)) ([ad9d6f6](https://github.com/xability/maidr/commit/ad9d6f66cef0ced6a8a2c2b1bf37f2c8e32b024d)), closes [#464](https://github.com/xability/maidr/issues/464)


### Features

* added 'done' tone to incoming LLM message ([#483](https://github.com/xability/maidr/issues/483)) ([4465ede](https://github.com/xability/maidr/commit/4465ede7a951cb1f6bfd7ae0ddc45ecfa547ca92)), closes [#473](https://github.com/xability/maidr/issues/473)

# [2.10.0](https://github.com/xability/maidr/compare/v2.9.2...v2.10.0) (2024-04-12)


### Bug Fixes

* graceful failure when no API key is provided ([#481](https://github.com/xability/maidr/issues/481)) ([8c3dcb1](https://github.com/xability/maidr/commit/8c3dcb17b0e486fbe3fb97b80065fc4984c46693))
* hotfix for syntax level error ([#477](https://github.com/xability/maidr/issues/477)) ([6647c5a](https://github.com/xability/maidr/commit/6647c5afc0ecac72a2d99c36719cc5c171622346))
* hotfix: update error handling to fail gracefully ([#479](https://github.com/xability/maidr/issues/479)) ([116c643](https://github.com/xability/maidr/commit/116c6435eb9de30aae7178dc2a3a72a74293ed1e))
* update tracker for new boxplot data structure ([#482](https://github.com/xability/maidr/issues/482)) ([44e10ae](https://github.com/xability/maidr/commit/44e10ae17939998c4d059e5b0a06072c727e37d3)), closes [#478](https://github.com/xability/maidr/issues/478)


### Features

* more button removed ([#471](https://github.com/xability/maidr/issues/471)) ([6d68773](https://github.com/xability/maidr/commit/6d687732c5591af5ea58276e7a9bb503f2729b7a))
* update labels in help menu for LLM settings ([#476](https://github.com/xability/maidr/issues/476)) ([a052b95](https://github.com/xability/maidr/commit/a052b95737c59cfddfa8d66300dd3a97bf0dbd30)), closes [#474](https://github.com/xability/maidr/issues/474)

## [2.9.2](https://github.com/xability/maidr/compare/v2.9.1...v2.9.2) (2024-04-04)


### Bug Fixes

* gen ai keybinding and log tracker downloading ([#460](https://github.com/xability/maidr/issues/460)) ([c83fd01](https://github.com/xability/maidr/commit/c83fd01f82d170022c42cc5e0be6b24652938b33))
* LLM now properly reset on any setting change ([#465](https://github.com/xability/maidr/issues/465)) ([719be1e](https://github.com/xability/maidr/commit/719be1ebb37b884c119a5f70f0ceac61e15f5444))
* tracker collects on every LLM response and setting save ([#468](https://github.com/xability/maidr/issues/468)) ([fef42dc](https://github.com/xability/maidr/commit/fef42dc5f3c98c81e805352aff45f3e2a2bd3f36)), closes [#461](https://github.com/xability/maidr/issues/461)

## [2.9.1](https://github.com/xability/maidr/compare/v2.9.0...v2.9.1) (2024-04-03)


### Bug Fixes

* update LLM shortcuts to work on Macs better ([#458](https://github.com/xability/maidr/issues/458)) ([d0f697d](https://github.com/xability/maidr/commit/d0f697d2c818355a053d97409b269ccbafd0e24b)), closes [#457](https://github.com/xability/maidr/issues/457)

# [2.9.0](https://github.com/xability/maidr/compare/v2.8.0...v2.9.0) (2024-04-01)


### Features

* copy shortcuts: Shift Ctrl C for copy last, Shift Ctrl A for copy all ([#454](https://github.com/xability/maidr/issues/454)) ([486076c](https://github.com/xability/maidr/commit/486076c5798204efdd7f6f9720f40c1de1da9874))

# [2.8.0](https://github.com/xability/maidr/compare/v2.7.1...v2.8.0) (2024-03-31)


### Features

* add fill to L + X info ([#453](https://github.com/xability/maidr/issues/453)) ([8353341](https://github.com/xability/maidr/commit/835334155d1fb59ce678a1a6c8a0bfdc5738e159)), closes [#431](https://github.com/xability/maidr/issues/431)
* LLM is informed of user position, updated every time you open the chat window ([#452](https://github.com/xability/maidr/issues/452)) ([f159bf8](https://github.com/xability/maidr/commit/f159bf8741b52572e5a93beec6e52086d45df9fd)), closes [#421](https://github.com/xability/maidr/issues/421)

## [2.7.1](https://github.com/xability/maidr/compare/v2.7.0...v2.7.1) (2024-03-29)


### Bug Fixes

* tracker updated for refactored code from the past year ([#451](https://github.com/xability/maidr/issues/451)) ([a221eb6](https://github.com/xability/maidr/commit/a221eb60a0800de98a8b2feaa68a3245b4681f84)), closes [#449](https://github.com/xability/maidr/issues/449)

# [2.7.0](https://github.com/xability/maidr/compare/v2.6.0...v2.7.0) (2024-03-28)


### Bug Fixes

* LLM doesn't fail if not autostarted ([#447](https://github.com/xability/maidr/issues/447)) ([419e034](https://github.com/xability/maidr/commit/419e0341b4b3445a7913fae3aff12a7dab773696))
* move LLM settings note to below the Save button ([#446](https://github.com/xability/maidr/issues/446)) ([f84f921](https://github.com/xability/maidr/commit/f84f921645e1d19fc2c07687f19bf59f8962578e)), closes [#437](https://github.com/xability/maidr/issues/437)


### Features

* user study tracker updates with LLM chat history on every LLM response ([#448](https://github.com/xability/maidr/issues/448)) ([0afb864](https://github.com/xability/maidr/commit/0afb86442ffc7ee7b8e660aee4ecfc6640c723df)), closes [#440](https://github.com/xability/maidr/issues/440)

# [2.6.0](https://github.com/xability/maidr/compare/v2.5.2...v2.6.0) (2024-03-27)


### Features

* copy correct LLM message updated to use markdown, skip the Copy button, and have shortcut Alt Shift C ([#444](https://github.com/xability/maidr/issues/444)) ([c978513](https://github.com/xability/maidr/commit/c97851343af16aeb9afc8c8b4da97ae9de64d11b)), closes [#432](https://github.com/xability/maidr/issues/432) [#438](https://github.com/xability/maidr/issues/438) [#439](https://github.com/xability/maidr/issues/439)

## [2.5.2](https://github.com/xability/maidr/compare/v2.5.1...v2.5.2) (2024-03-26)


### Bug Fixes

* **boxplot:** update highlighter to bound with same whisker ([#443](https://github.com/xability/maidr/issues/443)) ([6626086](https://github.com/xability/maidr/commit/6626086f17a7a21ba146f0c475c005850234c5ab))

## [2.5.1](https://github.com/xability/maidr/compare/v2.5.0...v2.5.1) (2024-03-21)


### Bug Fixes

* **lineplot:** support graceful failure ([#430](https://github.com/xability/maidr/issues/430)) ([1f117c3](https://github.com/xability/maidr/commit/1f117c363909d18f12812602af181856e472736e))

# [2.5.0](https://github.com/xability/maidr/compare/v2.4.0...v2.5.0) (2024-03-20)


### Features

* LLM now starts behind the scenes on chart load, with a user setting to toggle the feature ([#435](https://github.com/xability/maidr/issues/435)) ([8bb0392](https://github.com/xability/maidr/commit/8bb0392b646fe1f8465abd3a8873d8c2f44eb622)), closes [#425](https://github.com/xability/maidr/issues/425)

# [2.4.0](https://github.com/xability/maidr/compare/v2.3.1...v2.4.0) (2024-03-07)


### Features

* add copy buttons to chat history window ([#426](https://github.com/xability/maidr/issues/426)) ([2bc0fb8](https://github.com/xability/maidr/commit/2bc0fb8080804818723920cadbe0435154b46b87)), closes [#424](https://github.com/xability/maidr/issues/424)
* add notification to settings that will reset LLM chat history ([#428](https://github.com/xability/maidr/issues/428)) ([01f42d0](https://github.com/xability/maidr/commit/01f42d03f0109f6f5af5e6ae726c1a331c4050c7)), closes [#420](https://github.com/xability/maidr/issues/420)
* don't close chat window on reset ([#427](https://github.com/xability/maidr/issues/427)) ([2a3d6af](https://github.com/xability/maidr/commit/2a3d6aff06825f1e78d856d4ecdfa2a157b11848)), closes [#422](https://github.com/xability/maidr/issues/422)

## [2.3.1](https://github.com/xability/maidr/compare/v2.3.0...v2.3.1) (2024-03-05)


### Bug Fixes

* **boxplot:** correct issues where min, max, outlier values are displayed as NULL ([4dce171](https://github.com/xability/maidr/commit/4dce1713e497cc7ac52bd5ad9fafe3a758f57f93))

# [2.3.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v2.2.0...v2.3.0) (2024-02-29)


### Features

* add heading levels to multi ai responses for better AT navigation ([#418](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/418)) ([4223529](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/4223529651b64b2ba409c4835a50779b5bf65528)), closes [#414](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/414)

# [2.2.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v2.1.1...v2.2.0) (2024-02-28)


### Bug Fixes

* more chat suggestoins button now hidden properly, including from AT ([#417](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/417)) ([1ad5193](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/1ad5193475cc9ddd6f7fb50ae25cf4f9ff21ae38)), closes [#412](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/412)


### Features

* add reset button to chat window, and auto reset on major LLM setting changes (model, skill level) ([#415](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/415)) ([de21e07](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/de21e07ee342f84e82c64078cda04366514726bc)), closes [#413](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/413)

## [2.1.1](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v2.1.0...v2.1.1) (2024-02-22)


### Bug Fixes

* **heatmap:** support graceful failure in braille mode ([#409](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/409)) ([93e12d2](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/93e12d27aa9c874f79fcaa077bb6eef1ff9b9ac1)), closes [#408](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/408)

# [2.1.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v2.0.1...v2.1.0) (2024-02-21)


### Features

* add level based LLM suggestions ([#407](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/407)) ([e234566](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/e23456623c923a3df2ddebd8ae7520e82f3fabf6)), closes [#405](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/405)

## [2.0.1](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v2.0.0...v2.0.1) (2024-02-17)


### Bug Fixes

* **scatterplot:** support svg from matplotlib ([#406](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/406)) ([6069056](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/6069056552ddc5a7f1ffff4c8d2e5a0500430114)), closes [#400](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/400)

# [2.0.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.5.0...v2.0.0) (2024-02-15)


### Bug Fixes

* add tabindex attribute to maidrElemn element ([#403](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/403)) ([f51b917](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/f51b9175dee386d82c33dea3b251e4278bc88724))


### Features

* Created ability to chat with multiple LLMs at once ([#402](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/402)) ([80aa119](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/80aa1193315430b2472ad210266b4360f7f3dc36)), closes [#388](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/388)


### BREAKING CHANGES

* Changed the way data was stored in the menu, first time
you run you'll need to update LLM settings

# [1.5.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.4.1...v1.5.0) (2024-02-14)


### Features

* add user preferences to accompany initial prompt for LLM ([#401](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/401)) ([8783b82](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/8783b82b314529413ea75de745797c7cf4e1aa7a)), closes [#396](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/396)

## [1.4.1](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.4.0...v1.4.1) (2024-02-08)


### Bug Fixes

* support lack of plot legend in verbose text output ([#395](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/395)) ([a8e92c5](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/a8e92c58a264636afe20fd57c7bed6741660f7db)), closes [#217](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/217)

# [1.4.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.3.2...v1.4.0) (2024-02-07)


### Bug Fixes

* Gracefull failure now possible when main data (json schema) lacks elements or selector or both, on all chart types ([#375](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/375)) ([ea26e5b](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/ea26e5b3f224b3e63ae0cdb0cf1855510e10ad87))
* Replaced elements with selector in documentation and examples to conform to the latest maidr json schema spec ([#372](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/372)) ([8a39dd5](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/8a39dd5770cc522c446fa4715358952c61e7566a))


### Features

* add delete buttons for LLM auth keys ([#394](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/394)) ([deffa5a](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/deffa5a8bd8cc85555738f748fb462853de39821)), closes [#378](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/378)
* change LLM modal controls to toggle open/close for easier review ([#393](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/393)) ([63e52b4](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/63e52b4cbd5203a169b87c0bb47495dae0bfe484)), closes [#379](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/379)

## [1.3.2](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.3.1...v1.3.2) (2024-02-02)


### Bug Fixes

* support histogram svg with path tag ([#383](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/383)) ([e47062e](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/e47062e838dc3641cfc6884a53fdeda16ffa5595)), closes [#380](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/380) [#382](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/382)

## [1.3.1](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.3.0...v1.3.1) (2024-02-01)


### Bug Fixes

* change 'other' skill level field under LLM/AI in settings to be more intuitive ([#377](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/377)) ([11d4bab](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/11d4bab0e6553f4ba52c28fc4d5ea9a5682912f4))

# [1.3.0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/compare/v1.2.2...v1.3.0) (2024-01-25)


### Bug Fixes

* Added fill label in heatmap tutorial ([#362](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/362)) ([3509be0](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/3509be023f6b2f0a6d3ebe6923dbbb0ea7fd3914))
* Made heatmap x, y coordinate regex more robust ([#364](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/364)) ([4fe9e38](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/4fe9e385e5a0854854d729fa6cbd49da0b39bd72))


### Features

* Added Gemini as an option for users, including a menu setting to switch and set auth key ([#365](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/365)) ([cd5da87](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/commit/cd5da87442a0eb4aa4889701ca1bf8e5b8f8d9f5)), closes [#341](https://github.com/uiuc-ischool-accessible-computing-lab/maidr/issues/341)

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
