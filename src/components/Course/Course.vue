<template>
	<div class="container-fluid bg-light p-0">
		<div class="bg-dark text-white" v-if="datacourse">
			<div class="container">
				<div class="row m-0">
					<div class="col-12 p-0">
						<div class="d-block d-sm-flex align-items-center my-4">
							<!-- Course Thumbnail -->
							<div class="d-inline-block col-12 col-sm-5 col-md-4 col-lg-3 p-0">
								<div class="course-thumb">
									<img v-bind:src="datacourse.thumbnail" >
								</div>
							</div>
							<div class="d-inline-block ml-0 mt-4 ml-sm-4 mt-sm-0">
								<!-- Course Information -->
								<h4 class="text-uppercase font-weight-bold">{{datacourse.title}}</h4>
								<p class="m-0 ">{{datacourse.subtitle}}</p>
								<p class="m-0" >Instructor :<br>
								<span class="mr-2" v-for="(ins, i) in datacourse.instructors" v-bind:key="i">{{ins.name}}</span></p>
								<!-- JOIN BUTTON - belum selesai -->
								<div class="mt-2" v-if="!joined(datacourse)">
									<button v-if="join" class="btn btn-warning rounded-0 font-weight-bold" type="button" v-on:click="joinCourse(datacourse.aid)">Join Course</button>
									<button v-else class="btn btn-warning rounded-0 font-weight-bold" type="button" data-toggle="modal" data-target="#buttonModal">Join Course</button>
								</div>
								<div class="mt-2" v-else>
									<button class="btn btn-danger rounded-0 font-weight-bold" type="button" v-on:click="unjoin(datacourse.aid)">Unjoin Course</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container" v-if="datacourse">
			<div class="row flex-column">
			<div class="col-12 col-md-8 mt-5">
				<h5 class="font-weight-bold">Description:</h5>
				<p>{{datacourse.description}}</p>
			</div>
			<div class="col-12 col-md-8 py-5">
				<div class="shadow bg-white" v-for="(data, i) in datacourse.sections" v-bind:key="i">
				<button class="btn rounded-0 bg-white w-100 text-left border-0 p-3 font-weight-bold d-flex align-items-center" type="button" data-toggle="collapse" :data-target="'#collapseExample' + i" aria-controls="collapseExample" aria-expanded="false">
				<font-awesome-icon icon="minus" class="mr-2"></font-awesome-icon>
				
				<h6 class="font-weight-bold m-0">{{data.title}}</h6>
				</button>
				<div class="collapse w-100 rounded-0 bg-white border-top" v-bind:id="['collapseExample' + i]">
					<ul class="p-0 m-0" >
					<div class="w-100 bg-white border-bottom" v-for="(video, j) in data.videos" v-bind:key="j">
						<li>
							<div v-if="video.locked > 0" class="row text-muted  justify-content-around align-items-center text-left p-3" data-toggle="modal" data-target="#alertSectionCourse">
								<font-awesome-icon icon="play-circle"></font-awesome-icon>
								<span class="col-7">{{video.title}}</span>
								<font-awesome-icon icon="lock" class=" text-center"></font-awesome-icon>
								<span class="col-2">{{ video.duration}}</span>
							</div>
							<div class="row text-primary justify-content-around align-items-center text-left p-3" v-else>
								<font-awesome-icon icon="play-circle"></font-awesome-icon>
								<span class="col-7" data-toggle="modal" data-target="#exampleModalCenter">{{video.title}}</span>
								<!-- <span class="col-2 text-center">Preview</span> -->
								<font-awesome-icon icon="check" class="text-center text-primary"></font-awesome-icon>
								<span class="col-2">{{ video.duration}}</span>
							</div>

							<!-- modal -->
							<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" v-on:click="stopVideo">
								<div class=" row modal-dialog modal-dialog-centered modal-lg " role="document">
								<div class="modal-content border-0 col-12">
									<div class="modal-header border-0">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="stopVideo">
									<font-awesome-icon icon="times" id="close"></font-awesome-icon>
									</button>
									</div>
									<div class="modal-body">
									<iframe width="100%" height="400" v-bind:src="video.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="iframeCourse" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>
									</div>
								</div>
								</div>
							</div>
						</li>
					</div>
					</ul>
				</div>
				</div>
			</div>
			<div class="col-12 col-md-8 py-5" v-if="join">
				<div class="shadow bg-white">
					<div class="text-center p-3 bg-dark text-white border-bottom">
						<h6 class="font-weight-bold m-0">Question & Answer</h6>
					</div>
					<!-- Ask new question btn wrapper -->
					<div class="p-4">
						<button v-if="joined(datacourse)" class="btn btn-primary rounded-0 border-0 font-weight-bold" data-toggle="collapse" data-target="#send" aria-controls="send" aria-expanded="false"><font-awesome-icon icon="plus" class="mr-2"></font-awesome-icon>Ask a new question</button>
						<!-- Alert join first -->
						<button v-else type="button" class="btn btn-primary rounded-0 border-0 font-weight-bold" data-toggle="modal" data-target="#alertSection">
							<font-awesome-icon icon="plus" class="mr-2"></font-awesome-icon>Ask a new question
						</button>

						<!-- Modal -->
						<div class="modal fade" id="alertSection" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content bg-white">
									<div class="modal-header">
										<h4 class="modal-title" id="exampleModalCenterTitle">Silahkan Join Courses untuk Melakukan Pertanyaan </h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div class="mt-2 text-right" v-if="!joined(datacourse)">
											<button v-if="join" class="btn btn-warning rounded-0 font-weight-bold" type="button" v-on:click="joinCourse(datacourse.aid)" data-dismiss="modal" aria-label="Close">Join Course ?</button>
											<button v-else class="btn btn-warning rounded-0 font-weight-bold" type="button" data-toggle="modal" data-target="#buttonModal">Join Course</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="modal fade" id="alertSectionCourse" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content bg-white">
								<div class="modal-header">
									<h4 class="modal-title" id="exampleModalCenterTitle">Silahkan Join Course untuk melihat course </h4>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div class="mt-2 text-right">
										<button class="btn btn-warning rounded-0 font-weight-bold" type="button" v-on:click="joinCourse(datacourse.aid)" data-dismiss="modal" aria-label="Close">Join Course ?</button>	
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Collapse New Question-->
					<div class=" collapse m-0" id="send" v-if="user">
						<div class="w-100 py-4 mb-2">
							<div class="col-lg-8">
								<div class="media px-0 px-lg-1 align-items-center">
									<div class="ques">
									<img v-bind:src="user.avatar" alt="Generic placeholder image" id="quesimg">
									</div>
									<div class="media-body px-3">
									<div class="speech-bubble-send">
										<div class="p-2">
										<textarea type="text" name="send" rows="4" class="border-0 w-100 p-0 m-0" id="sendTextarea" v-model="newcomment">
										</textarea>
										</div>
									</div>
									</div>
								</div>
								<div class="text-right px-3 p-2">
									<button class="btn btn-warning border-0" type="button"@click="sendComment">Send</button>
								</div>
							</div>
						</div>
					</div>
					<div class="row m-0">
						<div class="col-12 col-lg-12 mb-3">
							<!-- Single Comment -faris -->
							<div v-for="(comment, index) in dataCommentPagin" v-if="comment" :key="index">
								<!-- MAIN COMMENT -->
								<!-- {{comment}} -->
								<div class="d-flex align-items-center mb-2">
									<!-- User Avatar -->
									<div class="ques d-inline-block">
										<!-- <img v-if="comment.user" v-bind:src="comment.user.avatar" alt="Generic placeholder image" id="quesimg"> -->
										<img :src="user.avatar" v-if="comment.user_id == user.id">
									</div>
									<!-- Text -->
									<div class="col-8 px-3 d-inline-block">
										<div class="speech-bubble">
											<div class="p-2">
												<p class="m-0">{{comment.text}}</p>
											</div>
										</div>
										<div class="date d-flex">
											<p class="d-inline-block m-0 mr-1 mr-lg-3" v-if="comment.created_at">{{comment.created_at._seconds | date}}</p>
											<div class="d-flex" v-if="joined(datacourse)">
												<!-- <span class="text-primary" data-toggle="collapse" :data-target="'#answer' + index" aria-controls="answer" aria-expanded="false">Answer</span> -->
												<div v-if="showAnswerDelete(comment)">
													<font-awesome-icon icon="trash" class="ml-2" @click="deleteComment(index)"></font-awesome-icon>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- Collapse Answer -->
								<!-- <div class=" d-flex justify-content-center" v-if="user">
									<div class="collapse col-12 col-lg-10"  v-bind:id="['answer'+index]" >
										<div class="px-0 px-lg-1 d-flex align-items-center">
											<div class="ques">
												<img v-bind:src="user.avatar" alt="Generic placeholder image" id="quesimg">
											</div>
											<div class=" d-inline-block media-body px-3">
												<div class="speech-bubble">
													<div class="p-2">
														<textarea type="text" name="answer" rows="4" class="border-0 p-0 m-0 w-100" v-model="answerComment"> 
														</textarea>
													</div>
												</div>
											</div>
										</div>
										<div class="text-right px-3 p-2">
											<button class="btn btn-warning border-0" type="button" @click="sendAnswer(index)">Reply</button>
										</div>
									</div>
								</div> -->
								<!-- REPLIES -->
							<!-- 	<div class="ml-5 mb-3" v-for="(reply, replyIndex) in comment.replies" :key="replyIndex">
									<div class="d-flex align-items-center">
										<div class="quesAnswer">
											<img v-bind:src="comment.replies.avatar" alt="Generic placeholder image" id="quesimg">
										</div>
										<div class="col-10 px-3">
											<div class="speech-bubble">
												<div class="p-1">
													<p class="m-0"> -->
													<!-- YAng Asli reply.text -->
							<!-- 						{{comment.replies.text}}</p>
												</div>
											</div>
											<div class="date d-flex">
												<p class="d-inline-block m-0" v-if="reply.created_at">{{reply.created_at._seconds | date}}</p>
												<div v-if="joined(datacourse)">
													<font-awesome-icon icon="trash" class="ml-2" @click="deleteReply(replyIndex)" v-if="showAnwerReplie(reply)"></font-awesome-icon>
													
												</div>
											</div>
										</div>
									</div>
								</div> -->
							</div>
						</div>
					</div>
					<div class="d-flex p-3 justify-content-end">
						<div class="p-2">
							<p class="m-0 text-muted" style="cursor: pointer;" v-on:click="Previous" v-if="page >=2">Previous</p>
							<p class="d-none" v-if="page">Previous</p>
						</div>
						<div class="p-2">
							<p class="m-0 text-muted" style="cursor: pointer;" v-on:click="next" v-if="!disabledButton">Next</p>
							<p class="d-none" v-if="disabledButton" disabled>Next</p>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		
		<!-- MODAL -->
		<div class="modal fade" id="buttonModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content bg-light">
					<div class="modal-header border-0">
						<h5 class="modal-title text-dark" id="exampleModalLabel"></h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p class="text-dark text-center m-0">Silahkan login terlebih dahulu untuk join course ini.</p>
					</div>
					<div class="modal-footer border-0">
						<router-link to="/login">
							<button type="button" class="btn btn-primary rounded-0" data-dismiss="modal" aria-label="Close">Login</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<!-- Sampai sini batesnya -->
		<div class="container" v-if="loading">
			<div class="row py-0 py-lg-5 my-lg-5 my-0">
				<div class="col-12 py-5 my-lg-5 my-0">
					<div class="d-flex justify-content-center py-5 my-lg-5 my-0">
						<div class="loader"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import App from '../../App.vue'

	$("#exampleModalCenter").on('hidden.bs.modal', function (e) {
	$("#exampleModalCenter iframe").attr("src", $("#exampleModalCenter iframe").attr("src"));
	});

	export default {
		name: 'course',
		data(){
			return {
				images2 : require('../../assets/tes.jpg'),
				datacourse: null,
				join: false,
				dataData: null,
				user: null,
				newcomment: '',
				answerComment: '',
				commentsId: null,
				dataLocked: [],
				buttonAnswer: false,
				loading: false,
				dataCommentPagin: [],
				page: 1,
				size: 5,
				disabledButton: false,
				collapseButtonShow: false
			}
		},
		mounted() {
			var EclassId = localStorage.getItem('ECLASS-id');

			this.dataData = this.$route.params.id
			console.log('this data', this.dataData)
			this.getCourse();
			this.getComment();
			
			if(EclassId){
				this.getUser()
			}


			if(localStorage.getItem('EClassToken')) {
				this.join = true
			}
		},
		methods: {
			getUser(){

				var EclassId = localStorage.getItem('ECLASS-id');

				axios.get(App.data().ListUrl.urlUser + EclassId).then(res=>{
					this.user = res.data.userData
					this.user.my_course.map(data => {
						if(data.aid == this.datacourse.aid){
							this.datacourse.sections.map(section => {
								section.videos.map(video => {
									video.locked = false;
								})
							})
						}
					});
				});

			},
			getCourse(){
				this.loading = true;

				this.datacourse = null;

				axios.get( App.data().ListUrl.UrlCoursesByid + this.dataData).then(res=>{
					if(res.status == 200){
						this.datacourse = res.data.result;
							this.loading = false;
					}else {
						this.loading = false;
					}
					this.loading = false;
				});
			},
			getComment(){
				var pathQuery = '?' + 'page' + '=' + this.page + '&' + 'size' + '=' + this.size
				
				console.log('id course', this.dataData);

				axios.get(App.data().ListUrl.urlCommentCourse + this.dataData + pathQuery).then(res =>{
					this.dataCommentPagin = res.data.result
				})
			},
			stopVideo(){
				document.getElementById('iframeCourse').src = document.getElementById('iframeCourse').src;
			},
			joinCourse(id){
				var token = localStorage.getItem('EClassToken');

				const params = {
					headers: {
						'x-access-token': token,
						'Content-Type':'application/json',
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
					}
				}

				axios.post(App.data().ListUrl.UrlJoinCourse + id, {}, params).then(response => {
					if(response.status === 200) {
						alert('Sukses')
						this.$router.push('/')
					} else {
						alert('Gagal, Silahkan Coba lagi')
					}
				}).catch(e => {
					alert('Gagal,Silahkan Coba Lagi')
				})
			},
			joined(datacourse){
				if(this.user){
					var joined = false;
					this.user.my_course.map(c => {
						if(c.aid === datacourse.aid){
							joined = true;
						}
					})
					return joined;
				}
			},
			showAnswerDelete(data){
				if(this.user){
					var show = false;
					if(data.user_id === this.user.id){
						show = true;
					}
					return show;
				}
			},
			showAnwerReplie(dataReply){
				if(this.user){
					var showReply = false;
					if(dataReply.user_id === this.user.id){
						showReply = true;
					}
					return showReply;
				}
			},
			unjoin(id){
				var token = localStorage.getItem('EClassToken');
				const params = {
					headers: {
						'x-access-token': token,
						'Content-Type':'application/json',
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
					}
				}
				axios.post(App.data().ListUrl.UrlUnjoinCourse + id, {}, params).then(response => {
					if(response.status === 200) {
						alert('Sukses')
						this.$router.push('/')
					} else {
						alert('Gagal, Silahkan Coba Lagi')
					}
				}).catch(e => {
					alert('Gagal, Silahkan Coba Lagi')
				})

			},
			sendComment(){
				var data = {
					user_id: localStorage.getItem('ECLASS-id'),
					text: this.newcomment,
					course_id: this.datacourse.id
				}

				axios.post(App.data().ListUrl.urlAddComment, data).then(res => {
					if(res.status === 200){
						this.getComment();
						alert('Your Comment is Success')

						this.dataCommentPagin.$forceUpdate()
						// window.location.reload()
					}
					this.newcomment = ''
				})
				.catch(err => {
					// alert('failed')
				})
			},

			sendAnswer(index){
				console.log("APA INI", index)
				var data ={
					user_id: localStorage.getItem('ECLASS-id'),
					text: this.answerComment,
					course_id: this.datacourse.id,
					avatar: this.user.avatar
				}

				console.log('kirim replay', data)

				var comment_id = this.datacourse.comments[index].id;
				console.log("coment id", comment_id)

				// axios.post(App.data().ListUrl.urlReplyComment + comment_id, data).then(res=>{
				// 	if(res.status === 200){
				// 		this.getComment();
				// 		alert('Your Reply is Success')
				// 		window.location.reload()
				// 	}
				// })
				// .catch(err =>{
				// 	alert("Not Success")
				// })
			},

			deleteComment(index){
				var commentid = this.datacourse.comments[index].id;
				var token = localStorage.getItem('EClassToken');
				
				const   params = {
					headers : {
						'x-access-token': token,
						'Content-Type':'application/json',
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
					} 
				}

				axios.delete(App.data().ListUrl.urlDeleteComment + this.datacourse.id + '/' + commentid, params).then(res =>{
					alert("Deleted is Success")
					this.getComment();
				})
				.catch(err =>{
					alert("Deleted not Success")
				})
			},

			deleteReply(replyIndex){
				var commentid = this.datacourse.comments[replyIndex].aid;
				var replyid = this.datacourse.comments[replyIndex].replies[replyIndex].id

				console.log('id comment', commentid);
				console.log('id reply', replyid);
				var token = localStorage.getItem('EClassToken');
				
				const params = {
					headers : {
						'x-access-token': token,
						'Content-Type':'application/json',
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
					} 
				}

				axios.delete(App.data().ListUrl.urlDeletReply + commentid + '/' + replyid, params).then(res =>{
					alert("Deleted is Success")
					this.getComment();
				})
				.catch(err =>{
					alert("Deleted not Success")
				})
			},
			next() {

				console.log('page sebelum next', this.page)
				this.page++

				var pathQuery = '?' + 'page' + '=' + this.page + '&' + 'size' + '=' + this.size

				console.log('page setelah next', pathQuery)

				axios.get(App.data().ListUrl.urlCommentCourse + this.dataData + pathQuery).then((res) => {
					if(res.status === 200){
						this.dataCommentPagin = []
						this.dataCommentPagin = res.data.result
						console.log("COMENT DAYA", this.dataCommentPagin)
					}
				})
				.catch(err => {
					console.log("data COMENT di catch ERRRROR", this.dataCommentPagin)
					this.disabledButton = true;

				})
				.then(() => {
					this.loading = false;
				})
			},
			Previous(){
				console.log('page sebelum di mkurangi', this.page)
				if(this.page > 1){
					this.page--
					console.log('page sekarang', this.page)

					var pathQuery = '?' + 'page' + '=' + this.page + '&' + 'size' + '=' + this.size

					console.log('page setelah di kurangi', pathQuery)

					axios.get(App.data().ListUrl.urlCommentCourse + this.dataData + pathQuery).then((res) => {
						if(res.status === 200){
							this.dataCommentPagin = res.data.result
							this.disabledButton = false;
						}
					})
					.catch(err => {
						console.log("PREVIOUS ERRRROR")
						this.disabledButton = true;
					})
					.then(() => {
						this.loading = false;
					})

				}
			}
		},
		filters: {
			date(secs){
				const options = {
					year: 'numeric', month: 'short', day: 'numeric',
					hour: 'numeric', minute: 'numeric',
					hour12: false
				};

				var t = new Date(1970, 0, 1); // Epoch
				t.setSeconds(secs);
				var dt = new Date(t);
				return new Intl.DateTimeFormat('en-GB', options).format(dt);
			}
		}
	}
