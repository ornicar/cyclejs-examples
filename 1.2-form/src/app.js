let {append, assoc, curry, identity} = require("ramda")
let {Observable} = require("rx")
let Cycle = require("@cycle/core")
let {br, button, div, h1, h2, hr, input, label, makeDOMDriver, p, pre} = require("@cycle/dom")
let {always, scanFn} = require("./utils")
let {makeUser} = require("./model")

// main :: {Observable *} -> {Observable *}
function main({DOM, state: stateSource}) {
  // Actions
  let actions = {
    changeUsername: DOM.select("#username")
      .events("input")
      .map((event) => event.target.value)
      .startWith("")
      .share(),

    changeEmail: DOM.select("#email")
      .events("input")
      .map((event) => event.target.value)
      .startWith("")
      .share(),

    register: DOM.select("#register")
      .events("click")
      .map((event) => true)
      .share(),
  }

  // Seeds
  let seeds = {
    users: [],
    form: {
      username: "",
      email: "",
    },
  }

  // Updates
  let update = {
    users: Observable.merge(
      actions.register.withLatestFrom(stateSource, (_, state) => append(makeUser(state.form)))
    ),
    form: Observable.merge(
      actions.changeUsername.map(username => assoc("username", username)),
      actions.changeEmail.map(email => assoc("email", email)),
      actions.register.map((_) => always(seeds.form)) // reset `form`
    ),
  }

  // State
  let state = {
    users: update.users
      .startWith(seeds.users)
      .scan(scanFn)
      .shareReplay(1)
      .distinctUntilChanged(),

    form: update.form
      .startWith(seeds.form)
      .scan(scanFn)
      .shareReplay(1)
      .distinctUntilChanged(),
  }

  let stateSink = Observable.combineLatest(
    state.users, state.form,
    (users, form) => ({users, form})
  )

  // View
  return {
    DOM: stateSink.map((state) => {
      return div([
        h1("Registration"),
        div(".form-element", [
          label({htmlFor: "username"}, "Username:"),
          br(),
          input("#username", {type: "text", value: state.form.username}),
        ]),
        div(".form-element", [
          label({htmlFor: "email"}, "Email:"),
          br(),
          input("#email", {type: "text", value: state.form.email}),
        ]),
        button("#register.form-element", {type: "submit"}, "Register"),
        hr(),
        h2("State SPY"),
        pre(JSON.stringify(state, null, 2)),
      ])
    }),
    state: stateSink,
  }
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app"),
  state: identity,
})