function scatter_plot(data,
                                 ax,
                                 title="",
                                 xLabel="",
                                 yLabel="",
                                 legend=[],
                                 legendcolors=[],
                                 margin = 10)
{
    let xScale= d3.scaleLinear().domain(d3.extent(data,function (d){return d.x}))
                                .range([-50,250])
    let yScale= d3.scaleLinear().domain(d3.extent(data,function (d){return d.y})).range([300,80])
    let rScale= d3.scaleLinear().domain(d3.extent(data,function (d){return d.r})).range([2,4])
    let axis = d3.select(`${ax}`)

    let markers = axis.selectAll('.markers')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d) {
            return `translate(${xScale(d.x)}, ${yScale(d.y)})`})
        .append('circle')
        .attr("class",function (d,i){
                    return `cls_${i}`})
        .attr("r",function (d){return rScale(d.r)})
        .attr("fill",function (d){return d.c})
        .on("mouseenter",function (){
            let class_name = d3.select(this).attr('class')
            console.log(class_name)
            d3.select(`.${class_name}`).classed("selected",true)
        })
        .on("mouseleave",function (){
            let class_name = d3.select(this).attr('class')
            setTimeout(
                d=>{d3.select(`.${class_name}`).classed("selected",false)},
                1000)

        })

    // x and y Axis function
    let x_axis = d3.axisBottom(xScale).ticks(4)

    let y_axis = d3.axisLeft(yScale).ticks(4)
    //X Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${0},${300})`)
        .call(x_axis)
    // Y Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${-50},${0})`)
        .call(y_axis)
    // Labels
    axis.append("g").attr("class","label")
        .attr("transform", `translate(${100},${350})`)
        .append("text")
        .attr("class","label")
        .text(xLabel)

    axis.append("g")
        .attr("transform", `translate(${-120},${200}) rotate(270)`)
        .append("text")
        .attr("class","label")
        .text(yLabel)
    // Title
    axis.append('text')
        .attr('x',100)
        .attr('y',40)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","title")

    // legend
    if (legend.length>0){
        legend.forEach(
            function (d,i){
            let space = 50
            let lgnd = axis.append("g").attr('transform',`translate(${350},${i*35 + space})`);
            lgnd.append('rect').attr('width',function (d){return 20})
                               .attr('height',function (d){return 20})
                               .attr('fill',function (d){
                                   return legendcolors[i]
                               })
                .attr("class",d)
            lgnd.append('text').attr("class","legend").attr("dx","-40").attr("dy","15").text(d)

        })
    }




}