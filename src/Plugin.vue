<template>
  <div class="ajv-ls">
    <h4>Layout Settings</h4>
   
    <div class="ajs-ls__setting a-setting--enabled" >
      <input type="checkbox" name="a_enabled" id="a-enabled" v-model="model.a_enabled">
       <label for="a-enabled" style="margin-left:.5rem">Enable animation</label>

    </div>
     <!-- {{ model.animation  }} -->
     <!-- {{ model.animation ? '' : 'Missing : model.animation' }} -->
    <div class="ajv-ls__wrapper" v-if="model.a_enabled">
      <div class="ajv-ls__setting setting--animation">

        <label class="setting__label" for="a_type">Animation </label>
             
      
         <input type="checkbox" v-model="model.animation.link_scroll" name="animation_link_scroll" id="animation-link-scroll"> 
         <span  style="margin-left:.5rem; display: inline-block;">Link to scroll</span><br><br>
         <div style="display:flex">
          <div>
   <label class="setting__label" >Type</label>
            <select name="a_type" id="animation-type" v-model="model.animation.type">
              <option v-for="at,k in animation_options_types" :value="at.v" :key="k" >{{at.l}}</option>
            </select>       
          </div>
        <div v-if="model.animation.type == 'move-fade'" class="">
             <label class="setting__label" >Direction</label>
             <select name="a_type" id="animation-type" v-model="model.animation.direction">
              <option v-for="at,k in getSettingOptions(model.animation.type)" :value="at.v" :key="k" >{{at.l}}</option>
            </select>
        </div>
        </div>
        <br>
        
        <div v-if="model.animation.type == 'custom'" class="setting__sub-settng">
            <label class="setting__label" >Custom animation settings</label>
            <p class="subtext" style="font-style: italic;">Default animation is from set values</p>
            <label  for="a_custom_duration">Duration <small>seconds</small></label><br>
            <input type="number" step='0.1' value='0' placeholder='0' lang="en" name="a_custom_duration"  v-model="model.animation.custom.duration" /><span class="input_after">sec</span>
            <br>
            <label for="a_custom_offset_time">Time offset <small>seconds</small></label><br>
            <input type="number" step='0.05' value='0.50' placeholder='0.00' lang="en" name="a_custom_offset_time"  v-model="model.animation.custom.offset_time" /><span class="input_after">sec</span>
            <br>
            <label for="a_custom_offset_x">X Position <small>([+/-]=[value][units])</small> </label><br>
            <input type="text" placeholder='0px' lang="en" name="a_custom_offset_x"  v-model="model.animation.custom.offset_x" /><span class="input_after">px</span>
            <br/>
            <label for="a_custom_offset_y">Y Position <small>([+/-]=[value][units])</small></label><br>
            <input type="text" placeholder='0px' lang="en" name="a_custom_offset_y"  v-model="model.animation.custom.offset_y" /><span class="input_after">px</span>
         
            <br/>
            <label for="a_custom_offset_y">Rotation <small>([value]deg)</small></label><br>
            <input type="number" step='15' value='0' placeholder='0deg' lang="en" name="a_custom_rotation"  v-model="model.animation.custom.rotation" /><span class="input_after">deg</span>
            <br/>
            <label for="a_custom_scale">Scale <small>([value]*100%)</small></label><br>
            <input type="number" step='0.1' value='0' placeholder='0%' lang="en" name="a_custom_offset_scale"  v-model="model.animation.custom.scale" /><span class="input_after">%</span>
            <br>
            <label for="a_custom_opacity">Opacity <small>([value]*100%)</small></label><br>
                <input style="margin-right:.5rem" type="range" v-model="model.animation.custom.opacity" value="0" min="0" step="0.05" max="1"/> 
                <span style="font-weight: bold;">{{ Math.round(model.animation.custom.opacity * 100) }}%</span>
            <!-- <input type="number" step='0.1' value='0' placeholder='0%' lang="en" name="a_custom_offset_scale"  v-model="model.animation.custom.scale" /><span class="input_after">%</span> -->
            <br>
            <br>
            <input type="checkbox" v-model="model.animation.custom.to" name="animation_to" id="animation-to"> 
         <span  style="margin-left:.5rem; display: inline-block; font-weight: bold;">Animate to, instead of from</span><br><br>
              <label style="display: block;">Transform origin - <i>'{{ model.animation.custom.transform_origin }}'</i></label><br>
          <div class="setting__transform-origin indent-group" >
            <input v-for="opt,k in transform_origin_options" type="radio" v-model="model.animation.custom.transform_origin" :id="opt.v.replace(' ','_')" :name="opt.v" :value="opt.v" :key="k"  />
          </div>
          <br>
          <input type="checkbox" v-model="model.animation.custom.triggers" name="animation_triggers" id="animation-triggers"> 
         <span  style="margin-left:.5rem; display: inline-block;">Use custom triggers</span><br><br>
         
          <div class="indent-group" v-if="model.animation.custom.triggers" >
            <label for="a_custom_start">Start</label><br>
            <select name="a_custom_start" id="animation-custom-start" v-model="model.animation.custom.trigger_start">
              <option v-for="cs,k in trigger_options" :value="cs.v" :key="k">{{cs.l  }}</option>
            </select><br>
            <input v-if="model.animation.custom.trigger_start == 'custom'" type="text" v-model="model.animation.custom.trigger_start_custom" placeholder="ex: top+=100px"><br>
            <label for="a_custom_end">End</label><br>
             <select name="a_custom_end" id="animation-custom-end" v-model="model.animation.custom.trigger_end">
              <option v-for="cs,k in trigger_options" :value="cs.v" :key="k">{{cs.l  }}</option>
            </select><input v-if="model.animation.custom.trigger_end == 'custom'" type="text" v-model="model.animation.custom.trigger_end_custom" placeholder="ex: bottom-=100px"><br>
          </div>
            <br/>
             <input type="checkbox" v-model="model.animation.custom.children" name="animation_custom_children" id="animation-custom-children"> 
             <span  style="margin-left:.5rem; display: inline-block;">Animate children</span>
             <br>
             <br>
             <div class="indent-group" v-if="model.animation.custom.children">
             <div >
               <input type="checkbox" v-model="model.animation.custom.stagger" name="animation_custom_stagger" id="animation-custom-stagger">
             <span style="margin-left:.5rem; display: inline-block;">Stagger children</span><br><br>
             <div v-if="model.animation.custom.stagger" class="">
              <label for="a_custom_stagger_time">Stagger time</label><br>
              <input type="number" step='0.05' lang="en" value="0.1" name="a_custom_offset_x"  v-model="model.animation.custom.stagger_time" /><span class="input_after">sec</span>
              </div>
            </div>
            </div>
            <br>
            
            
            <!-- <div>offset_time: 0,
            offset_x:0,
            offset_y: 0,
            scale:0,
            duration: .5,
            children:false,
            stagger: false,
            stagger_time: .1,
            ease:"expo.out"</div> -->
            <label  for="a_custom_ease">Easing – </label>

            <select name="a_custom_ease_t" id="animation-custom-ease-type-t" ref="custom_ease_t" v-model="model.animation.custom.easeing[0]" style="display: inline-block">
              <option v-for="at,k in easing_options" :value="at.v" :key="k" >{{at.l}}</option>
            </select><span class="animation-easing-selection">{{ model.animation.custom.easeing[0] }}</span>.<select name="a_custom_ease_e" id="animation-custom-ease-type-e" v-model="model.animation.custom.easeing[1]" ref="custom_ease_e" style="display: inline-block;">
              <option value="in" >in</option>
              <option value="inOut" >inOut</option>
              <option value="out" >out</option>
            </select>
            <span class="animation-easing-selection" >{{ model.animation.custom.easeing[1] }}</span>
        </div>
        
      </div>
    </div>
    <br>
    <div class="ajs-ls__setting setting--enabled" >
      <input type="checkbox" name="enabled" id="enabled" v-model="model.enabled">
       <label for="enabled" style="margin-left:.5rem">Enable layout settings</label>

    </div>

    <div class="ajv-ls__wrapper" v-if="model.enabled">
    <div class="ajv-ls__setting setting--columns">
      <span class="setting__label">Columns</span>
         <input type="checkbox" v-model="model.use_columns" name="use_columns" id="use-columns">
      <label for="use_padding" style="margin-left:.5rem">Use columns</label>
      <br>
      <br>
      <div class="setting__options" v-if="model.use_columns">
          <span class="setting__sublabel">Start : <b>{{model.column.start}}</b>  – End : <b>{{model.column.end}}</b> </span>
        <div class="sliders_control">
            <input id="fromSlider" type="range" v-model="model.column.start" value="1" min="-13" max="13"/>
            <input id="toSlider" type="range" v-model="model.column.end" value="13" min="-13" max="13"/>
        </div>
          <span class="setting__sublabel">Span : <b>{{model.column.span}}</b> {{ model.column.span == 0 && '( Disabled )' || ''}}</span>
        <div class="sliders_control">
            <input id="col-span" type="range" v-model="model.column.span" value="0" min="-12" max="12"/>
            
        </div>
      </div>
    </div>
   
    <div class="ajv-ls__setting setting--align">
      <span class="setting__label">Align</span>
      <div class="setting__options">
        <select name="" id="" v-model="model.align">
          <option v-for="vaopt,k in align_options" :key="k" :value="vaopt.v">{{ vaopt.l }}</option>
        </select>
        <!-- <div v-for="aopt,k in align_options" :key="k">
            <input type="radio" v-model="model.align" :id="'aopt_'+k" name="align" :value="aopt.v" >
            <label :for="aopt.v">{{aopt.l}}</label>
        </div> -->
      </div>
      <span class="setting__label">Align content</span>
      <div class="setting__options">
        <select name="" id="" v-model="model.align_content">
          <option v-for="vaopt,k in halign_options" :key="k" :value="vaopt.v">{{ vaopt.l }}</option>
        </select>
        <!-- <div v-for="aopt,k in halign_options" :key="k">
            <input type="radio" v-model="model.align_content" :id="'aopt_'+k" name="align_content" :value="aopt.v">
            <label :for="aopt.v">{{aopt.l}}</label>
        </div> -->
      </div>
      <span class="setting__label">Vertical align self</span>
      <div class="setting__options">
          <select name="" id="" v-model="model.valign">
          <option v-for="vaopt,k in valign_self_options" :key="k" :value="vaopt.v">{{ vaopt.l }}</option>
        </select>
        <!-- <div v-for="vaopt,k in valign_self_options" :key="k">
            <input type="radio" v-model="model.valign" :id="'vaopt_'+k" name="valign" :value="vaopt.v">
            <label :for="vaopt.v">{{vaopt.l}}</label>
        </div> -->
      </div>
      <span class="setting__label">Vertical align content</span>
      <div class="setting__options">
        <select name="" id="" v-model="model.valign_content">
          <option v-for="vaopt,k in valign_options" :key="k" :value="vaopt.v">{{ vaopt.l }}</option>
        </select>
        <!-- <div v-for="vaopt,k in valign_options" :key="k">
            <input type="radio" v-model="model.valign_content" :id="'vaopt_'+k" name="valign_content" :value="vaopt.v">
            <label :for="vaopt.v">{{vaopt.l}}</label>
        </div> -->
      </div>
    </div>
    <div class="ajv-ls__setting setting--spacing">
      <span class="setting__label">Spacing</span>
       <div class="setting__options">
      <input type="checkbox" v-model="model.use_margin" name="use_margin" id="use-margin">
      <label for="use_margin" style="margin-left:.5rem">Use margin</label><br>
      <input type="checkbox" v-model="model.use_padding" name="use_padding" id="use-padding">
      <label for="use_padding" style="margin-left:.5rem">Use padding</label>
      </div>
    </div>
     <div class="ajv-ls__setting setting--classes">
          <span class="setting__label">Extra classes</span>
          <div class="setting__options">
            <input type="text" name="extra classes" id="extra-classes" v-model="model.extra_classes">
          </div>

     </div>
     </div>
      <div class="ajs-ls__setting resets">
      <!-- <button @click="resetSetting('layout')"> Reset Layout</button> -->
      <button @click="resetSetting('animation',true)"> Reset Animation</button>
    </div>
  </div>
