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
            return colorScale(ColorData[i])})
    // x and y Axis function
    let x_axis = d3.axisBottom(xScale).ticks(4)
    let y_axis = d3.axisLeft(yScale).ticks(4)
    //X Axis
    axis.append("g")
        .attr("transform", `translate(${0},${1000-margin})`).attr("class","disable-text  axis")
        .call(x_axis)
    // Y Axis
    axis.append("g")
        .attr("transform", `translate(${margin},${0})`).attr("class","disable-text  axis")
        .call(y_axis)
    // Labels
    axis.append("g")
        .attr("transform", `translate(${500},${1000-10})`)
        .append("text")
        .attr("class","disable-text  label")
        .attr("text-anchor","middle")
        .text(xLabel)

    axis.append("g")
        .attr("transform", `translate(${35},${500}) rotate(270)`)
        .append("text")
        .attr("class","disable-text  label")
        .attr("text-anchor","middle")
        .text(yLabel)



    // Title
    axis.append('text')
        .attr('x',500)
        .attr('y',80)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","plotTitle disable-text")



        if (legend.length>0){
            legend.forEach(
                function (d,i){
                let space = 50
                let lgnd = axis.append("g").attr('transform',`translate(${1000},${i*50 + space})`);
                lgnd.append('rect').attr('width',function (d){return 40})
                                   .attr('height',function (d){return 40})
                                   .attr("class", "circle"+ i)
                                   .attr('fill',function (d){ 
                                       return legendcolors[i]
                                   })
                                   .attr('stroke', 'black')
                                   .on("click", function() {
                                       d3.selectAll(`.${circle}`).style("display", "table").style("display",function (d,ind){
                                            if(ColorData[ind] === i){
                                                return "circle"
                                            }      
                                            else{return "none"}                                 
                                        })
                                        d3.select(`.${circle+legend[0]}`).attr('stroke-width', '0')
                                        d3.select(`.${circle+legend[1]}`).attr('stroke-width', '0')
                                        d3.select(`.${circle+legend[2]}`).attr('stroke-width', '0')

                                        d3.select(`.${circle+d}`).attr('stroke-width', '5')
                                    })
                    .attr("class",circle+d).style('cursor', 'pointer')
                lgnd.append('text').style("font-size", "30px").attr("class","legend").attr("dx","-140").attr("dy","30").text(d).attr("class", "disable-text").on("click", function() {
                    d3.selectAll(`.${circle}`).style("display", "table").style("display",function (d,ind){
                         if(ColorData[ind] === i){
                             return "circle"
                         }      
                         else{return "none"}                                 
                     })
                     d3.select(`.${circle+legend[0]}`).attr('stroke-width', '0')
                     d3.select(`.${circle+legend[1]}`).attr('stroke-width', '0')
                     d3.select(`.${circle+legend[2]}`).attr('stroke-width', '0')

                     d3.select(`.${circle+d}`).attr('stroke-width', '5')
                 }).style('cursor', 'pointer')
                
                console.log("Index = ", i, legend.length)
                if(i === legend.length-1) {
                    let resetter = axis.append("g").attr('transform',`translate(${1000},${(i+1)*50 + space})`);

                
                    resetter.append('text').style("font-size", "28px").attr("class","legend").attr("dx","-140").attr("dy","30").text("Reset all legends").attr("text-decoration","underline").attr("class", "disable-text")
                    .on("click", function() {
                        d3.selectAll(`.${circle}`).style("display", "table").style("display",function (d,ind){
                            return "circle"                                
                        })
                        d3.select(`.${circle+legend[0]}`).attr('stroke-width', '0')
                        d3.select(`.${circle+legend[1]}`).attr('stroke-width', '0')
                        d3.select(`.${circle+legend[2]}`).attr('stroke-width', '0')

                    }).style('cursor', 'pointer')
                }
            })
        }

}