<template>
	<div>
		<todo-item  v-for="database in visibleDatas" 
		v-bind:visibleDatas="visibleDatas"
		v-bind:currentpage="currentPage"
		v-bind:database="database"  
		:key="database.id"></todo-item>
		<pagination
			v-bind:datas="datas"
			v-on:page:update="updatePage"
			v-bind:currentPage="currentPage"
			v-bind:pageSize="pageSize"
		/>
	</div>
</template>

<script>
	import TodoItem from '@/components/PaginationSearch/TodoItem.vue';
	import Pagination from '@/components/PaginationSearch/Pagination.vue';

	export default {
		name: 'pager',
		props: ['searchresult'],
		components: {
			TodoItem,
			Pagination
		},
		data() {
			return {
				datas: [],
				currentPage: 0,
				pageSize: 5,
				visibleDatas: []
			};
		},
		mounted(){
			this.currentPage = 0;
		},
		beforeMount: function() {
			this.datas = [];
			if(this.searchresult){
				this.datas = this.searchresult;
			}
				this.updateVisibleDatas();
		},
		methods: {
			updatePage(pageNumber) {
				this.currentPage = pageNumber;
				this.updateVisibleDatas();
			},
			updateVisibleDatas() {
				this.visibleDatas = [];
				this.visibleDatas = this.datas.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);

				if (this.visibleDatas.length == 0 && this.currentPage > 0) {
						this.updatePage(this.currentPage - 1);
				}
			}
		},
		watch: {
			searchresult(val){
				this.datas = [];
				this.visibleDatas = [];
				this.datas = val;
				this.updateVisibleDatas();
			}
		}
	}
</script>

<style scoped>
	/*.pager {
		text-align:center;
		min-height: 420px;
	}*/
</style>
