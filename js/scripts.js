$(document).ready(function(){
	
var result1;
var result2;


$.when(
	$.ajax({
		url: 'include/categoryvideos.php',
		beforeSend: function(xhr) {
			xhr.setRequestHeader("loading");
		},success: function(data){
				result1= data;
		},error: function(xhr){
				$('#errorhandle').html(xhr.responseText);
		}
	}),
	$.ajax({
			url: 'include/videolist.php',
			type: 'POST',
			data:  {id : 0 },
			beforeSend: function(xhr) {
				$('#loading').show();
				$('#loadmore').hide();
			}, success: function(data){
				result2 = data;
			},error: function(xhr){
				$('#errorhandle').html(xhr.responseText);
			}
	})

).then(function(){
			//list of category
            $('<ul><li><a class="active" id="category-0" href="#">Popular</a></li>').appendTo('.portfolio-filter');
			var json = $.parseJSON(result1);
			if ( json.length !== 0 ) {
				$(json).each(function(i,val){
					$.each(val.items,function(k,v){
						if(v.snippet.assignable == true){
								if(v.id !== '' || v.snippet.title !== '' || v.id !== undefined || v.snippet.title !== undefined){
									
									var title = '';		
									if (v.snippet.title !== undefined) {
										title = v.snippet.title;
									}
									$('<li><a id="category-'+v.id+'" href="#">'+title+'</a></li>').appendTo('.portfolio-filter ul'); 						
								}else {
									$('#errorhandle').html('The video category is empty');
								}
							}
					});
				});	
			}else {
				$('#errorhandle').html('The video category is empty');
			}
			
			 $('</ul>').appendTo('.portfolio-filter');
			// list of video
			loadlist(result2);
			
			
	$('.portfolio-filter ul li a').on('click',function(event) {
		event.preventDefault(); 
		$('.portfolio-filter ul li a').removeClass('active');
		$(this).addClass('active');
		var idcategory = $(this).attr('id');
		var idcategory = idcategory.split("-");
		id = idcategory[1];
		$.ajax({
			url: 'include/videolist.php',
			type: 'POST',
			data:  {id : id },
			beforeSend: function(xhr) {
				$('.portfolio-items').html('');
				$('#loadmore').hide();
				$('#loading').show();
			}, success: function(data){
				loadlist(data);
				
			},error: function(xhr){
				$('#errorhandle').html(xhr.responseText);
			}
		});
	});
});


size_li = $(".portfolio-items li").size(); 
$('#loadmore').click(function (event) {
	
	event.preventDefault() 
	x= (x+8 <= size_li) ? x+8 : size_li;
	$('.portfolio-items li:lt('+x+')').show(); 
	if(x == size_li){
		$('#loadmore').hide();
	}
});




});

function loadlist(jsonlist){
	var json = $.parseJSON(jsonlist);
	if ( json.length !== 0 ) {
		$(json).each(function(i,val){
				$.each(val.items,function(k,v){
					if(v.id !== '' && v.id !== undefined){
							var duration = '';
							var thumbimg = '';
							var title = '';
							var channelTitle = '';
							if (v.contentDetails.duration !== undefined) {
								duration = covtime(v.contentDetails.duration);
							}
							if (v.snippet.thumbnails.high.url !== undefined) {
								thumbimg = v.snippet.thumbnails.high.url;
							}
							if (v.snippet.title !== undefined) {
								title = v.snippet.title;
							}
							if (v.snippet.channelTitle !== undefined) {
								channelTitle = v.snippet.channelTitle;
							}
						
						$('.portfolio-items').append('<li class="item"><div class="portfolio-item"><div class="portfolio-item-preview"><div class="thumb"><a href="videodetail.html?v='+v.id+'"><img src="'+thumbimg+'" alt=""></a><span class="duration">'+duration+'</span></div><div class=""><div class="portfolio-item-description text-left"><h3><a href="videodetail.html?v='+v.id+'">'+title+'</a></h3><p>'+channelTitle+'</p></div></div></div></div></li>');
					}
					else {
						$('#errorhandle').html('The video list is empty');
					}
					
				});
			});
			    size_li = $(".portfolio-items li").size();
				x=8;
				$('.portfolio-items li:lt('+x+')').show();
				$('#loadmore').show();
				$('#loading').hide();
	}
	else {
		
				$('#errorhandle').html('The video list is empty');
	}
	
}

 function covtime(input) {

        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;

        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
			if(hours != 0){
            	totalseconds = hours +":"+ minutes +":"+ seconds;
			}
			else 
				totalseconds =  minutes +":"+ seconds;
        }

        return (totalseconds);
    }
	
	
