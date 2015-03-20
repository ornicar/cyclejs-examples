(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("./shims");

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Model = require("./model");
var View = require("./view");
var Intent = require("./intent");

// APP =============================================================================================
var DOM = Cycle.createDOMUser("main");

DOM.inject(View).inject(Model).inject(Intent).inject(DOM);

},{"./intent":2,"./model":3,"./shims":4,"./view":5,"cyclejs":"cyclejs"}],2:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

// EXPORTS =========================================================================================
var Intent = Cycle.createIntent(function (DOM) {
  return {
    changeQuery$: DOM.event$(".query", "input").map(function (event) {
      return event.target.value.trim();
    }) };
});

module.exports = Intent;

},{"cyclejs":"cyclejs"}],3:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

// EXPORTS =========================================================================================
var Model = Cycle.createModel(function (Intent) {
  return {
    query$: Intent.get("changeQuery$").startWith(""),

    data$: Rx.Observable["return"]([{ name: "Angular", url: "https://angularjs.org/" }, { name: "Backbone", url: "http://documentcloud.github.io/backbone/" }, { name: "Cycle", url: "https://github.com/staltz/cycle" }, { name: "Dojo", url: "http://dojotoolkit.org/" }, { name: "Ember", url: "http://emberjs.com/" }, { name: "Express", url: "http://expressjs.com/" }, { name: "jQuery", url: "http://jquery.com/" }, { name: "Knockout.js", url: "http://knockoutjs.com/" }, { name: "Koa", url: "http://koajs.com/" }, { name: "Lodash", url: "http://lodash.com/" }, { name: "Moment", url: "http://momentjs.com/" }, { name: "Mootools", url: "http://mootools.net/" }, { name: "Prototype", url: "http://www.prototypejs.org/" }, { name: "React", url: "http://facebook.github.io/react/" }, { name: "Underscore", url: "http://documentcloud.github.io/underscore/" }]) };
});

module.exports = Model;

},{"cyclejs":"cyclejs"}],4:[function(require,module,exports){
"use strict";

require("object.assign").shim();

console.error = console.log;

},{"object.assign":"object.assign"}],5:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

// EXPORTS =========================================================================================
var View = Cycle.createView(function (Model) {
  var query$ = Model.get("query$");
  var data$ = Model.get("data$");
  return {
    vtree$: data$.combineLatest(query$, function (data, query) {
      var effectiveQuery = query.toLowerCase();
      var items = query ? data.filter(function (obj) {
        return obj.name.toLowerCase().match(effectiveQuery);
      }) : data;
      return h("div", null, [h("input", { className: "query", type: "text", value: query, placeholder: "Type here" }), h("ul", null, [items.map(function (obj) {
        return h("li", null, [obj.name, " ", h("a", { href: obj.url }, [obj.name])]);
      })])]);
    }) };
});

