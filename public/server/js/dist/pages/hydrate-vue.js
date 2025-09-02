let $085bce2762c19d8f$var$mountVueWidget=()=>{let{createApp:e}=Vue,{date:t,caption:d}=window.__INITIAL_SERVER_STATES__||{};e({data:()=>({date:t,caption:d}),template:`
      <div>
        <p>{{ caption }}</p>
        <p>Selected date: {{ date }}</p>
        <input type="date" v-model="date" />
      </div>
    `}).mount("#some-vue-widget")},$085bce2762c19d8f$var$vueWidget=document.querySelector("#some-vue-widget");$085bce2762c19d8f$var$vueWidget&&$085bce2762c19d8f$var$mountVueWidget();