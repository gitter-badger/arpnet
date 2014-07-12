 (function($){
  $.fn.shuffle = function() {
    return this.each(function(){
      var items = $(this).children();
      return (items.length) 
        ? $(this).html($.shuffle(items)) 
        : this;
    });
  }
   
  $.shuffle = function(arr) {
    for(
      var j, x, i = arr.length; i; 
      j = parseInt(Math.random() * i), 
      x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  } 
})(jQuery);

Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
};

function send_requests() {
        FB.ui({method: 'apprequests',
          message: 'Гласувах за твоя снимка, виж коя',
          to: $.gvar.invites[$.gvar.next_chunk_invites]
        }, function (response) {
       if(response) {
         $.gvar.next_chunk_invites++;
       } else {
         
       }
    }); 
};



var toggleHandler = function(toggle) {
    var toggle = toggle;
    var radio = $(toggle).find("input");

    var checkToggleState = function() {
        if (radio.eq(0).is(":checked")) {
            $(toggle).removeClass("toggle-off");
        } else {
            $(toggle).addClass("toggle-off");
        }
    };

    checkToggleState();

    radio.eq(0).click(function() {
        $(toggle).toggleClass("toggle-off");
    });

    radio.eq(1).click(function() {
        $(toggle).toggleClass("toggle-off");
    });
};

$(document).ready(function() {
    $(".toggle").each(function(index, toggle) {
        toggleHandler(toggle);
    });
});
