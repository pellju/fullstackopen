const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      //state.good = state.good + 1
      //return state
      const additionalGood = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return additionalGood
    case 'OK':
      const additionalOk = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      return additionalOk
    case 'BAD':
      const additionalBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      return additionalBad
    case 'ZERO':
      const zeroState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zeroState
    default: return state
  }
  
}

export default counterReducer