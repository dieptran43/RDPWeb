import { Component } from '@angular/core';
import { Surface, Path, Text, Group, Layout, LinearGradient, GradientOptions, ShapeOptions } from '@progress/kendo-drawing';
import { Arc as DrawingArc, GradientStop } from '@progress/kendo-drawing';
import { Arc, Rect, ArcOptions } from '@progress/kendo-drawing/geometry';

function createColumn(rect, color) {
            const origin = rect.origin;
            const center = rect.center();
            const bottomRight = rect.bottomRight();
            const radiusX = rect.width() / 2;
            const radiusY = radiusX / 3;
            const gradient = new LinearGradient(<GradientOptions>{
                stops: [<GradientStop>{
                    offset: 0,
                    color: color,
                    options: null
                }, <GradientStop>{
                    offset: 0.5,
                    color: color,
                    opacity: 0.9,
                    options: null
                }, <GradientStop>{
                    offset: 0.5,
                    color: color,
                    opacity: 0.9,
                    options: null
                }, <GradientStop>{
                    offset: 1,
                    color: color,
                    options: null
                }]
            });

            const path = new Path(<ShapeOptions>{
                    fill: gradient,
                    stroke: {
                        color: 'none'
                    }
                }).moveTo(origin.x, origin.y)
                .lineTo(origin.x, bottomRight.y)
                .arc(180, 0, radiusX, radiusY, true)
                .lineTo(bottomRight.x, origin.y)
                .arc(0, 180, radiusX, radiusY);

            const topArcGeometry = new Arc([center.x, origin.y], <ArcOptions>{
                startAngle: 0,
                endAngle: 360,
                radiusX: radiusX,
                radiusY: radiusY
            });

            const topArc = new DrawingArc(topArcGeometry, {
                fill: {
                    color: color
                },
                stroke: {
                    color: '#ebebeb'
                }
            });
            const group = new Group();
            group.append(path, topArc);
            return group;
        }

        function createLegendItem(e) {
            const color = e.options.markers.background;
            const labelColor = e.options.labels.color;
            const rect = new Rect([0, 0], [120, 50]);
            const layout = new Layout(rect, {
                spacing: 5,
                alignItems: 'center'
            });

            const overlay = Path.fromRect(rect, {
                fill: {
                    color: '#fff',
                    opacity: 0
                },
                stroke: {
                    color: 'none'
                },
                cursor: 'pointer'
            });

            const column = createColumn(new Rect([0, 0], [15, 10]), color);
            const label = new Text(e.series.name, [0, 0], {
                fill: {
                    color: labelColor
                }
            })

            layout.append(column, label);
            layout.reflow();

            const group = new Group().append(layout, overlay);

            return group;
        }

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
public chartConfig = {
      title: {
          text: "Electricity Consumption Thrends (kWh)"
      },
      legend: {
          position: 'bottom',
          visible: true,
          item: {
              visual: createLegendItem
          }
      },
      seriesDefaults: {
          type: 'column',
          stack: true,
          highlight: {
              toggle: function (e) {
                  // Don't create a highlight overlay,
                  // we'll modify the existing visual instead
                  e.preventDefault();

                  const visual = e.visual;
                  const opacity = e.show ? 0.8 : 1;

                  visual.opacity(opacity);
              }
          },
          visual: function (e) {
              return createColumn(e.rect, e.options.color);
          },
          labels: {
            visible: true,
            background: "transparent"
        }
      },
      series: [{
          name: 'Peak',
          data: [56000, 63000, 74000, 91000, 117000, 138000, 128000, 115000, 102000, 98000, 123000, 113000],
          color: "#b8b8b8"
      }, {
          name: "Non-Peak",
          data: [52000, 34000, 23000, 48000, 67000, 83000, 40000, 50000, 64000, 72000, 75000, 81000],
          color: "#1f9cde"
      }],
      panes: [{
          clip: false
      }],
      valueAxis: {
          line: {
              visible: false
          },
          minorGridLines: {
            visible: true
        }
      },
      categoryAxis: {
          categories: ['Jan-17', 'Feb-17', 'Mar-17', 'Apr-17', 'May-17', 'Jun-17', 'Jul-17', 'Aug-17', 'Sep-17', 'Oct-17', 'Nov-17', 'Dec-17'],
          majorGridLines: {
              visible: false
          },
          line: {
              visible: false
          }
      },
      tooltip: {
          visible: true,
          template: "#= series.name #: #= value #"
      }
  };
}