</script>

<style scoped>

#question, #send{
	background-color: #d6dcdc;
}

li {
	list-style: none;
}
a:hover {
	text-decoration: none;
}
#buttonQuestion {
	background-color: #7faefe;
}
.ques {
	width: 40px;
	height: 40px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: inline-block;
	position: relative;
	overflow: hidden;
}
.quesAnswer {
	width: 30px;
	height: 30px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: inline-block;
	position: relative;
	overflow: hidden;
}
#quesimg {
	width: 100%;
	position: absolute;
	justify-content: center;
	display: flex;
	top: 0;
	left: 0;
}
textarea {
	background: #d6dcdc;
	outline: none;
	box-shadow:none !important;
}
 #sendTextarea {
	background: #fff;
 }
.speech-bubble {
	position: relative;
	background: #d6dcdc;
	border-radius: .4em;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 17px solid transparent;
	border-right-color: #d6dcdc;
	border-left: 0;
	border-bottom: 0;
	margin-top: -8.5px;
	margin-left: -17px;
}
.date {
	font-size: 12px;
	color: #6c757d;
}
#garisQuestion {
	border-bottom: 3px solid #f1f1f1;
}
.speech-bubble-send {
	position: relative;
	background: #fff;
	border-radius: .4em;
}

.speech-bubble-send:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 17px solid transparent;
	border-right-color: #fff;
	border-left: 0;
	border-bottom: 0;
	margin-top: -8.5px;
	margin-left: -17px;
}
span {
	cursor: pointer;
}
button {
	outline: none;
	box-shadow:none !important;
}

.modal-content {
	background-color: transparent;
}
#close {
	color: #fff;
	opacity: 1;
	font-size: 35px;
}

.course-thumb {
	position: relative;
	overflow: hidden;
	height: 200px;
	border: 1px solid #dee2e6 !important;
}

.course-thumb img {
	height: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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