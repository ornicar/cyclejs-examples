let {assoc, assocPath, curry, identity, prop} = require("ramda")
let {Observable: $} = require("rx")
let Cycle = require("@cycle/core")
let {br, button, div, h1, h2, hr, input, label, makeDOMDriver, p, pre} = require("@cycle/dom")

let {User} = require("./models")
let seeds = require("./seeds")

let scanFn = curry((state, updateFn) => {
  return updateFn(state)
})

// {Observable *} -> {Observable *}
let main = function (src) {
  // INTENTS
  let intents = {
    changeUsername: src.DOM.select("#username")
      .events("input")
      .map((event) => event.target.value)
      .share(),

    changeEmail: src.DOM.select("#email")
      .events("input")
      .map((event) => event.target.value)
      .share(),

    createUser: src.DOM.select("#submit")
      .events("click")
      .map((event) => true)
      .debounce(100)
      .share(),
  }

  // ACTIONS
  let actions = {
    createUser: src.state.map(prop("form"))
      .sample(intents.createUser)
      .map((input) => User(input))
      .share(),
  }

  // STATE
  let state = $.merge(
      // Track fields
      intents.changeUsername.map((v) => assocPath(["form", "username"], v)),
      intents.changeEmail.map((v) => assocPath(["form", "email"], v)),

      // Create user
      actions.createUser.map((u) => (s) => assocPath(["users", u.id], u, s)),

      // Reset form after valid submit
      actions.createUser.delay(1).map((_) => assoc("form", seeds.form))
    )
    .startWith(seeds)
    .scan(scanFn)
    .distinctUntilChanged()
    .shareReplay(1)

  // SINKS
  return {
    state: state,

    DOM: state.map((state) => {
      let {form} = state
      return div([
        h1("Registration"),
        div(".form-element", [
          label({htmlFor: "username"}, "Username:"),
          br(),
          input("#username", {type: "text", value: form.username, autocomplete: "off"}),
        ]),
        div(".form-element", [
          label({htmlFor: "email"}, "Email:"),
          br(),
          input("#email", {type: "text", value: form.email, autocomplete: "off"}),
        ]),
        button("#submit.form-element", {type: "submit"}, "Register"),
        hr(),
        h2("State SPY"),
        pre(JSON.stringify(state, null, 2)),
      ])
    }),
  }
}

Cycle.run(main, {
  state: identity,

  DOM: makeDOMDriver("#app"),
})
