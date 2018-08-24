;(function($){

    $.unveiledNavigation = function(element, options) {

        var that        = this;
        // MERGE OPTIONS
        var opts        = $.extend({}, $.fn.unveiledNavigation.defaults, options);

        // VIEW COMPONENTS
        var $this       = $(element);

        // PROPERTIES
        var scrollTop               = $(window).scrollTop();
        var scrollDirection         = 1;
        var top                     = 0;
        var unveilTimeout           = undefined;


        /********************************/
        /* PRIVATE FUNCTIONS            */
        /********************************/

        var init = function(){
            initListeners();
        };

        var initListeners = function(){
            $(window).on('scroll', onWindowScroll);
            onWindowScroll();
        };


        /**
         * unveil
         * Unveils the navigation
         **/
        this.unveil = function(){
            // $this.animate(
            //     {
            //         top: 0
            //     },{
            //         step: function( now ){
            //             top = now;
            //         },
            //         easing: opts.easing,
            //         duration: opts.duration
            //     }
            // );
            $this.css('top', 0);
        };

        /**
         * cover
         * covers the navigation
         **/
        this.cover = function(){
            // $this.animate(
            //     {
            //         top: -$this.outerHeight()
            //     },{
            //         step: function( now ){
            //             top = now;
            //         },
            //         easing: opts.easing,
            //         duration: opts.duration
            //     }
            // );
            $this.css('top', -$this.outerHeight())
        }

        /********************************/
        /* EVENT HANDLING               */
        /********************************/

        var onWindowScroll = function( event ){

            // Stop unveil animation if any
            $this.stop();

            // Calculate new scrollTop and scrollDelta
            var newScrollTop       = Math.max(0, $(window).scrollTop());
            var scrollDelta        = scrollTop - newScrollTop;

            // Calculate new top position
            var newTop          = top + scrollDelta * opts.acceleration;
            newTop              = Math.max(newTop, -$this.outerHeight() - opts.offset);
            newTop              = Math.min(newTop, 0);

            // Unveil completely if just partly unveiled
            clearTimeout(unveilTimeout);
            if(scrollDirection == 1 && Math.abs(newTop) < $this.outerHeight()){
                unveilTimeout = setTimeout(that.unveil, opts.timeout)
            }

            // Show when scrolled to the very bottom
            if(newScrollTop == $(document).height() - $(window).height()){
                that.unveil();
            }

            // Assign class if scrolled to the very top
            if(newScrollTop == 0){
                $this.removeClass(opts.affixedClass);
            }else if(newScrollTop > $this.outerHeight()){
                $this.addClass(opts.affixedClass);
            }

            // Asign new position
            $this.css({ top: newTop });


            // Update memory
            top                = newTop;
            scrollTop          = newScrollTop;
            scrollDirection    = scrollDelta ? scrollDelta/Math.abs(scrollDelta) : scrollDirection;
        };

        /********************************/
        /* INIT                         */
        /********************************/

        init();

    };

    /**
    * PLUGIN INIT
    *
    */
    $.fn.unveiledNavigation = function(options){
        return this.each(function() {
            if (undefined === $(this).data('unveiledNavigation')) {
                var plugin = new $.unveiledNavigation(this, options);
                $(this).data('unveiledNavigation', plugin);
            }
        });
    };

    /**
    * PLUGIN DEFAULTS
    *
    */
    $.fn.unveiledNavigation.defaults = {
        offset:        0,             // Offset in px for unveiling
        acceleration:  1,             // Acceleration of unveiling/hiding
        affixedClass:  'is-affixed',  // Class that will be added when being scrolled
        timeout:       300,           // Timeout before the navigation gets unveiled on scroll stop
        // easing:        'linear',      // Esing function that is used for automatical unveiling/hiding
        // duration:      350            // Duration of the automatic unveiling/hiding
    };

})(jQuery);