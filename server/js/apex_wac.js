/********************************************************************
 * Product: APEX Watch Autocomplete Change
 * Copyright 2020: Dick Dral, Detora, The Netherlands
 *
 * Modifications:
 * 
 */

// global namespace
var apex_wac = {

current_item:"",
debug_state:false,

/********************************************************************
 * Utility functions
 */

debug: function (arg1,arg2,arg3) 
{
  if ( apex_wac.debug_state ) { 
      if ( arg1 && !arg2 && !arg3 ) { console.log('apex_wac: ',arg1); }
      if ( arg1 &&  arg2 && !arg3 ) { console.log('apex_wac: ',arg1,arg2); }
      if ( arg1 &&  arg2 &&  arg3 ) { console.log('apex_wac: ',arg1,arg2, arg3); }
  }
},
is_auto_complete_item: function(item) {
  return( $(item).hasClass('apex-item-auto-complete') );  
},
// get current value of item
get_current_value : function(item) {
    let value;
    if ( $(item).length > 0 ) {
        // retrieve value of item
        value = $(item).val();
        // if no value/undefined put space character into value
        value = value || (!value) && " ";
    }
    return(value);
},
// set current item and store current value of item as attribute old-value
initialize : function (item) { 

    apex_wac.debug('Initialize auto complete ',item);
    if ( $(item).length > 0 ) {
        
        // set current_item
        apex_wac.current_item = item;
        
        // store value within item
        $(item).attr('old-value',apex_wac.get_current_value(item));
        
        apex_wac.debug('Value stored:',$(item).attr('old-value'));
    }  
},
// check the value of the current item against the stored initial value
check_changed_value : function () { 

    if ( apex_wac.current_item ) {
        
        let item = apex_wac.current_item;
        apex_wac.debug('check current item:',item);
        
        // get stored value from item
        let old_value = $(item).attr('old-value');
        
        // get current value
        let value = apex_wac.get_current_value(item);
        apex_wac.debug('Value checked:',old_value,value);

        // compare values
        if ( value !== old_value ) {
            
            // define element from which to send the trigger
            item_id = $(item).attr('id').replace("oj-inputsearch-input-","").replace("_HIDDEN","");
            $("#"+item_id).trigger('ac-value-changed');
            apex_wac.debug('Trigger sent:',item_id);
        }
        // unset current item
        apex_wac.current_item = "";
    }  
},
on_focus: function(item) {
    
    apex_wac.debug('Focus on ',item);
    
    // check whether the current item is set and a value has to be checked
    apex_wac.check_changed_value();

    // if current item is auto complete item, initialize it
    if ( apex_wac.is_auto_complete_item(item) ) {        
        apex_wac.initialize(item);
    }
},

/* Apex plugin function */
doIt : function(debug_state) 
{
    let daThis = this;
    apex_wac.debug_state = debug_state;
    // select all the focusable APEX items and buttons on page
    // and define a focus event 
    $('.apex-item-text,.apex-item-textarea,.apex-item-select,.t-Button').each( function() {
         let item = this;
         $(item).focus(function() { apex_wac.on_focus(item); } );
    });
 
},
doItDebug : function() {
    console.log('apex_wac: Debugging enabled');
    apex_wac.doIt(true);
}

}
