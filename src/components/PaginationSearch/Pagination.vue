<template>
  <div v-if="totalPages() > 0" class="col-12 my-3 text-center">
    <div class="col-12">
      <span v-if="showPreviousLink()" class="btn btn-white rounded-0 pagination-btn border-0" v-on:click="updatePage(currentPage - 1)"> &#xab; </span>
      <span v-else class="btn disabled rounded-0 pagination-btn border-0"> &#xab; </span>

      <span class="mx-2">
        {{ currentPage | paging}} of {{ totalPages() }}
      </span>

      <span v-if="showNextLink()" class="btn btn-white rounded-0 pagination-btn border-0" v-on:click="updatePage(currentPage + 1)"> &#xbb; </span>
      <span v-else class="btn disabled rounded-0 pagination-btn border-0"> &#xbb; </span>
    </div>
    <div class="col-8 col-sm-6 col-md-4 col-lg-3 d-inline-block">
      <div class="input-group input-group-sm mb-3 border rounded">
        <input class="form-control bg-white shadow-none" placeholder="0" aria-label="Recipient's username" aria-describedby="basic-addon2" id="inputNumPage" type="number" value="numPage" v-model="inputedPage" min="1">
        <div class="input-group-append">
          <button class="btn btn-sm bg-dark text-white" v-on:click="gotoPage()">Go!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: ['datas', 'currentPage', 'pageSize'],
    data() {
      return {
        inputedPage: 0
      }
    },
    methods: {
      updatePage(pageNumber) {
        this.$emit('page:update', pageNumber);
      },
      totalPages() {
        return Math.ceil(this.datas.length / this.pageSize);
      },
      showPreviousLink() {
        return this.currentPage == 0 ? false : true;
      },
      showNextLink() {
        return this.currentPage == (this.totalPages() - 1) ? false : true;
      },
      gotoPage() {
        if(this.inputedPage>0){
          this.$emit('page:update', this.inputedPage - 1);
          this.inputedPage = 1;
        }else{
          this.inputedPage = 1;
        }
      }
    },
    filters: {
      paging(val){
        return parseInt(val) + 1;
      }
    }
  }
</script>

<style scoped>
  .pagination-btn {
    padding: 3px;
    cursor: pointer;
    user-select: none;
  }
  .pagination-btn:active {
    transform: scale(0.95);
  }
  
</style>
