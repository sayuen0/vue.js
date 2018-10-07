(function(){
  'use strict';

  var likeComponent = Vue.extend({
    // props:['message'],
    props:{
      message:{
        type:String,
        default:'Like'
      }
    },
    data:function(){
      return {
        count: 0
      }
    },
    template:'<button @click="countUp">{{message}} {{count}}</button>',
    methods:{
     countUp:function(){
       this.count++;
       this.$emit('increment');
     }
    }
  });


  var vm = new Vue({
    el:'#app',
    components:{
      'like-component':likeComponent
    },
    data:{
      newItem: '',
      todos:[],
      total:0
    },
    watch:{
      todos:{
        handler: function(){
          localStorage.setItem("todos",JSON.stringify(this.todos));
          // alert("Data saved!");
        },
        deep:true
      }
    },
    mounted: function(){
      this.todos=JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods:{
      incrementTotal: function(){
        this.total++;
      },
      addItem: function(){
        var item = {
          title:this.newItem,
          isDone: false
        }
        this.todos.push(item);
        this.newItem= '';
      },
      deleteItem: function(index){
        if(confirm('are you sure to delete?')){
          this.todos.splice(index,1);
        }
      },
      purge: function(){
        if(!confirm("delete finished?")){
          return;
        }
        // this.todos   = this.todos.filter(function(todo){
        //   return !todo.isDone;
        // });
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining:function(){
        return this.todos.filter(function(todo){
          return !todo.isDone;
        });
      }
    }
  })
})();