function PublishedAt(time){
		var date_str = [];
		 var MyDate = new Date(
                        Date.parse
                        (
                            time.replace(/ *\(.*\)/,"")
                        )
                    );
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		];
		/*var date_str = '<div class="blog-post-info">'+MyDate.getDate()+'<br><small>'+monthNames[MyDate.getMonth()]+' , '+MyDate.getFullYear()+'</small></div>';*/
		date_str[0] = MyDate.getDate();
		date_str[1] = monthNames[MyDate.getMonth()];
		date_str[2] = MyDate.getFullYear();
		
		date_str[3] = MyDate.getHours();
		date_str[4] = MyDate.getMinutes();
		date_str[5] = MyDate.getSeconds();
		
		
		return date_str;	
}

 
var result;

function videodetail(){
	// get value of parameter by url
	var idvideo = getParameterByName('v');
	
	
$.when(
	$.ajax({
			url: 'include/videodetail.php',
			type: 'POST',
			data:  { idvideo : idvideo },
			beforeSend: function(xhr) {
			}, success: function(data){
				result = data;	
				var json = $.parseJSON(data);
				if ( json.length !== 0 ) {
					$(json).each(function(i,val){
						$.each(val.items,function(k,v){
							var idvideo = '';
							var datePublished = [];
							var dayPublished = '';
							var monthPublished = '';
							var yearPublished = '';
							var videoTitle = '';
							var videoChannel = '';
							var videoChannelTitle = '';
							var duration = '';
							var description = '';
							var commentCount = '';
							var videoCategoryId = '';
							
							if (v.id !== undefined) {
								idvideo = v.id;
							}
							if (v.snippet.publishedAt !== undefined) {
								datePublished = PublishedAt(v.snippet.publishedAt);
								dayPublished = datePublished[0];
								monthPublished = datePublished[1];
								yearPublished = datePublished[2];
							}
							if (v.snippet.title !== undefined) {
								videoTitle = v.snippet.title;
							}
							if (v.snippet.categoryId !== undefined) {
								videoCategoryId = v.snippet.categoryId;
							}
							if (v.snippet.channelId !== undefined) {
								videoChannel = v.snippet.channelId;
							}
							if (v.snippet.channelTitle !== undefined) {
								videoChannelTitle = v.snippet.channelTitle;
							}
							if (v.contentDetails.duration !== undefined) {
								duration = covtime(v.contentDetails.duration);
							}
							if (v.snippet.description !== undefined) {
								description = v.snippet.description;
							}
							if (v.statistics.commentCount !== undefined) {
								commentCount = v.statistics.commentCount;
							}
							$('#videodetail').html('<div class="blog-post"><div class="blog-post-thumb"><iframe  src="http://www.youtube.com/embed/'+idvideo+'?autoplay=1" frameborder="0" allowfullscreen></iframe></div><div class="blog-post-info">'+dayPublished+'<br><small>'+monthPublished+' , '+yearPublished+'</small></div><div class="blog-post-title"><h3>'+videoTitle+'</h3><p><a href="https://www.youtube.com/channel/'+videoChannel+'" target="_blank">'+videoChannelTitle+'</a> | <time>'+duration+'</time></p><p></p></div><p>'+description+'</p></div>');
							
							$('#count').html(commentCount);
						})
					})
				}else
				$('.error').html('Error-Page');
			},error: function(xhr){
				$('.error').html('Error-Page');
			}
		}),
			$.ajax({
			url: 'include/comment.php',
			type: 'POST',
			data:  { idvideo : idvideo },
			beforeSend: function(xhr) {
			}, success: function(data){
				result = data;	
				var json = $.parseJSON(data);
				if ( json.length !== 0 ) {
					$(json).each(function(i,val){
						$.each(val.items,function(k,v){
							var image = '';
							var name = '';
							var date = [];
							var day = '';
							var month = '';
							var year = '';
							var timehour = '';
							var timeminute = '';
							var timesecond = '';
							var comment = '';
							var idcomment = '';
								
							if (v.snippet.topLevelComment.snippet.authorProfileImageUrl !== undefined) {
								image = v.snippet.topLevelComment.snippet.authorProfileImageUrl;
							}
							if (v.snippet.topLevelComment.snippet.authorDisplayName !== undefined) {
								name = v.snippet.topLevelComment.snippet.authorDisplayName;
							}
							if (v.snippet.topLevelComment.snippet.publishedAt !== undefined) {
								date = PublishedAt(v.snippet.topLevelComment.snippet.publishedAt);
								day = date[0];
								month = date[1];
								year = date[2];
								timehour = date[3];
								timeminute = date[4];
								timesecond = date[5];
							}
							if ( v.snippet.topLevelComment.snippet.textDisplay !== undefined) {
								comment = v.snippet.topLevelComment.snippet.textDisplay;
							}
							if ( v.id !== undefined) {
								idcomment = v.id;
							}
							$('.commentlist').append('<li class="comment odd alt thread-odd thread-alt depth-1 parent"><div class="comment-body"><div class="comment-author vcard"><img width="80" height="80" class="avatar avatar-32 photo" src="'+image+'" alt=""><cite class="fn"><a class="url" rel="external nofollow" href="#">'+name+'</a></cite><span class="says">says:</span></div><div class="comment-meta commentmetadata"><time>'+month+' '+day+','+year+' at '+timehour +':'+timeminute+':'+timesecond+' </time></div><p>'+comment+'</p><div class="reply"><a href="#" class="comment-reply-link">Reply</a></div></div><div class="childrenlist'+idcomment+'"></div></li>');
							
							if(v.snippet.totalReplyCount !== 0 && v.snippet.totalReplyCount !== undefined){
								$('.commentlist .childrenlist'+idcomment).append('<a href="#" class="viewreply" id="'+v.snippet.totalReplyCount+'">View '+v.snippet.totalReplyCount+' replies</a>');
								
								$.ajax({
									url: 'include/commentreply.php',
									type: 'POST',
									data:  { idcomment : idcomment },
									beforeSend: function(xhr) {
									}, success: function(data){
										var json = $.parseJSON(data);
										if ( json.length !== 0 ) {
											$('<ul class="children hidden">').appendTo('.childrenlist'+idcomment);
											
											$(json).each(function(i,val){
												$.each(val.items,function(k,v){
													var imguserUrl = '';
													var userName = '';
													var datePublished = [];
													var PublishishDay = '';
													var PublishishMonth = '';
													var PublishishYear = '';
													var PublishishHour = '';
													var PublishishMinute = '';
													var PublishishSecond = '';
													var userComment = '';
													var commentParentId = '';
													
													if (v.snippet.authorProfileImageUrl !== undefined){
														imguserUrl = v.snippet.authorProfileImageUrl;
													}
													if (v.snippet.authorDisplayName !== undefined){
														userName = v.snippet.authorDisplayName;
													}
													if (v.snippet.publishedAt !== undefined){
														datePublished = PublishedAt(v.snippet.publishedAt);
														PublishishDay = datePublished[0];
														PublishishMonth = datePublished[1];
														PublishishYear = datePublished[2];
														PublishishHour = datePublished[3];
														PublishishMinute = datePublished[4];
														PublishishSecond = datePublished[5];
													}
													if (v.snippet.textDisplay !== undefined){
														userComment = v.snippet.textDisplay;
													}
													if (v.snippet.parentId !== undefined){
														commentParentId = v.snippet.parentId;
													}
													$('<li class="comment even depth-2"><div class="comment-body"><div class="comment-author vcard"><img width="50" height="50" class="avatar avatar-32 photo" src="'+imguserUrl+'" alt=""><cite class="fn"><a class="url" rel="external nofollow" href="#">'+userName+'</a></cite><span class="says">says:</span></div><div class="comment-meta commentmetadata"><time>'+PublishishMonth+' '+PublishishDay+','+PublishishYear+' at '+PublishishHour+':'+PublishishMinute+':'+PublishishSecond+' </time></div><p>'+userComment+'</p><div class="reply"><a href="#" class="comment-reply-link">Reply</a></div></div> </li></ul>').appendTo('.childrenlist'+commentParentId+' .children');
												})
											});
											$('</ul>').appendTo('.childrenlist'+idcomment);
										}else 
										$('.errorcomment').html('0 comment');
									}
								});
							}
						})
					})
				}
			},error: function(xhr){
			}
		})
		
).then(function(){
	
	$(".viewreply").on('click',function(event){
		event.preventDefault();
		var id = $(this).attr('id');
		$(this).parent().find('.children').slideToggle('fast', function() {
        	if ($(this).is(':hidden')){
				$(this).parent("div[class^='childrenlist']").find('.viewreply').html('View '+id+' replies');
			}else 
				$(this).parent("div[class^='childrenlist']").find('.viewreply').html('Hide replies');
		});
	});
});

}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}