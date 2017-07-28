document.body.onload = function() {
  
  setTimeout(function() {
    var preloader= document.getElementById('page__preloader');
    if( !preloader.classList.contains('done'))
      {
        preloader.classList.add('done');
      }
  },1000);
}
const ySearch = new Vue({
    el: "#app",
    data: {
        videoList: [],
        message: 'Healthy Relationships Example',
        numberPerPage: 5,
        page: 1,
        url: 'https://www.youtube.com/watch?v=',
        searchRes: '',
        flag: false
    },
    computed: {
        FilteredVideoList: function() {
            var self = this
            return self.videoList.filter(function(item) {
                return item.snippet.title.toUpperCase().indexOf(self.searchRes.toUpperCase()) !== -1
            })
        },
        VideoListPerPage: function() {
            return this.FilteredVideoList.slice((this.page - 1) * this.numberPerPage, this.page * this.numberPerPage)
        },
        pages: function() {
            let arr = [];
            let leng = Math.ceil(this.FilteredVideoList.length / 5);
            for (let i = 1; i < leng + 1; i++) {
                arr = arr.concat(i);
            }
            return arr
        }
    },
    mounted() {
        youtubeSearch('Healthy Relationships')
    },
    methods: {
        onClick: function(e) {
            e.preventDefault();
            youtubeSearch(this.$data.message)
        },
        onPageClick: function(e) {
            e.preventDefault();
            Vue.set(ySearch.$data, 'page', e.target.id)
        },
        onSortClick: function(e) {
            this.page = 1;
            this.flag = !this.flag;
            this.flag ? this.$data.videoList.sort(sortItemUp) : this.$data.videoList.sort(sortItemDown)
        }
    }
});

function sortItemUp(a, b) {
    if (a.snippet.title > b.snippet.title) {
        return 1;
    }
    if (a.snippet.title < b.snippet.title) {
        return -1;
    }
}

function sortItemDown(a, b) {
    if (a.snippet.title < b.snippet.title) {
        return 1;
    }
    if (a.snippet.title > b.snippet.title) {
        return -1;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/*function addConfirm() {

                  // Need Login
                  if (localStorage.getItem("username")){
                  // Start	
                  if (confirm("Do you want to add the video?")) {
                    var user = {};
										
										//alert($(this).attr('href'));
										//alert(this.items[0].snippet.title);
                    alert($(this).url('href'));
                    user.act = "add_youtube";
            				//user.video = $('#yk-video').html();
										
                    user.username = localStorage.getItem("username");

										
                    $.ajax( {
                      
                      url: "http://port-5001.mimi-mimiyu199137199.codeanyapp.com/service-test.html",
                      type: "POST",
                      data: user
                    });
                    return false;
                  }
                    // Need Login
                  }else{
                    alert("Need Login First!");
                  }
                }	*/
////////////////////////////////////////////////////////////////////////////////////////////////////

function youtubeSearch(searchValue) {
    gapi.load('client', function() {
        gapi.client.setApiKey('AIzaSyAcDIsD_ipHnojAvrGthtyunDoM6MLjd-g');
        gapi.client.load('youtube', 'v3', function() {
            var request = gapi.client.youtube.search.list({
                part: 'snippet',
                q: searchValue,
                type: 'video',
                maxResults: 20
            });
            request.execute(response => {
                let responseString = JSON.stringify(response, '', 2);
                Vue.set(ySearch.$data, 'videoList', response.items)
                console.log(response.items)
            })
        })
    })
}