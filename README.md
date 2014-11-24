RightAulState
=============

A VERY simple Javascript finite state machine.

Usage
-----

See [http://codepen.io/njmcode/pen/eoiDs] for an example demo.


    var stateManager = new RightAulState({

       initial: 'myFirstState',
       states: {

          myFirstState: {
             transitions: {
                goNext: 'mySecondState',
                goEnd: 'myThirdState'
             }
          },
          mySecondState: {
             transitions: {
                showMenu: 'myMenuState',
                goPrev: 'myFirstState',
                goNext: 'myThirdState',
                goEnd: 'myThirdState'
             }
          },
          myThirdState: {
             transitions: {
                goPrev: 'mySecondState',
                reset: 'myFirstState'
             }
          },
          myMenuState: {
             transitions: {
                restart: 'myFirstState'
             }
          }
       },
       onStateChanged: function(data) {

          console.log('New state is', data.newState);
          console.log('Previous state was', data.oldState);
          console.log('Current state data is', data.newStateData);

       }

    });

    stateManager.init();
    stateManager.getCurrentState(); // 'myFirstState'

    stateManager.doTransition('goNext'); // 'mySecondState'
    stateManager.getPreviousState(); // 'myFirstState'

    stateManager.doTransition('showMenu'); // 'myMenuState'
    stateManager.doTransition('goNext'); // returns false, as no transition named 'goNext' is defined in myMenuState
    stateManager.getCurrentState(); // 'myMenuState'
    stateManager.doTransition('restart'); // 'myFirstState'

    stateManager.doTransition('goEnd'); // 'myThirdState'


Check the source for method comments.