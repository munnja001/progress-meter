var ProgressMeter = function($, GLOBAL) {
	var enableAllSteps = GLOBAL['progress-meter-enable-all'] || false;
	var disableAllSteps = GLOBAL['progress-meter-disable-all'] || false;
	
	var containerSelector = '.progress-meter-container';
	var getClickableElements = function($container) {
		return $('.bulb, .bulb-inner, .step-lbl', $container);
	};

	var init = function() {
		$(containerSelector).each(function() {
			registerClickEvents($(this));
			resetClickableStatus($(this));
		});
	};
	
	var registerClickEvents = function($container) {
	    getClickableElements($container).click(function(e) {
	        if (canClickElement($(this), $container)) {
	            window.location.href = getStepURL($(this), $container);
	        } else {
	            e.preventDefault();
	        }
	    });
	}
	
	var resetClickableStatus = function($container) {
	    getClickableElements($container).each(function(index, item) {
	        if (canClickElement($(this), $container)) {
	            $(item).addClass('clickable');
	        } else {
	            $(item).removeClass('clickable');
	        }
	    });
	}

	var canClickElement = function($element, $container) {
	    if (disableAllSteps) return false;
	    return getStepNumber($element) < getStepNumber($container) || enableAllSteps
	};

	var getStepURL = function($element, $container) {
	    var stepNumber = getStepNumber($element);
	    return $('.step-labels .step' + stepNumber, $container).attr('href');
	};

	var getStepNumber = function($element) {
	    var stepNumber = 0;
	    $.each($element.attr('class').split(/\s+/), function(index, item) {
	        if (item.indexOf("step") == 0){
	            stepNumber = item.substring(4);
	        }
	    });
	    return stepNumber;
	};
	
	init();
}(jQuery, GLOBAL || {});