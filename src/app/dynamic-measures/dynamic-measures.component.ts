import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LineChart, ColumnChart, ErrorComponent, LoadingComponent, Model } from "@gooddata/react-components";
import sdk from "@gooddata/gooddata-js";
import * as uuid from 'uuid';
import * as ReactDOM from 'react-dom';
import "@gooddata/react-components/styles/css/main.css";
import * as React from 'react';
import * as invariant from 'invariant';

import { monthDateIdentifier, projectId, franchiseFeesTag } from '../../utils/fixtures';


let self: any;

interface LineChartBucketProps {
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
  selector: 'app-dynamic-measures',
  templateUrl: './dynamic-measures.component.html',
  styleUrls: ['./dynamic-measures.component.css']
})

export class DynamicMeasuresComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  buttonID: any;
  rootDomID: any;
  lineChartDM: string;
  //config = { legend: { position: "bottom" } };
  updatedMeasure: any;
  title: string;
  afmMeasure= [
    Model.measure(`/gdc/md/${projectId}/obj/6694`).format("#,##0"),
    Model.measure(`/gdc/md/${projectId}/obj/6685`).format("#,##0"),
    Model.measure(`/gdc/md/${projectId}/obj/6695`).format("#,##0"),
    Model.measure(`/gdc/md/${projectId}/obj/6693`).format("#,##0")
  ];
  isSelected: boolean;
  attribute = Model.attribute(monthDateIdentifier);
  measures: any;
  state = {
    measureList: null
  };
  itemState = {
    isSelected:false
  };

  componentWillMount() {
    sdk.xhr
        .get(`/gdc/md/${projectId}/tags/${franchiseFeesTag}`)
        .then(response => {
            if (!response.data.entries.length) {
                return ( 
                  this.state = {
                  measureList: null
                });               
            }
            return this.state=({
                measureList: response.data.entries.map(entry => ({
                    ...entry,
                    isSelected: true,
                    afmMeasure: Model.measure(entry.link).format("#,##0"),
                }))
            });
        })
}

  
  //---------

  onMeasureChange = (measureIdentifier) => {
    const { measureList } = this.state;
    const updatedMeasure = measureList.find(measure => measure.link === measureIdentifier);
    const updatedMeasureIndex = measureList.indexOf(updatedMeasure);
    const updatedMeasures = [...measureList];
    updatedMeasures[updatedMeasureIndex] = {
      ...updatedMeasure,
      isSelected: !updatedMeasure.isSelected,
    };
    this.state.measureList= this.updatedMeasure
    
  }

  protected renderButton({ label, isSelected }){
    return React.createElement("button", {
      'className': `list-item ${isSelected ? "selected" : ""}`,
      onClick: this.onMeasureChange
    }, label); 
  }

  protected getButtonNode() {
    const node = document.getElementById(this.buttonID);
    invariant(node, `Node '${this.buttonID} not found!`);
    return node;
  }

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
    invariant(node, `Node tableRoomData not found!`);
    return node;
  }

  renderSidebar(){
    const {measureList} = this.state;
    const selectedMeasures = measureList.filter(measure => measure.isSelected);
    const measures = selectedMeasures.map(item => item.afmMeasure);
    self.renderLineChart(measures);
  }

  ngOnInit() {
    this.lineChartDM = uuid.v4();
    self = this;
    this.state = {
      measureList: null
    };
   this.onMeasureChange = this.onMeasureChange.bind(this);

  }

  ngOnChanges() {
    this.renderSidebar();
    this.renderLineChart(this.measures);

  }

  ngAfterViewInit() {
    this.renderSidebar();
    this.renderLineChart(this.measures);

  }

  ngOnDestroy() {
    this.renderSidebar();
    this.renderLineChart(this.measures);

    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
