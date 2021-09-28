# [@adrian.insua/ngredux-form-v1.0.1](https://github.com/AdrianInsua/platform/compare/@adrian.insua/ngredux-form-v1.0.0...@adrian.insua/ngredux-form-v1.0.1) (2021-09-28)


### Bug Fixes

* fix dist routes ([#1](https://github.com/AdrianInsua/platform/issues/1)) ([c072d97](https://github.com/AdrianInsua/platform/commit/c072d97891835c717c8279acd5f66d1b4a405107))

# @adrian.insua/ngredux-form-v1.0.0 (2021-09-28)


### Bug Fixes

* add typescript unused checks ([#32](https://github.com/AdrianInsua/platform/issues/32)) ([65c4229](https://github.com/AdrianInsua/platform/commit/65c4229313eda49fec3b5da187ae010cc32b3eaa))
* change package names to be user scoped ([c0c9d1d](https://github.com/AdrianInsua/platform/commit/c0c9d1d87bc40078c5da8dd5c3ab2ffab1ccc54a))
* fix eslint ([ab4d1d3](https://github.com/AdrianInsua/platform/commit/ab4d1d335d90ecdba5df3c517fff1eb37719a13f))
* fix package linking ([56354a5](https://github.com/AdrianInsua/platform/commit/56354a51d7af9fa6b231144bdf43b744aec086f4))
* **form:** connect formGroup input not mapped to connect base ([#94](https://github.com/AdrianInsua/platform/issues/94)) ([9d1d6db](https://github.com/AdrianInsua/platform/commit/9d1d6dba87511f35894a467532bd698f5043a58e)), closes [#85](https://github.com/AdrianInsua/platform/issues/85)
* external tslint running on library source code ([#35](https://github.com/AdrianInsua/platform/issues/35)) ([d6c6745](https://github.com/AdrianInsua/platform/commit/d6c674502dd2e1d0f0d1a593e8568765e5c290ab))
* reactive forms not updating on changes in store ([#41](https://github.com/AdrianInsua/platform/issues/41)) ([bd87846](https://github.com/AdrianInsua/platform/commit/bd87846389225a09973c40f71dfd0989da3fcb29))
* rm WeakMap, we can't use it for key with type string ([#15](https://github.com/AdrianInsua/platform/issues/15)) ([6a9bdc2](https://github.com/AdrianInsua/platform/commit/6a9bdc240e5b0e1e7eba9383697fa5f7cf382a43))
* typings entry point and failing definitions ([#36](https://github.com/AdrianInsua/platform/issues/36)) ([ae0373d](https://github.com/AdrianInsua/platform/commit/ae0373d2cdaa9c6a525b195c41dd342c47175a60))
* update peer dependencies from ^9.0.0 to ^10.0.0 ([#87](https://github.com/AdrianInsua/platform/issues/87)) ([fcea502](https://github.com/AdrianInsua/platform/commit/fcea502f44cff441737c51ebf539268c594e9bfa))


### chore

* **build:** use ng-packagr ([#37](https://github.com/AdrianInsua/platform/issues/37)) ([dffe23a](https://github.com/AdrianInsua/platform/commit/dffe23ade3417bdb5f58cecdf760039be771bc92)), closes [#9](https://github.com/AdrianInsua/platform/issues/9)
* **linting:** add global tslint rules ([#35](https://github.com/AdrianInsua/platform/issues/35)) ([336cc60](https://github.com/AdrianInsua/platform/commit/336cc60921119bc5f5c7d22d9a364db93fef244b)), closes [#4](https://github.com/AdrianInsua/platform/issues/4)


### Features

* add bootstraping script ([3fd7b32](https://github.com/AdrianInsua/platform/commit/3fd7b32faf69346e020eb5f991ffba47e445c243))
* add peer dep support for Angular 5 ([#51](https://github.com/AdrianInsua/platform/issues/51)) ([13b4cb8](https://github.com/AdrianInsua/platform/commit/13b4cb828a0f0fd44d8a20cbb0f3259fe7cbaa4d))
* bump angular version to 11.0.5 ([1b8bb72](https://github.com/AdrianInsua/platform/commit/1b8bb72a0fea50c583dc9d943dac5506a2ba0ff4))
* refactor packages to match new ng-packager ([710edef](https://github.com/AdrianInsua/platform/commit/710edefc2d23b0a731254c3af16969331036d94f))
* split directives into separate modules ([#37](https://github.com/AdrianInsua/platform/issues/37)) ([6250ea8](https://github.com/AdrianInsua/platform/commit/6250ea8cbe7dc498a79b34c7f31323e1bef4aaa9))
* upgrade to angular 7 ([#72](https://github.com/AdrianInsua/platform/issues/72)) ([18d9245](https://github.com/AdrianInsua/platform/commit/18d924563618988f949c47b74d567e7c9f75e605)), closes [#65](https://github.com/AdrianInsua/platform/issues/65) [#66](https://github.com/AdrianInsua/platform/issues/66) [#67](https://github.com/AdrianInsua/platform/issues/67) [#68](https://github.com/AdrianInsua/platform/issues/68) [#69](https://github.com/AdrianInsua/platform/issues/69) [#70](https://github.com/AdrianInsua/platform/issues/70) [#71](https://github.com/AdrianInsua/platform/issues/71) [#74](https://github.com/AdrianInsua/platform/issues/74) [#79](https://github.com/AdrianInsua/platform/issues/79)


### BREAKING CHANGES

* Upgrades Angular dependencies to v7
* **build:** - changes the output to conform to the Angular Package Format. This may cause subtle differences in consumption behaviour
- peer dependencies have been corrected to actual dependencies
* **linting:** - ConnectArray has been renamed to ConnectArrayDirective
- ReactiveConnect has been renamed to ReactiveConnectDirective
- Connect has been renamed to ConnectDirective
- interfaces with an "I" prefix have had that prefix removed (e.g "IAppStore" -> "AppStore")

# ngredux-form-v1.0.0 (2021-09-28)


### Bug Fixes

* external tslint running on library source code ([#35](https://github.com/AdrianInsua/platform/issues/35)) ([d6c6745](https://github.com/AdrianInsua/platform/commit/d6c674502dd2e1d0f0d1a593e8568765e5c290ab))
* fix eslint ([ab4d1d3](https://github.com/AdrianInsua/platform/commit/ab4d1d335d90ecdba5df3c517fff1eb37719a13f))
* fix package linking ([56354a5](https://github.com/AdrianInsua/platform/commit/56354a51d7af9fa6b231144bdf43b744aec086f4))
* **form:** connect formGroup input not mapped to connect base ([#94](https://github.com/AdrianInsua/platform/issues/94)) ([9d1d6db](https://github.com/AdrianInsua/platform/commit/9d1d6dba87511f35894a467532bd698f5043a58e)), closes [#85](https://github.com/AdrianInsua/platform/issues/85)
* add typescript unused checks ([#32](https://github.com/AdrianInsua/platform/issues/32)) ([65c4229](https://github.com/AdrianInsua/platform/commit/65c4229313eda49fec3b5da187ae010cc32b3eaa))
* reactive forms not updating on changes in store ([#41](https://github.com/AdrianInsua/platform/issues/41)) ([bd87846](https://github.com/AdrianInsua/platform/commit/bd87846389225a09973c40f71dfd0989da3fcb29))
* rm WeakMap, we can't use it for key with type string ([#15](https://github.com/AdrianInsua/platform/issues/15)) ([6a9bdc2](https://github.com/AdrianInsua/platform/commit/6a9bdc240e5b0e1e7eba9383697fa5f7cf382a43))
* typings entry point and failing definitions ([#36](https://github.com/AdrianInsua/platform/issues/36)) ([ae0373d](https://github.com/AdrianInsua/platform/commit/ae0373d2cdaa9c6a525b195c41dd342c47175a60))
* update peer dependencies from ^9.0.0 to ^10.0.0 ([#87](https://github.com/AdrianInsua/platform/issues/87)) ([fcea502](https://github.com/AdrianInsua/platform/commit/fcea502f44cff441737c51ebf539268c594e9bfa))


### chore

* **build:** use ng-packagr ([#37](https://github.com/AdrianInsua/platform/issues/37)) ([dffe23a](https://github.com/AdrianInsua/platform/commit/dffe23ade3417bdb5f58cecdf760039be771bc92)), closes [#9](https://github.com/AdrianInsua/platform/issues/9)
* **linting:** add global tslint rules ([#35](https://github.com/AdrianInsua/platform/issues/35)) ([336cc60](https://github.com/AdrianInsua/platform/commit/336cc60921119bc5f5c7d22d9a364db93fef244b)), closes [#4](https://github.com/AdrianInsua/platform/issues/4)


### Features

* add bootstraping script ([3fd7b32](https://github.com/AdrianInsua/platform/commit/3fd7b32faf69346e020eb5f991ffba47e445c243))
* add peer dep support for Angular 5 ([#51](https://github.com/AdrianInsua/platform/issues/51)) ([13b4cb8](https://github.com/AdrianInsua/platform/commit/13b4cb828a0f0fd44d8a20cbb0f3259fe7cbaa4d))
* bump angular version to 11.0.5 ([1b8bb72](https://github.com/AdrianInsua/platform/commit/1b8bb72a0fea50c583dc9d943dac5506a2ba0ff4))
* refactor packages to match new ng-packager ([710edef](https://github.com/AdrianInsua/platform/commit/710edefc2d23b0a731254c3af16969331036d94f))
* split directives into separate modules ([#37](https://github.com/AdrianInsua/platform/issues/37)) ([6250ea8](https://github.com/AdrianInsua/platform/commit/6250ea8cbe7dc498a79b34c7f31323e1bef4aaa9))
* upgrade to angular 7 ([#72](https://github.com/AdrianInsua/platform/issues/72)) ([18d9245](https://github.com/AdrianInsua/platform/commit/18d924563618988f949c47b74d567e7c9f75e605)), closes [#65](https://github.com/AdrianInsua/platform/issues/65) [#66](https://github.com/AdrianInsua/platform/issues/66) [#67](https://github.com/AdrianInsua/platform/issues/67) [#68](https://github.com/AdrianInsua/platform/issues/68) [#69](https://github.com/AdrianInsua/platform/issues/69) [#70](https://github.com/AdrianInsua/platform/issues/70) [#71](https://github.com/AdrianInsua/platform/issues/71) [#74](https://github.com/AdrianInsua/platform/issues/74) [#79](https://github.com/AdrianInsua/platform/issues/79)


### BREAKING CHANGES

* Upgrades Angular dependencies to v7
* **build:** - changes the output to conform to the Angular Package Format. This may cause subtle differences in consumption behaviour
- peer dependencies have been corrected to actual dependencies
* **linting:** - ConnectArray has been renamed to ConnectArrayDirective
- ReactiveConnect has been renamed to ReactiveConnectDirective
- Connect has been renamed to ConnectDirective
- interfaces with an "I" prefix have had that prefix removed (e.g "IAppStore" -> "AppStore")

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.
