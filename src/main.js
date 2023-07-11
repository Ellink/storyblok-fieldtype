import Plugin from './Plugin.vue'

if (process.env.NODE_ENV == 'development') {

  window.Fieldtype = Plugin
  // console.log(Plugin.methods.initWith())
  let customComp = window.Storyblok.vue.extend(window.Fieldtype);
  window.Storyblok.vue.component('custom-plugin', customComp);
  window.StoryblokPluginRegistered = true;

} else {
  
  let init = Plugin.methods.initWith()
  // console.log(init)
  window.storyblok.field_types[init.plugin] = Plugin

}

