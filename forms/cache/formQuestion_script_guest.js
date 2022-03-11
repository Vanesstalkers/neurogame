if($('#subFormMain > div').length) $('#subFormMain').show();

$(document).off('click', '#formQuestion > .award > .item');
				$(document).on('click', '#formQuestion > .award > .item', function(){
					var $this = $(this);
					if(!$this.hasClass('ready')){
						$.notify('Задай вопрос, чтобы активировать звезду');
					}else{
						if(!$this.hasClass('used')){
							$this.addClass('used');
							wsSendCallback({action: 'get_award'}, function(data){

							}, function(err){
								$this.removeClass('used');
								if(err.errMsg) $.notify(err.errMsg);
							});
						}
					}
				});

$(document).off('click','#formVote .questionBaseStats > .item, #formQuestion .questionBaseStats > .item');
					$(document).on('click', '#formVote .questionBaseStats > .item, #formQuestion .questionBaseStats > .item', function(){
						
						var $this = $(this);
						$this.toggleClass('active');
						
						var $stats = $this.closest('.questionBaseStats');
						var has = $stats.find('> .item.active').length;
						var need = $stats.find('> .label > .count > .need').text()*1;
						
						$stats.find('> .label > .count').removeClass('ready').removeClass('super');
						if(has > need) $stats.find('> .label > .count').addClass('super');
						if(has >= need){
							$stats.find('> .label > .count').addClass('ready');
							if(has > need) $stats.find('> .label > .count').addClass('super');
						}

						$stats.find('> .label > .count > .has').text(has);
					});

$(document).off('click', '#formVote .question .i');
	$(document).on('click', '#formVote .question .i', function(){
		var $formVote = $('#formVote');
		$formVote.find('> .vote').addClass('active');
		var $text = $(this).closest('.question').find('> .text');
		$text.addClass('active').addClass('active-single');
	});

