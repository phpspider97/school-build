(function($) {
    "use strict";
    var sparkline_chart = {
      init: function() {
        setTimeout(function(){
            $("#simple-line-chart-sparkline").sparkline([5, 10, 20, 14, 17, 21, 20, 10, 4, 13,0, 10, 30, 40, 10, 15, 20], {
                type: 'line',
                width: '100%',
                height: '150',
                tooltipClassname: 'chart-sparkline',
                lineColor: '#307EF3',
                fillColor: 'transparent',
                highlightLineColor: '#307EF3',
                highlightSpotColor: '#307EF3',
                targetColor: '#307EF3',
                performanceColor: '#307EF3',
                boxFillColor: '#307EF3',
                medianColor: '#307EF3',
                minSpotColor: '#307EF3'
            });
      })
    }
};
  sparkline_chart.init()
})(jQuery);
