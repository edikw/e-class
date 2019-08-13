<template>
  <div class="search bg-light" v-if="data">
    <div class="container p-0">
      <div class="my-4" v-if="data.length > 0">
        <h5 class="px-3 font-weight-bold">{{data.length}} Result For {{dataKeyword}}</h5>
      </div>
      <Pagination :searchresult="data" v-if="data.length>0"/>
        <div class="row py-5 justify-content-center m-0" v-else>
            <div class="py-lg-5" v-if="!loading">
              <div class="col-12 bg-light py-lg-5 my-lg-5">
                <h1 class="display-4 bg text-center">Hello Student</h1>
                <p class="lead text-center px-3 px-lg-0 border-bottom">the word you entered does not match</p>
                <div class="text-right">
                  <router-link class="btn btn-primary rounded-0" to="/" role="button">Back</router-link>
                </div>
              </div>
            </div>
            <div class="row justify-content-center py-5" v-if="loading">
              <div class="py-5">
                <div class="loader"></div>
              </div>
            </div>
        </div>
    </div>
	</div>
</template>

<script>
    import App from '../../App.vue'
    import Pagination from '../../views/PaginationSearch.vue'
    import axios from 'axios'


  export default{
    name: 'search',
    components: {Pagination},
    data(){
      return {
        loading: false,
        data: null,
        dataKeyword: null,
        url: App.data().ListUrl.urlCourses,
        pageSize: 2,
        currentPage: 0,
      }
    },
    mounted() {

      if(this.$route.name == 'search'){
        this.dataKeyword = null
        this.dataKeyword = this.$route.query.keyword;
        this.postSearch()

      }

    },
    methods: {
      postSearch(){
        this.loading = true;

        var arr = []

        var dataSend = {
          search : this.dataKeyword.toLowerCase()
        }
         axios.post(App.data().ListUrl.urlCoursesPage, dataSend).then(res => {
            if(res.status == 200){
              res.data.result.map( data => {
                arr.push(data)
              })
            }
          }).catch(e =>{
            this.loading = false
            
          })

        this.data = arr;
      }
      }
    }

</script>

<style scoped>
  a:hover {
    text-decoration: none;
  }
  .loader {
    border: 12px solid #f3f3f3;
    border-radius: 50%;
    border-top: 12px solid #627eff;
    /*border-bottom: 15px solid #007bff;*/
    width: 100px;
    height: 100px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>