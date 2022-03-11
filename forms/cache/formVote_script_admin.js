if($('#subFormMain > div').length) $('#subFormMain').show();

$(document).off('click', '#formVote > .vote.active > .btn-close');
				$(document).on('click', '#formVote > .vote.active > .btn-close', function(){
					var $formVote = $('#formVote');
					$(this).closest('.vote').removeClass('active');
					$formVote.find('.text.active').removeClass('active').removeClass('active-single');
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



$(document).off('click', '#formVote .answer .ready');
	$(document).on('click', '#formVote .answer .ready', function(){
		var $answer = $(this).closest('[question]');
		var $formVote = $('#formVote');
		var $question = $formVote.find('.question[code='+$answer.attr('question')+'] > .text');
		$answer.closest('.answer').find('> .text').addClass('active');
		$question.addClass('active');
		$formVote.find('> .vote').addClass('active');
	});



$(document).off('click', '.choiceRatesBlock > .rate');
	$(document).on('click', '.choiceRatesBlock > .rate', function(){
		var $rate = $(this);
		var $choiceRatesBlock = $rate.closest('.choiceRatesBlock');
		if(!$choiceRatesBlock.hasClass('passive')){
			$rate.addClass('active');
			$choiceRatesBlock.addClass('choice');
		}
	});
	
	$(document).off('click', '.choiceRatesBlock.choice > .close-btn');
	$(document).on('click', '.choiceRatesBlock.choice > .close-btn', function(){
		var $btn = $(this);
		var $rates = $btn.closest('.choiceRatesBlock');
		$rates.removeClass('choice');
		$rates.find('.rate').removeClass('active');
	});