</template>

<script>
export default {
  mixins: [window.Storyblok.plugin],
  data() {
    return {
      current_classes:'',
      current_classes_arr: [],
      animation_options_types: [
        { l: 'Default (fade-in)', v: 'default' },
        {
          l: 'Move and fade-in', v: 'move-fade' },
        // {
        //   l: 'Move from side and fade-in', v: 'move-side-fade', options: [
         
        // ] },
        { l: 'Custom settings', v: 'custom' },

      ],
      setting_options: {
        'move-fade': [
           {l:'From top',v:'from-top'},{l:'From bottom',v:'from-bottom'},{l:'From left',v:'from-left'},{l:'From right',v:'from-right'}
        ]
      },
      align_options: [
        { l: "none", v: "" },
        { l: "Align left", v: "align-left" },
        { l: "Align center", v: "align-center" },
        { l: "Align right", v: "align-right" },
        { l: "Wide width", v: "align-wide" },
        { l: "Full width", v: "align-full" },
       
      ],
      trigger_options: [
        {l:"Default",v:"default"},
        {l:"Top",v:"top"},
        {l:"Center",v:"center"},
        { l: "Bottom", v: "bottom" },
        {l:"Custom",v:"custom"}
      ],
      easing_options: [
        {l:'Expo',v:'expo'},
        {l:'Linear',v:'none'},
        {l:'Sine',v:'sine'},
        {l:'Power2',v:'power2'},
        {l:'Circular',v:'circ'},
      ],
      selected_easing_type: '',
      selected_easing_ease:'',
      columns_options:[],
      halign_options:[

         { l: "none", v: "" },
         { l: "Start", v: "content-start" },
        { l: "Center", v: "content-center" },
        { l: "Stretch", v: "items-stretch" },
       
         
         { l: "End", v: "content-end" },
      ],
      transform_origin_options:[
  {l:'Top Left',v:'top left'},
{l:'Top Center',v:'top center'},
{l:'Top Right',v:'top right'},
{l:'Center Left',v:'center left'},
{l:'Center Center',v:'center center'},
 {l:'Center Right',v:'center right'},
{l:'Bottom Left',v:'bottom left'},
{l:'Bottom Center',v:'bottom center'},
  {l:'Bottom Right',v:'bottom right'}
],
      valign_self_options:[

         { l: "none", v: "" },
         { l: "Start", v: "self-start" },
         { l: "Center", v: "self-center" },
         { l: "Stretch", v: "self-stretch" },
         { l: "End", v: "self-end" },
      ],
      // use_animation:false,
      // animation_options: [
      //   { l:"Fade",v:"a-fade"},
      //   { l: "Move", v: "a-move" },
      //   { l:"Trigger on scroll",v:"a-scrolltrigger"}
        
      // ],
      valign_options:[

        { l: "none", v: "" },
               { l: "Start", v: "justify-start" },
        { l: "Center", v: "justify-center" },
           { l: "Stretch", v: "justify-stretch" },
         { l: "End", v: "justify-end" },
     
      ]
    };
  },
  methods: {
    handleClasses(str){
      this.$data.extra_classes_arr = str.split(/[\s,]+/)
      // console.log(this.$data.extra_classes_arr)
       return str.split(/[\s,]+/)
    },
    getSettingOptions(setting) {
      var options = this.$data.setting_options[setting]
      if(options) return options
    },
    resetSetting(type, bypass) {

      console.log('resetSetting:', type, bypass);
      //bypass || confirm(`Are you sure you want to reset ${type} settings`)
      if (confirm(`Are you sure you want to reset ${type} settings`)) {
        // Save it!
        //  console.log('resetSetting:',type);
        if (type == "animation") {
              console.log("here")
                this.$set(this.model.animation, 'animation', this.initWith().animation)
               this.model.a_enabled = false
                this.$emit("changed-model",this.model)
              }
              else if(type == "layout") this.$emit("changed-model", { ...this.initWith() }); 
        } else {
          // Do nothing!
          // console.log('Thing was not saved to the database.');
      }

   
    },
    // toggleDropdown(id) {
     
    //   // console.log(this.$refs[id].dispatchEvent(new Event('click')))
    // },
    initWith() {
      let ret_ob = {
        plugin: "afx-layout-settings",
        enabled:false,
        a_enabled: false,
       
        animation: {
          type: "default",
          link_scroll:false,
          // repeat: false,
          direction: 'from-top',
         
          custom: {
            to:false,
            offset_time: 1,
            offset_x:0,
            offset_y: "+=100px",
            rotation:0,
            scale:1,
            duration: 2,
            opacity:0,
            children:true,
            stagger: true,
            stagger_time: .2,
            easeing: ['expo', "out"],
            trigger_start: 'default',
            trigger_start_custom: '',
            trigger_end: 'default',
            trigger_end_custom: '',
            triggers:false,
            
            ease: "expo.out",
            transform_origin:'center center',
            
          }
        },
        align: "",
        align_content:"",
        valign: "",
        valign_content: "",
        use_columns:false,
        column: {
          start: 1,
          end: 13,
          span: 0,
        },
        extra_classes_arr: [],
        extra_classes: '',
        use_margin: true,
        use_padding: false,
      }
        // console.log(ret_ob)
      return ret_ob
    },

    pluginCreated() {
      //  setInterval(() => {
      //   this.$emit('get-context')
      // }, 100)
      // console.log("get context")
      // this.$emit('get-context')
      // this.$onGetContext(() => {
      //   // console.log(this.model)
      //   if (!this.model.animation) {
      
      //     this.resetSetting("animation",true)
      //   }
      // })
      // eslint-disable-next-line
      // console.log(
      //   "View source and customize: https://github.com/storyblok/storyblok-fieldtype"
      // );
    },
  },
  computed: {
    
  },
  mounted() {
    console.log("mounted model ", this.model)
  },
  created() {
    // console.log("this.model.animation",this.model.animation)
    // if (!this.model.animation) {
      
    //   this.resetSetting("animation",true)
    // }
    // console.log("created with model : ",this.model)
    // // console.table(this.model.animation)
    // if (!this.model.animation) {
    //   this.model.animation = { ...this.initWith().animation }
    //   console.log(this.model)
    //    this.$emit("changed-model",  this.model);
    // }
   
  },
  watch: {
    model: {
      handler: function (value) {
        if(value.extra_classes != this.$data.extra_classes){
           this.$data.extra_classes = value.extra_classes
          value.extra_classes_arr = this.handleClasses(value.extra_classes) 
        }
     
        if (!value.animation) {
    
          this.$set(value, 'animation', this.initWith().animation)
        
        }
    
        this.$emit("changed-model", value);
      },
      deep: true,
    },
  },
};
</script>

