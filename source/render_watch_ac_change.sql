/*-------------------------------------
 * APEX Store Location
 * Version: 1.0 (22-09-2017)
 * Author:  Dick Dral
 *-------------------------------------
*/
FUNCTION render_watch_ac_change ( p_dynamic_action IN apex_plugin.t_dynamic_action,
                             p_plugin         IN apex_plugin.t_plugin
                           )
  RETURN apex_plugin.t_dynamic_action_render_result IS
  --
  -- plugin attributes
  l_result       apex_plugin.t_dynamic_action_render_result;
  l_debug        number;
  l_apex_wac_js  varchar2(1000);
  l_js_function  varchar2(1000);
  --
BEGIN
  --
  l_js_function := 'apex_wac.doIt';
  if apex_application.g_debug then
    apex_plugin_util.debug_dynamic_action(p_plugin         => p_plugin,
                                          p_dynamic_action => p_dynamic_action);
    l_debug := 1;                                      
    -- set js/css filenames (normal version)
    l_apex_wac_js  := 'apex_wac';
    --
    IF v('debug') = 'YES' THEN
      l_js_function := 'apex_wac.doItDebug';
    ELSE
      l_js_function := 'apex_wac.doIt';
    END IF;
    --  
  else
    -- minified version (not yet)
    l_apex_wac_js  := 'apex_wac';
    --
  end if;
  --
  apex_javascript.add_library(p_name           => l_apex_wac_js,
                              p_directory      => p_plugin.file_prefix ,
                              p_version        => NULL,
                              p_skip_extension => FALSE);

  --
  apex_javascript.add_onload_code ( p_code    =>  l_js_function
                                  , p_key     =>  'apex_wac'
                                  );    
  --
  l_result.javascript_function := l_js_function;
  --
  RETURN l_result;
  --
END render_watch_ac_change;