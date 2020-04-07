import { Component, OnInit } from '@angular/core';
import '@gooddata/react-components/styles/css/main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import { LineChart, ColumnChart, ErrorComponent, LoadingComponent, Model } from "@gooddata/react-components";
import sdk from "@gooddata/gooddata-js";
import { monthDateIdentifier, projectId, franchiseFeesTag } from '../../utils/fixtures';


let self: any;
export interface LineChartBucketProps {
  projectId: any;
  measures: any[];
  trendBy?: (any);
  segmentBy?: (any);
  filters?: any[];
  sortBy?: any[];
  config?: any;
  locale?: any;
}


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})

export class DynamicComponent implements OnInit {
  attribute = Model.attribute(monthDateIdentifier);
  measureList: any;
  error: any;
  lineChartDM: string;
  selectedMeasures: any;
  measures: any[];
  constructor() {
    //this.measures=[];
    this.measureList = null;
    this.error = null;
    this.onMeasureChange = this.onMeasureChange.bind(this);
  }
  onMeasureChange(measureIdentifier) {
    const { measureList } = this.measureList;
    const updatedMeasure = measureList.find(measure => measure.link === measureIdentifier);
    const updatedMeasureIndex = measureList.indexOf(updatedMeasure);
    const updatedMeasures = [...measureList];
    updatedMeasures[updatedMeasureIndex] = {
      ...updatedMeasure,
      isSelected: !updatedMeasure.isSelected,
    };
    this.measureList = updatedMeasures;
  }


  componentWillMount() {
    sdk.xhr
      .get(`/gdc/md/${projectId}/tags/${franchiseFeesTag}`)
      .then(response => {
        debugger;
        if (!response.data.entries.length) {
          // console.log("0000000000000000................");
          this.measureList = null;
          this.error = {
            message: `No measures with tag ${franchiseFeesTag}`,
            description: `Please check your project. Franchise fees measures should have assigned the tag ${franchiseFeesTag}.`,
          }
        }
        else {
          // console.log("11111111111111111................");
          this.measureList = response.data.entries.map(entry => ({
            ...entry,
            isSelected: true,
            afmMeasures: Model.measure(entry.link).format("#,##0"),
          })),
            this.error = null;
          //console.log("this.measureList = " + JSON.stringify(this.measureList[0].link));
        }
      })
      .catch(error => {
        this.measureList = null;
        this.error = {
          message: `There was Error while requesting measures by tag ${franchiseFeesTag}`,
          description: JSON.stringify(error),
        }
      });
  }

  getMeasure = (measureList) => {
    debugger;
    console.log("hhaaa:"+measureList);
    if (measureList) {
      this.selectedMeasures = measureList.filter(measure => measure.isSelected); 
      //console.log("hhaaa:"+this.selectedMeasures);
      this.measures=this.selectedMeasures.map(item => item.afmMeasure);
      return this.measures;     
    }
    return [];
  }

  render() {
    this.renderLineChart( self.getMeasure(self.measures))
    // if (this.error) {
    //   // return <ErrorComponent message={error.message} description={error.description} />;
    // }
  }

  //Render Charts
  protected getLineChartProps(measures): LineChartBucketProps {
    return {
      projectId: projectId,
      measures: measures,
      trendBy: this.attribute
    };
  }

  public renderLineChart(measures) {
    ReactDOM.render(React.createElement(LineChart, this.getLineChartProps(measures)), this.getLineChartNode());
  }

  protected getLineChartNode() {
    const node = document.getElementById(this.lineChartDM);
    invariant(node, `Node lineChartDM not found!`);
    return node;
  }

  ngOnInit() {
    self = this;
    this.componentWillMount();
    //this.selectedMeasures = this.measures;
    // this.renderLineChart(self.getMeasure(self.measures));
    // this.render();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}