<style >
.ajv-ls{
  overflow: hidden;
  padding-right:1rem;
  box-sizing: border-box;
}
.ajv-ls h4{
  font-weight: bold;
}
.ajv-ls input[type="checkbox"]:checked+label, .ajv-ls input[type="radio"]:checked+label{
  font-weight: bold;
}
.ajv-ls__wrapper{
 margin-top:1rem;
 padding-left:1.6rem;
}
.setting__label{
  display:block;
  margin-bottom:.5rem;

  font-weight: bold;
}
.ajs-ls__setting.resets{
  margin:1rem 0px;
}
.indent-group {
  position: relative;
  padding-left:1.5rem;
  padding-top:.5rem;
  padding-bottom:1rem;
}
.indent-group::before{
  content:"";
  height:100%;
  position: absolute;
  left:.4rem;
  top:-.5rem;
/* display: inline-block; */
  border-left:2px solid #c3c3c3;
  
}
.ajs-ls__setting.resets button{
  background-color: transparent;
  /* border:none; */
  font-weight: bold;
  opacity: .5;
  color:#000;
  margin-right:.5rem;
  border-radius: 5px;
  /* display: block; */
  padding:10px 16px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: all .25s ease-out;
}
label small{
  font-weight: bold;
}
input+.input_after{
  position: absolute;
  right:2rem;
  color:#FFF;
  background-color: rgb(159, 159, 159);
  min-width: 30px;
  padding:.75rem;
  text-align: right;
  display: none;
}
.ajs-ls__setting.resets button:hover{
  background-color: crimson;
  color:#FFF;
  opacity: 1;
  border-color: crimson;
}
.setting__transform-origin{
 /* margin-top:.5rem; */
      display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 50px;
    height: 50px;
    justify-content: space-between;
    align-content: space-between;


}
.setting__transform-origin input{
  width:30%;
 
  margin:0px;
  padding:10%;
  position:relative;
}