module.exports = View;

},{"cyclejs":"cyclejs"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImJ1aWxkL3NjcmlwdHMvYXBwLmpzIiwiYnVpbGQvc2NyaXB0cy9pbnRlbnQuanMiLCJidWlsZC9zY3JpcHRzL21vZGVsLmpzIiwiYnVpbGQvc2NyaXB0cy9zaGltcy5qcyIsImJ1aWxkL3NjcmlwdHMvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7QUFHbkIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7QUFHakMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0FDVjFELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQixFQUFFLEdBQUksS0FBSyxDQUFYLEVBQUU7OztBQUdQLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDckMsU0FBTztBQUNMLGdCQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQ3hDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7YUFB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VUFBQSxHQUFHO2VBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO09BQUEsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUM1RixhQUNFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQ2IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUMsQ0FBQyxFQUN0RixDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUNaLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO2VBQ1gsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FBQSxDQUNwRSxDQUNGLENBQUMsQ0FDSCxDQUFDLENBQ0Y7S0FDSCxDQUFDLEVBQ0gsQ0FBQztDQUNILENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKFwiLi9zaGltc1wiKTtcblxuLy8gSU1QT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IEN5Y2xlID0gcmVxdWlyZShcImN5Y2xlanNcIik7XG5sZXQgTW9kZWwgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmxldCBWaWV3ID0gcmVxdWlyZShcIi4vdmlld1wiKTtcbmxldCBJbnRlbnQgPSByZXF1aXJlKFwiLi9pbnRlbnRcIik7XG5cbi8vIEFQUCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBET00gPSBDeWNsZS5jcmVhdGVET01Vc2VyKFwibWFpblwiKTtcblxuRE9NLmluamVjdChWaWV3KS5pbmplY3QoTW9kZWwpLmluamVjdChJbnRlbnQpLmluamVjdChET00pOyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeH0gPSBDeWNsZTtcblxuLy8gRVhQT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IEludGVudCA9IEN5Y2xlLmNyZWF0ZUludGVudChET00gPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5nZVF1ZXJ5JDogRE9NLmV2ZW50JChcIi5xdWVyeVwiLCBcImlucHV0XCIpXG4gICAgICAubWFwKGV2ZW50ID0+IGV2ZW50LnRhcmdldC52YWx1ZS50cmltKCkpLFxuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZW50OyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeH0gPSBDeWNsZTtcblxuLy8gRVhQT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IE1vZGVsID0gQ3ljbGUuY3JlYXRlTW9kZWwoKEludGVudCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5JDogSW50ZW50LmdldChcImNoYW5nZVF1ZXJ5JFwiKS5zdGFydFdpdGgoXCJcIiksXG5cbiAgICBkYXRhJDogUnguT2JzZXJ2YWJsZS5yZXR1cm4oW1xuICAgICAge25hbWU6IFwiQW5ndWxhclwiLCB1cmw6IFwiaHR0cHM6Ly9hbmd1bGFyanMub3JnL1wifSxcbiAgICAgIHtuYW1lOiBcIkJhY2tib25lXCIsIHVybDogXCJodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuaW8vYmFja2JvbmUvXCJ9LFxuICAgICAge25hbWU6IFwiQ3ljbGVcIiwgdXJsOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9zdGFsdHovY3ljbGVcIn0sXG4gICAgICB7bmFtZTogXCJEb2pvXCIsIHVybDogXCJodHRwOi8vZG9qb3Rvb2xraXQub3JnL1wifSxcbiAgICAgIHtuYW1lOiBcIkVtYmVyXCIsIHVybDogXCJodHRwOi8vZW1iZXJqcy5jb20vXCJ9LFxuICAgICAge25hbWU6IFwiRXhwcmVzc1wiLCB1cmw6IFwiaHR0cDovL2V4cHJlc3Nqcy5jb20vXCJ9LFxuICAgICAge25hbWU6IFwialF1ZXJ5XCIsIHVybDogXCJodHRwOi8vanF1ZXJ5LmNvbS9cIn0sXG4gICAgICB7bmFtZTogXCJLbm9ja291dC5qc1wiLCB1cmw6IFwiaHR0cDovL2tub2Nrb3V0anMuY29tL1wifSxcbiAgICAgIHtuYW1lOiBcIktvYVwiLCB1cmw6IFwiaHR0cDovL2tvYWpzLmNvbS9cIn0sXG4gICAgICB7bmFtZTogXCJMb2Rhc2hcIiwgdXJsOiBcImh0dHA6Ly9sb2Rhc2guY29tL1wifSxcbiAgICAgIHtuYW1lOiBcIk1vbWVudFwiLCB1cmw6IFwiaHR0cDovL21vbWVudGpzLmNvbS9cIn0sXG4gICAgICB7bmFtZTogXCJNb290b29sc1wiLCB1cmw6IFwiaHR0cDovL21vb3Rvb2xzLm5ldC9cIn0sXG4gICAgICB7bmFtZTogXCJQcm90b3R5cGVcIiwgdXJsOiBcImh0dHA6Ly93d3cucHJvdG90eXBlanMub3JnL1wifSxcbiAgICAgIHtuYW1lOiBcIlJlYWN0XCIsIHVybDogXCJodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L1wifSxcbiAgICAgIHtuYW1lOiBcIlVuZGVyc2NvcmVcIiwgdXJsOiBcImh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5pby91bmRlcnNjb3JlL1wifSxcbiAgICBdKSxcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsOyIsInJlcXVpcmUoXCJvYmplY3QuYXNzaWduXCIpLnNoaW0oKTtcblxuY29uc29sZS5lcnJvciA9IGNvbnNvbGUubG9nOyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeCwgaH0gPSBDeWNsZTtcblxuLy8gRVhQT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IFZpZXcgPSBDeWNsZS5jcmVhdGVWaWV3KE1vZGVsID0+IHtcbiAgbGV0IHF1ZXJ5JCA9IE1vZGVsLmdldChcInF1ZXJ5JFwiKTtcbiAgbGV0IGRhdGEkID0gTW9kZWwuZ2V0KFwiZGF0YSRcIik7XG4gIHJldHVybiB7XG4gICAgdnRyZWUkOiBkYXRhJC5jb21iaW5lTGF0ZXN0KHF1ZXJ5JCwgKGRhdGEsIHF1ZXJ5KSA9PiB7XG4gICAgICBsZXQgZWZmZWN0aXZlUXVlcnkgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuICAgICAgbGV0IGl0ZW1zID0gcXVlcnkgPyBkYXRhLmZpbHRlcihvYmogPT4gb2JqLm5hbWUudG9Mb3dlckNhc2UoKS5tYXRjaChlZmZlY3RpdmVRdWVyeSkpIDogZGF0YTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGgoJ2RpdicsIG51bGwsIFtcbiAgICAgICAgICBoKCdpbnB1dCcsIHtjbGFzc05hbWU6IFwicXVlcnlcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBxdWVyeSwgcGxhY2Vob2xkZXI6IFwiVHlwZSBoZXJlXCJ9KSxcbiAgICAgICAgICBoKCd1bCcsIG51bGwsIFtcbiAgICAgICAgICAgIGl0ZW1zLm1hcChvYmogPT5cbiAgICAgICAgICAgICAgaCgnbGknLCBudWxsLCBbb2JqLm5hbWUsIFwiIFwiLCBoKCdhJywge2hyZWY6IG9iai51cmx9LCBbb2JqLm5hbWVdKV0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgfSksXG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3OyJdfQ==
