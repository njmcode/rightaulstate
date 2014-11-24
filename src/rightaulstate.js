/**
 * RightAulState
 * Super-simple JS state machine implementation.
 * github.org/njmcode/rightaulstate
 *
 * See the example at http://codepen.io/njmcode/pen/eoiDs for usage.
 * @author njmcode (github.org/njmcode)
**/

var RightAulState = function(payload) {

  this.initial = payload.initial;
  this.states = payload.states;
  this.onStateChanged = payload.onStateChanged;

  /** API **/

  /**
   * Return the state data object for a given id.
   * @param str stateId - state ID name
   * @return object of state data, or false if stateId not found
  **/
  this.getStateById = function(stateId) {

    if(!(stateId in this.states)) return false;
    return this.states[stateId];
  }

  /**
   * Returns the ID or the full data object for the current state
   * @param bool getAll - returns the full data object if true (default: undefined)
   * @returns str current state id, or object of current state data
  **/
  this.getCurrentState = function(getAll) {
    return (getAll) ? this.getStateById(this.currentState) : this.currentState;
  };

  /**
   * As getCurrentState, but for the state prior to the one currently active
   * @returns null if no state changes have been made
  **/
  this.getPreviousState = function(getAll) {
    return (getAll) ? this.getStateById(this.previousState) : this.previousState;
  };

  /**
   * Immediately set the current state to a new one.
   * Fires the onStateChanged callback if one exists
  **/
  this.setState = function(stateId) {

    if(!(stateId in this.states)) return false;
    this.previousState = this.currentState;
    this.currentState = stateId;

    if(this.onStateChanged) {

      this.onStateChanged({
        newState: this.currentState,
        oldState: this.previousState,
        newStateData: this.getCurrentState(true)
      });
    }
    return this.getCurrentState(true);
  };

  /**
   * Trigger a transition on the currently active state
  **/
  this.doTransition = function(transId) {

    var state = this.getCurrentState(true);
    if(!state) return false;
    if(!('transitions' in state)) return false;
    if(!(transId in state.transitions)) return false;

    return this.setState(state.transitions[transId]);

  };

  /**
   * Initialize
  **/
  this.init = function() {
    this.previousState = null;
    this.currentState = null;

    var stateList = [];
    for(var k in this.states) {
      if(stateList.indexOf(k) !== -1) throw 'RightAulState: duplicate state id "' + k + '"';
      this.states[k].id = k;
      stateList.push(k);
    }

    this.setState(this.initial);
  };

};