.setting__sub-settng{
  padding:1rem;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
}
.setting__sub-settng input[type="text"], .setting__sub-settng input[type="number"]{
  width: 100%;
  margin-bottom: 1rem;
}
#animation-custom-ease-type-t,#animation-custom-ease-type-e{

    background-color: transparent;
    border: none;
    text-decoration: underline;
    font-weight: bold;
    padding: 0px;
    opacity: 0;
    position: absolute;
    /* width: 100%; */
    height:100%;
    display: inline-block;
    appearance: none;
    height: auto;
 vertical-align: baseline;
 background-image: none;
    /* line-height: 1rem; */
    /* margin-left:.5rem; */
}
.animation-easing-selection{
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.sliders_control{
  margin-bottom:.5rem;
  
}
  .sliders_control input{
   width: 100%; 
  }
  
.ajv-ls__setting{
  box-sizing: border-box;
  margin-bottom:1rem;
}
.setting__options{
  margin-bottom: 1rem;
  /* margin-left: 1rem; */
}
.ajv-ls__setting label{
  /* margin-left:.5rem; */
}
.p-metatags__google-title {
  color: blue;
  text-decoration: underline;
}

.p-metatags__google-link {
  color: green;
}

.p-metatags__preview {
  margin: 5px 0 15px;
  padding: 10px;
  color: #000;
  background: #fff;
}
</style>
