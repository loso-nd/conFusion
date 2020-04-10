// Adding in the JS component for tooltip component/ Searches for the attribute tooltip and executes -->

       $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });

        $(document).ready(function(){
            $().buttons('toggle');
        });          


// Adding in the JS component to control play | pause carousel */

        $(document).ready(function(){
            $('#mycarousel').carousel({ interval: 2000 });
            $('#carouselButton').click(function(){
               if ($('#carouselButton').children("span").hasClass('fa-pause')){
                    $('#mycarousel').carousel('pause');
                    $('#carouselButton').children("span").removeclass('fa-pasue');
                    $('#carouselButton').children("span").addClass('fa-play');
                }
                else if ($('#carouselButton').children("span").hasClass('fa-play')){
                    $('#mycarousel').carousel('cycle');
                    $('#carouselButton').children("span").removeclass('fa-play');
                    $('#carouselButton').children("span").addClass('fa-pause');
                };
            });

            $('#reserveButton').click(function(){
                $("#reserveModal").modal('toggle');
            });
            $('#loginButton').click(function(){
                $("#loginModal").modal('show');
            });
 
        });
