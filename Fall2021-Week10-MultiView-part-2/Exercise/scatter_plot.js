function scatter_plot(X,Y,markersize,
                      ColorData,
                      axis_key,
                      title="",
                      xLabel="",
                      yLabel="",
                      legend=[],
                      legendcolors=[],
                      circle = "circle1",
                      margin = 100)
{
    function data_axis_pad(data,pad=.05){
        return [data[0]-pad*data[0], data[1]+pad*data[1] ]
    }

    let xScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(X))).range([0+margin,1000-margin])
    let yScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(Y))).range([1000-margin,0 + margin])
    let colorScale= d3.scaleLinear().domain(d3.extent(ColorData)).range(['steelblue','brown'])

    let axis = d3.select(`#${axis_key}`)

    axis.selectAll('.markers')
        .data(X)
        .enter()
        .append('g')
        .attr('transform', function(d,i) {
            return `translate(${xScale(X[i])}, ${yScale(Y[i])})`})
        .append('circle').attr("r",function (d,i){
            return markersize[i];
        }).attr("class",circle) 
        .style("fill",function (d,i){
            console.log(X[i], Y[i], colorScale(ColorData[i]))
            return colorScale(ColorData[i])})
    // x and y Axis function
    let x_axis = d3.axisBottom(xScale).ticks(4)
    let y_axis = d3.axisLeft(yScale).ticks(4)
    //X Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${0},${1000-margin})`)
        .call(x_axis)
    // Y Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${margin},${0})`)
        .call(y_axis)
    // Labels
    axis.append("g").attr("class","label")
        .attr("transform", `translate(${500},${1000-10})`)
        .append("text")
        .attr("class","label")
        .attr("text-anchor","middle")
        .text(xLabel)

    axis.append("g")
        .attr("transform", `translate(${35},${500}) rotate(270)`)
        .append("text")
        .attr("class","label")
        .attr("text-anchor","middle")
        .text(yLabel)



    // Title
    axis.append('text')
        .attr('x',500)
        .attr('y',80)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","plotTitle")


        if (legend.length>0){
            console.log(legend)
            legend.forEach(
                function (d,i){
                let space = 50
                let lgnd = axis.append("g").attr('transform',`translate(${900},${i*50 + space})`);
                lgnd.append('rect').attr('width',function (d){return 40})
                                   .attr('height',function (d){return 40})
                                   .attr('fill',function (d){ 
                                       return legendcolors[i]
                                   }).on("click", function() {
                                       d3.selectAll(`.${circle}`).style("display", "table").style("display",function (d,ind){
                                           console.log(ColorData, i)
                                            if(ColorData[ind] === i){
                                                return "circle"
                                            }      
                                            else{return "none"}                                 
                                        })
                                    })
                    .attr("class",d)
                lgnd.append('text').style("font-size", "24px").attr("class","legend").attr("dx","-120").attr("dy","30").text(d)
    
            })
        }

}