function pieChart(className) {
    $('.' + className).each(function () {
        var element = '#' + $(this).attr('id');
        var size = $(this).attr('data-size');
        if (parseInt(size) > 1) {
            // Basic setup
            // ------------------------------
            var dataVariable = $(this).attr('data-json');

            // Add data set
            var data = window[dataVariable];

            // Main variables
            var d3Container = d3.select(element),
                    distance = 2, // reserve 2px space for mouseover arc moving
                    radius = (size / 2) - distance,
                    sum = d3.sum(data, function (d) {
                        return d.value;
                    });
            // Tooltip
            // ------------------------------
            var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .direction('e')
                    .html(function (d) {
                        return "<ul class='list-unstyled mb-5'>" +
                                "<li>" + "<span class='text-semibold pull-right'>" + d.data.section_label + ' : ' + d.value + "</span>" + "</li>" +
                                "</ul>";
                    });
            // Create chart
            // ------------------------------

            // Add svg element
            var container = d3Container.append("svg").call(tip);

            // Add SVG group
            var svg = container
                    .attr("width", size)
                    .attr("height", size)
                    .append("g")
                    .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");
            // Construct chart layout
            // ------------------------------

            // Pie
            var pie = d3.layout.pie()
                    .sort(null)
                    .startAngle(Math.PI)
                    .endAngle(3 * Math.PI)
                    .value(function (d) {
                        return d.value;
                    });

            // Arc
            var arc = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(radius / 2);
            //
            // Append chart elements
            //
            // Group chart elements
            var arcGroup = svg.selectAll(".d3-arc")
                    .data(pie(data))
                    .enter()
                    .append("g")
                    .attr("class", "d3-arc")
                    .style('stroke', '#fff')
                    .style('cursor', 'pointer');

            // Append path
            var arcPath = arcGroup
                    .append("path")
                    .style("fill", function (d) {
                        return d.data.color;
                    });
            // Add tooltip
            arcPath
                    .on('mouseover', function (d, i) {

                        // Transition on mouseover
                        d3.select(this)
                                .transition()
                                .duration(500)
                                .ease('elastic')
                                .attr('transform', function (d) {
                                    d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
                                    var x = Math.sin(d.midAngle) * distance;
                                    var y = -Math.cos(d.midAngle) * distance;
                                    return 'translate(' + x + ',' + y + ')';
                                });
                    })
                    .on("mousemove", function (d) {

                        // Show tooltip on mousemove
                        tip.show(d)
                                .style("top", (d3.event.pageY - 40) + "px")
                                .style("left", (d3.event.pageX + 30) + "px");
                    })

                    .on('mouseout', function (d, i) {

                        // Mouseout transition
                        d3.select(this)
                                .transition()
                                .duration(500)
                                .ease('bounce')
                                .attr('transform', 'translate(0,0)');

                        // Hide tooltip
                        tip.hide(d);
                    });

            // Animate chart on load
            arcPath
                    .transition()
                    .delay(function (d, i) {
                        return i * 500;
                    })
                    .duration(500)
                    .attrTween("d", function (d) {
                        var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                        return function (t) {
                            d.endAngle = interpolate(t);
                            return arc(d);
                        };
                    });
        }
    });
}
$(function () {
    /// pie chart ///
    c3.generate({
        bindto: '#pie',
        data: {
            columns: [
                ['Not Started', 178],
                ['Started', 145],
                ['Lated', 123],
            ],
            colors: {
                'Not Started': '#FFB046',
                Started: '#18A689',
                Lated: '#FF6C6C'
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie2',
        data: {
            columns: [
                ['Not Started', 130],
                ['Started', 178],
                ['Lated', 145],
            ],
            colors: {
                'Not Started': '#FFB046',
                Started: '#18A689',
                Lated: '#FF6C6C'
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie3',
        data: {
            columns: [
                ['Not Started', 147],
                ['Started', 142],
                ['Lated', 150],
            ],
            colors: {
                'Not Started': '#FFB046',
                Started: '#18A689',
                Lated: '#FF6C6C'
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie4',
        data: {
            columns: [
                ['Started', 124],
                ['Completed', 178],
                ['Not Started', 148],
            ],
            colors: {
                'Started': '#FFB046',
                Completed: '#18A689',
                'Not Started': '#FF6C6C'
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie5',
        data: {
            columns: [
                ['Not Paid', 145],
                ['All paid', 130],
                ['Partial Paid', 87],
            ],
            colors: {
                'Not Paid': '#18A689',
                'All paid': '#FFB046',
                'Partial Paid': '#FF6C6C'
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie6',
        data: {
            columns: [
                ['Business Clients', 214],
                ['Individual Clients', 147],
            ],
            colors: {
                'Business Clients': '#18A689',
                'Individual Clients': '#FFB046',
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie7',
        data: {
            columns: [
                ['Active', 88],
                ['New', 187],
                ['Closed', 150],
                ['Inactive', 50],
            ],
            colors: {
                'Active': '#18A689',
                'New': '#FFB046',
                'Closed': '#ff6c6c',
                'Inactive': '#cccccc',
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie8',
        data: {
            columns: [
                ['Active', 88],
                ['New', 187],
                ['Closed', 150],
                ['Inactive', 50],
            ],
            colors: {
                'Active': '#18A689',
                'New': '#FFB046',
                'Closed': '#ff6c6c',
                'Inactive': '#cccccc',
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie9',
        data: {
            columns: [
                ['Active', 88],
                ['New', 187],
                ['Closed', 150],
                ['Inactive', 50],
            ],
            colors: {
                'Active': '#18A689',
                'New': '#FFB046',
                'Closed': '#ff6c6c',
                'Inactive': '#cccccc',
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    c3.generate({
        bindto: '#pie10',
        data: {
            columns: [
                ['Active', 88],
                ['New', 187],
                ['Closed', 150],
                ['Inactive', 50],
            ],
            colors: {
                'Active': '#18A689',
                'New': '#FFB046',
                'Closed': '#ff6c6c',
                'Inactive': '#cccccc',
            },
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format()(value);
                }
            }
        },
        tooltip: {
            format: {
                value: function (d) {
                    return d;
                }
            }
        },
        legend: {
            label: {
                format: function (d) {
                    return 'asd' + d;
                }
            }
        }
    });
    //Range date picker//
    $('input[name="daterange"]').daterangepicker();
/////////////////// campaigns-donut1


    /*// Marketing campaigns donut chart
     // ------------------------------
     
     // Initialize chart
     campaignDonut("#campaigns-donut1", 30);
     
     // Chart setup
     function campaignDonut(element, size) {
     
     
     // Basic setup
     // ------------------------------
     
     // Add data set
     var data = [
     {
     "browser": "Not Started",
     "icon": "<i class='icon-google position-left'></i>",
     "value": 6,
     "color": "#66BB6A"
     }, {
     "browser": "Started",
     "icon": "<i class='icon-share4 position-left'></i>",
     "value": 3,
     "color": "#9575CD"
     }, {
     "browser": "Late",
     "icon": "<i class='icon-youtube position-left'></i>",
     "value": 12,
     "color": "#FF7043"
     }
     ];
     
     // Main variables
     var d3Container = d3.select(element),
     distance = 2, // reserve 2px space for mouseover arc moving
     radius = (size / 2) - distance,
     sum = d3.sum(data, function (d) {
     return d.value;
     })
     
     
     
     // Tooltip
     // ------------------------------
     
     var tip = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .direction('e')
     .html(function (d) {
     return "<ul class='list-unstyled mb-5'>" +
     "<li><span class='text-semibold pull-right'>" + d.data.browser + ' : ' + d.value + "</span>" + "</li>" +
     "</ul>";
     })
     
     
     
     // Create chart
     // ------------------------------
     
     // Add svg element
     var container = d3Container.append("svg").call(tip);
     
     // Add SVG group
     var svg = container
     .attr("width", size)
     .attr("height", size)
     .append("g")
     .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");
     
     
     
     // Construct chart layout
     // ------------------------------
     
     // Pie
     var pie = d3.layout.pie()
     .sort(null)
     .startAngle(Math.PI)
     .endAngle(3 * Math.PI)
     .value(function (d) {
     return d.value;
     });
     
     // Arc
     var arc = d3.svg.arc()
     .outerRadius(radius)
     .innerRadius(radius / 2);
     
     
     
     //
     // Append chart elements
     //
     
     // Group chart elements
     var arcGroup = svg.selectAll(".d3-arc")
     .data(pie(data))
     .enter()
     .append("g")
     .attr("class", "d3-arc")
     .style('stroke', '#fff')
     .style('cursor', 'pointer');
     
     // Append path
     var arcPath = arcGroup
     .append("path")
     .style("fill", function (d) {
     return d.data.color;
     });
     
     // Add tooltip
     arcPath
     .on('mouseover', function (d, i) {
     
     // Transition on mouseover
     d3.select(this)
     .transition()
     .duration(500)
     .ease('elastic')
     .attr('transform', function (d) {
     d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
     var x = Math.sin(d.midAngle) * distance;
     var y = -Math.cos(d.midAngle) * distance;
     return 'translate(' + x + ',' + y + ')';
     });
     })
     
     .on("mousemove", function (d) {
     
     // Show tooltip on mousemove
     tip.show(d)
     .style("top", (d3.event.pageY - 40) + "px")
     .style("left", (d3.event.pageX + 30) + "px");
     })
     
     .on('mouseout', function (d, i) {
     
     // Mouseout transition
     d3.select(this)
     .transition()
     .duration(500)
     .ease('bounce')
     .attr('transform', 'translate(0,0)');
     
     // Hide tooltip
     tip.hide(d);
     });
     
     // Animate chart on load
     arcPath
     .transition()
     .delay(function (d, i) {
     return i * 500;
     })
     .duration(500)
     .attrTween("d", function (d) {
     var interpolate = d3.interpolate(d.startAngle, d.endAngle);
     return function (t) {
     d.endAngle = interpolate(t);
     return arc(d);
     };
     });
     }
     
     /////////////////// campaigns-donut2
     
     
     // Marketing campaigns donut chart
     // ------------------------------
     
     // Initialize chart
     campaignDonut("#campaigns-donut2", 30);
     
     // Chart setup
     function campaignDonut(element, size) {
     
     
     // Basic setup
     // ------------------------------
     
     // Add data set
     var data = [
     {
     "browser": "Not Started",
     "icon": "<i class='icon-google position-left'></i>",
     "value": 6,
     "color": "#66BB6A"
     }, {
     "browser": "Started",
     "icon": "<i class='icon-share4 position-left'></i>",
     "value": 3,
     "color": "#9575CD"
     }, {
     "browser": "Late",
     "icon": "<i class='icon-youtube position-left'></i>",
     "value": 12,
     "color": "#FF7043"
     }
     ];
     
     // Main variables
     var d3Container = d3.select(element),
     distance = 2, // reserve 2px space for mouseover arc moving
     radius = (size / 2) - distance,
     sum = d3.sum(data, function (d) {
     return d.value;
     })
     
     
     
     // Tooltip
     // ------------------------------
     
     var tip = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .direction('e')
     .html(function (d) {
     return "<ul class='list-unstyled mb-5'>" +
     "<li><span class='text-semibold pull-right'>" + d.data.browser + ' : ' + d.value + "</span>" + "</li>" +
     "</ul>";
     })
     
     
     
     // Create chart
     // ------------------------------
     
     // Add svg element
     var container = d3Container.append("svg").call(tip);
     
     // Add SVG group
     var svg = container
     .attr("width", size)
     .attr("height", size)
     .append("g")
     .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");
     
     
     
     // Construct chart layout
     // ------------------------------
     
     // Pie
     var pie = d3.layout.pie()
     .sort(null)
     .startAngle(Math.PI)
     .endAngle(3 * Math.PI)
     .value(function (d) {
     return d.value;
     });
     
     // Arc
     var arc = d3.svg.arc()
     .outerRadius(radius)
     .innerRadius(radius / 2);
     
     
     
     //
     // Append chart elements
     //
     
     // Group chart elements
     var arcGroup = svg.selectAll(".d3-arc")
     .data(pie(data))
     .enter()
     .append("g")
     .attr("class", "d3-arc")
     .style('stroke', '#fff')
     .style('cursor', 'pointer');
     
     // Append path
     var arcPath = arcGroup
     .append("path")
     .style("fill", function (d) {
     return d.data.color;
     });
     
     // Add tooltip
     arcPath
     .on('mouseover', function (d, i) {
     
     // Transition on mouseover
     d3.select(this)
     .transition()
     .duration(500)
     .ease('elastic')
     .attr('transform', function (d) {
     d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
     var x = Math.sin(d.midAngle) * distance;
     var y = -Math.cos(d.midAngle) * distance;
     return 'translate(' + x + ',' + y + ')';
     });
     })
     
     .on("mousemove", function (d) {
     
     // Show tooltip on mousemove
     tip.show(d)
     .style("top", (d3.event.pageY - 40) + "px")
     .style("left", (d3.event.pageX + 30) + "px");
     })
     
     .on('mouseout', function (d, i) {
     
     // Mouseout transition
     d3.select(this)
     .transition()
     .duration(500)
     .ease('bounce')
     .attr('transform', 'translate(0,0)');
     
     // Hide tooltip
     tip.hide(d);
     });
     
     // Animate chart on load
     arcPath
     .transition()
     .delay(function (d, i) {
     return i * 500;
     })
     .duration(500)
     .attrTween("d", function (d) {
     var interpolate = d3.interpolate(d.startAngle, d.endAngle);
     return function (t) {
     d.endAngle = interpolate(t);
     return arc(d);
     };
     });
     }
     
     
     /////////////////// campaigns-donut3
     
     
     // Marketing campaigns donut chart
     // ------------------------------
     
     // Initialize chart
     campaignDonut("#campaigns-donut3", 30);
     
     // Chart setup
     function campaignDonut(element, size) {
     
     
     // Basic setup
     // ------------------------------
     
     // Add data set
     var data = [
     {
     "browser": "Not Started",
     "icon": "<i class='icon-google position-left'></i>",
     "value": 6,
     "color": "#66BB6A"
     }, {
     "browser": "Started",
     "icon": "<i class='icon-share4 position-left'></i>",
     "value": 3,
     "color": "#9575CD"
     }, {
     "browser": "Late",
     "icon": "<i class='icon-youtube position-left'></i>",
     "value": 12,
     "color": "#FF7043"
     }
     ];
     
     // Main variables
     var d3Container = d3.select(element),
     distance = 2, // reserve 2px space for mouseover arc moving
     radius = (size / 2) - distance,
     sum = d3.sum(data, function (d) {
     return d.value;
     })
     
     
     
     // Tooltip
     // ------------------------------
     
     var tip = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .direction('e')
     .html(function (d) {
     return "<ul class='list-unstyled mb-5'>" +
     "<li><span class='text-semibold pull-right'>" + d.data.browser + ' : ' + d.value + "</span>" + "</li>" +
     "</ul>";
     })
     
     
     
     // Create chart
     // ------------------------------
     
     // Add svg element
     var container = d3Container.append("svg").call(tip);
     
     // Add SVG group
     var svg = container
     .attr("width", size)
     .attr("height", size)
     .append("g")
     .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");
     
     
     
     // Construct chart layout
     // ------------------------------
     
     // Pie
     var pie = d3.layout.pie()
     .sort(null)
     .startAngle(Math.PI)
     .endAngle(3 * Math.PI)
     .value(function (d) {
     return d.value;
     });
     
     // Arc
     var arc = d3.svg.arc()
     .outerRadius(radius)
     .innerRadius(radius / 2);
     
     
     
     //
     // Append chart elements
     //
     
     // Group chart elements
     var arcGroup = svg.selectAll(".d3-arc")
     .data(pie(data))
     .enter()
     .append("g")
     .attr("class", "d3-arc")
     .style('stroke', '#fff')
     .style('cursor', 'pointer');
     
     // Append path
     var arcPath = arcGroup
     .append("path")
     .style("fill", function (d) {
     return d.data.color;
     });
     
     // Add tooltip
     arcPath
     .on('mouseover', function (d, i) {
     
     // Transition on mouseover
     d3.select(this)
     .transition()
     .duration(500)
     .ease('elastic')
     .attr('transform', function (d) {
     d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
     var x = Math.sin(d.midAngle) * distance;
     var y = -Math.cos(d.midAngle) * distance;
     return 'translate(' + x + ',' + y + ')';
     });
     })
     
     .on("mousemove", function (d) {
     
     // Show tooltip on mousemove
     tip.show(d)
     .style("top", (d3.event.pageY - 40) + "px")
     .style("left", (d3.event.pageX + 30) + "px");
     })
     
     .on('mouseout', function (d, i) {
     
     // Mouseout transition
     d3.select(this)
     .transition()
     .duration(500)
     .ease('bounce')
     .attr('transform', 'translate(0,0)');
     
     // Hide tooltip
     tip.hide(d);
     });
     
     // Animate chart on load
     arcPath
     .transition()
     .delay(function (d, i) {
     return i * 500;
     })
     .duration(500)
     .attrTween("d", function (d) {
     var interpolate = d3.interpolate(d.startAngle, d.endAngle);
     return function (t) {
     d.endAngle = interpolate(t);
     return arc(d);
     };
     });
     }
     
     
     /////////////////// campaigns-donut4
     
     
     // Marketing campaigns donut chart
     // ------------------------------
     
     // Initialize chart
     campaignDonut("#campaigns-donut4", 30);
     
     // Chart setup
     function campaignDonut(element, size) {
     
     
     // Basic setup
     // ------------------------------
     
     // Add data set
     var data = [
     {
     "browser": "Not Started",
     "icon": "<i class='icon-google position-left'></i>",
     "value": 6,
     "color": "#66BB6A"
     }, {
     "browser": "Started",
     "icon": "<i class='icon-share4 position-left'></i>",
     "value": 3,
     "color": "#9575CD"
     }, {
     "browser": "Late",
     "icon": "<i class='icon-youtube position-left'></i>",
     "value": 12,
     "color": "#FF7043"
     }
     ];
     
     // Main variables
     var d3Container = d3.select(element),
     distance = 2, // reserve 2px space for mouseover arc moving
     radius = (size / 2) - distance,
     sum = d3.sum(data, function (d) {
     return d.value;
     })
     
     
     
     // Tooltip
     // ------------------------------
     
     var tip = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .direction('e')
     .html(function (d) {
     return "<ul class='list-unstyled mb-5'>" +
     "<li><span class='text-semibold pull-right'>" + d.data.browser + ' : ' + d.value + "</span>" + "</li>" +
     "</ul>";
     })
     
     
     
     // Create chart
     // ------------------------------
     
     // Add svg element
     var container = d3Container.append("svg").call(tip);
     
     // Add SVG group
     var svg = container
     .attr("width", size)
     .attr("height", size)
     .append("g")
     .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");
     
     
     
     // Construct chart layout
     // ------------------------------
     
     // Pie
     var pie = d3.layout.pie()
     .sort(null)
     .startAngle(Math.PI)
     .endAngle(3 * Math.PI)
     .value(function (d) {
     return d.value;
     });
     
     // Arc
     var arc = d3.svg.arc()
     .outerRadius(radius)
     .innerRadius(radius / 2);
     
     
     
     //
     // Append chart elements
     //
     
     // Group chart elements
     var arcGroup = svg.selectAll(".d3-arc")
     .data(pie(data))
     .enter()
     .append("g")
     .attr("class", "d3-arc")
     .style('stroke', '#fff')
     .style('cursor', 'pointer');
     
     // Append path
     var arcPath = arcGroup
     .append("path")
     .style("fill", function (d) {
     return d.data.color;
     });
     
     // Add tooltip
     arcPath
     .on('mouseover', function (d, i) {
     
     // Transition on mouseover
     d3.select(this)
     .transition()
     .duration(500)
     .ease('elastic')
     .attr('transform', function (d) {
     d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
     var x = Math.sin(d.midAngle) * distance;
     var y = -Math.cos(d.midAngle) * distance;
     return 'translate(' + x + ',' + y + ')';
     });
     })
     
     .on("mousemove", function (d) {
     
     // Show tooltip on mousemove
     tip.show(d)
     .style("top", (d3.event.pageY - 40) + "px")
     .style("left", (d3.event.pageX + 30) + "px");
     })
     
     .on('mouseout', function (d, i) {
     
     // Mouseout transition
     d3.select(this)
     .transition()
     .duration(500)
     .ease('bounce')
     .attr('transform', 'translate(0,0)');
     
     // Hide tooltip
     tip.hide(d);
     });
     
     // Animate chart on load
     arcPath
     .transition()
     .delay(function (d, i) {
     return i * 500;
     })
     .duration(500)
     .attrTween("d", function (d) {
     var interpolate = d3.interpolate(d.startAngle, d.endAngle);
     return function (t) {
     d.endAngle = interpolate(t);
     return arc(d);
     };
     });
     }
     
     /////////////////// campaigns-donut5
     
     
     // Marketing campaigns donut chart
     // ------------------------------
     
     // Initialize chart
     campaignDonut("#campaigns-donut5", 30);
     
     // Chart setup
     function campaignDonut(element, size) {
     
     
     // Basic setup
     // ------------------------------
     
     // Add data set
     var data = [
     {
     "browser": "Not Started",
     "icon": "<i class='icon-google position-left'></i>",
     "value": 6,
     "color": "#66BB6A"
     }, {
     "browser": "Started",
     "icon": "<i class='icon-share4 position-left'></i>",
     "value": 3,
     "color": "#9575CD"
     }, {
     "browser": "Late",
     "icon": "<i class='icon-youtube position-left'></i>",
     "value": 12,
     "color": "#FF7043"
     }
     ];
     
     // Main variables
     var d3Container = d3.select(element),
     distance = 2, // reserve 2px space for mouseover arc moving
     radius = (size / 2) - distance,
     sum = d3.sum(data, function (d) {
     return d.value;
     })
     
     
     
     // Tooltip
     // ------------------------------
     
     var tip = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .direction('e')
     .html(function (d) {
     return "<ul class='list-unstyled mb-5'>" +
     "<li><span class='text-semibold pull-right'>" + d.data.browser + ' : ' + d.value + "</span>" + "</li>" +
     "</ul>";
     })
     
     
     
     // Create chart
     // ------------------------------
     
     // Add svg element
     var container = d3Container.append("svg").call(tip);
     
     // Add SVG group
     var svg = container
     .attr("width", size)
     .attr("height", size)
     .append("g")
     .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");
     
     
     
     // Construct chart layout
     // ------------------------------
     
     // Pie
     var pie = d3.layout.pie()
     .sort(null)
     .startAngle(Math.PI)
     .endAngle(3 * Math.PI)
     .value(function (d) {
     return d.value;
     });
     
     // Arc
     var arc = d3.svg.arc()
     .outerRadius(radius)
     .innerRadius(radius / 2);
     
     
     
     //
     // Append chart elements
     //
     
     // Group chart elements
     var arcGroup = svg.selectAll(".d3-arc")
     .data(pie(data))
     .enter()
     .append("g")
     .attr("class", "d3-arc")
     .style('stroke', '#fff')
     .style('cursor', 'pointer');
     
     // Append path
     var arcPath = arcGroup
     .append("path")
     .style("fill", function (d) {
     return d.data.color;
     });
     
     // Add tooltip
     arcPath
     .on('mouseover', function (d, i) {
     
     // Transition on mouseover
     d3.select(this)
     .transition()
     .duration(500)
     .ease('elastic')
     .attr('transform', function (d) {
     d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
     var x = Math.sin(d.midAngle) * distance;
     var y = -Math.cos(d.midAngle) * distance;
     return 'translate(' + x + ',' + y + ')';
     });
     })
     
     .on("mousemove", function (d) {
     
     // Show tooltip on mousemove
     tip.show(d)
     .style("top", (d3.event.pageY - 40) + "px")
     .style("left", (d3.event.pageX + 30) + "px");
     })
     
     .on('mouseout', function (d, i) {
     
     // Mouseout transition
     d3.select(this)
     .transition()
     .duration(500)
     .ease('bounce')
     .attr('transform', 'translate(0,0)');
     
     // Hide tooltip
     tip.hide(d);
     });
     
     // Animate chart on load
     arcPath
     .transition()
     .delay(function (d, i) {
     return i * 500;
     })
     .duration(500)
     .attrTween("d", function (d) {
     var interpolate = d3.interpolate(d.startAngle, d.endAngle);
     return function (t) {
     d.endAngle = interpolate(t);
     return arc(d);
     };
     });
     }*/


});

