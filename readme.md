<div align="center">
  <h1>🦘</br>baseroo</h1>
	<p>Converts values from one base to another between 2-64</p>
	<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-d9207b.svg" alt="License: MIT"></a>
	<a href="https://github.com/semantic-release/semantic-release"><img src="https://camo.githubusercontent.com/59c84e3731ad0a45312b47b1546b0972ac4389ea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2532302532302546302539462539332541362546302539462539412538302d73656d616e7469632d2d72656c656173652d6531303037392e737667" alt="Uses Semantic Release to correctly bump versions especially for breaking changes"></a>
	<a href="https://renovatebot.com/"><img src="https://img.shields.io/badge/%F0%9F%94%84%F0%9F%A4%96%20-renovate%20bot-d9207b.svg" alt="Uses Renovate to keep dependencies updated"></a>
	<a href="https://codecov.io/gh/ryansmith94/baseroo"><img alt="Main branch coverage percentage from Codecov" src="https://codecov.io/gh/ryansmith94/baseroo/branch/main/graph/badge.svg" /></a>
	<a href="https://bundlephobia.com/result?p=baseroo"><img alt="Package size from BundlePhobia" src="https://img.shields.io/bundlephobia/minzip/baseroo.svg" /></a>
	<div>
	</div>
</div>

```ts
// Install it with `npm i baseroo`
import { convertBase } from 'baseroo'

const base16Value = '8f'
const base10Value = convertBase(base16Value, 16, 10) // '143'
```

### Background

Baseroo was created from a [2015 Stack Overflow Answer](https://stackoverflow.com/a/32480941/1221906) from a question asking "How do you convert numbers between different bases in JavaScript?". This answer and [the Gist code snippet](https://gist.github.com/ryansmith94/91d7fd30710264affeb9) received some comments requesting some changes, so it was converted to a package with tests and documentation to continue its development and make it easier to use as bug fixes and improvements are made.
