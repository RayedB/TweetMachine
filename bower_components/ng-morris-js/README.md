<a href="http://jboothe.github.io/ngMorrisJs/">
  <img src="http://jboothe.github.io/ngMorrisJs/images/logo/ng-morris-js-shield-240.png" alt="ngMorrisJs logo" title="ngMorrisJs" align="left" height="160" />
</a>

# ng-morris-js
Super Easy AngularJS Chart Directives for [MorrisJS](http://morrisjs.github.io/morris.js/index.html) Charts.
**ng-morris-js** doesn't limit chart options - use ANY or ALL of Morris Chart's native [Area, Line](http://morrisjs.github.io/morris.js/lines.html),  [Bar](http://morrisjs.github.io/morris.js/bars.html) and [Donut](http://morrisjs.github.io/morris.js/donuts.html) options.

<a href="http://jboothe.github.io/ngMorrisJs/">
  <img src="http://jboothe.github.io/ngMorrisJs/images/showcase-480.png"  alt="showcase" align="right" />
</a>

## [Demo Site](http://jboothe.github.io/ngMorrisJs/)
Our Demo Site has many useful examples and usage tips.


## Features
 * Super Easy to Use
 * Use Any/All MorrisJS Options
 * Inverse Axes Tips
 * Demos & Tutorials
 * Angular Best Practices

### Installation
From terminal/command prompt, install the ng-morris-js package with bower or npm.</p>
```bash
bower install ng-morris-js
// or
npm install ng-morris-js</div>
```
### Include Script and CSS References
If `npm install` was used, substitute `bower_components` with `node_modules` in paths below.
```html
<link rel="stylesheet" href="bower_components/morris.js/morris.css">
<!-- Include these .js references below angular scripts -->
<script src="bower_components/morris.js/morris.js"></script>
<script src="bower_components/ng-morris-js/dist/ng-morris-js.min.js"></script></div>
```

### Add Module Reference
Add the `ng-morris-js` module reference along with others required by your app.
```javascript
(function () {
  angular
    .module('app', [
      'ng-morris-js'
    ]);
}());
```

### Usage HTML
Declare the directive and the two attributes, chart-options &amp; chart-data.
```html
<ng-morris-bar-chart
  chart-options="myCtrl.barChart.options"
  chart-data="homeCtrl.barChart.data">
</ng-morris-bar-chart></div>
```

### Usage JS
Create an object in your Controller to store the chart options &amp; data.
```javascript
myCtrl.myBarChart = {
  data: [
    {year: '2015 Q1', sales: 3, net: 2, profit: 1},
    {year: '2015 Q2', sales: 2, net: 0.9, profit: 0.45},
    {year: '2015 Q3', sales: 1, net: 0.4, profit: 0.2},
    {year: '2015 Q4', sales: 2, net: 1, profit: 0.5}
  ],
  options: {
    xkey: 'year',
    ykeys: ['sales', 'net', 'profit'],
    labels: ['Sales', 'Net', 'Profit'],
    barColors: ['#777777', '#e74c3c', 'rgb(11, 98, 164)']
  }
};
```

## Change Log
Please see [CHANGELOG](https://github.com/jboothe/ngMorrisJs/blob/master/CHANGELOG.md).

## Authors
Jeff Boothe (@dezeloper)

[reurgency.com](http://reurgency.com)


## Contributing
1. Create an issue to discuss your idea
2. [Fork it](https://github.com/jboothe/ngMorrisJs/fork)
3. Create your local feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Adding my new feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

## Credits
Inspired by Connor Leech's [ngMorris](https://github.com/cleechtech/ng-morris)


## License
Please see [LICENSE](https://github.com/jboothe/ngMorrisJs/blob/master/LICENSE)
