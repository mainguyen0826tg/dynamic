import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LineChart, ColumnChart, ErrorComponent, LoadingComponent, Model } from "@gooddata/react-components";
import sdk from "@gooddata/gooddata-js";
import * as uuid from 'uuid';
import * as ReactDOM from 'react-dom';
import "@gooddata/react-components/styles/css/main.css";
import * as React from 'react';
import * as invariant from 'invariant';

import { monthDateIdentifier, projectId, franchiseFeesTag } from '../../utils/fixtures';
import { SIDEBARITEM } from './sidebarItem';


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

export interface SidebarItem {
  link: any;
  title: string;
}

@Component({
  selector: 'app-dynamic-measures',
  templateUrl: './dynamic-measures.component.html',
  styleUrls: ['./dynamic-measures.component.css']
})

export class DynamicMeasuresComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures: any;
  buttonID: any;
  rootDomID: any;
  lineChartDM: string;
  selectedMeasures: any;
  measureList: any;
  error: any;
  //config = { legend: { position: "bottom" } };
  updatedMeasure: any;
  attribute = Model.attribute(monthDateIdentifier);
  state = {
    measureList: null,
    error: null,
  };
  itemState = {
    isSelected: false
  };


  constructor() {
    //this.measures=[];
    this.measureList = this.state.measureList;
    this.error = this.state.error;
    this.onMeasureChange = this.onMeasureChange.bind(this);
  }

  componentWillMount() {
    sdk.xhr
      .get(`/gdc/md/${projectId}/tags/${franchiseFeesTag}`)
      .then(response => {
        if (!response.data.entries.length) {
          return this.state = ({
            measureList: null,
            error: {
              message: `No measures with tag ${franchiseFeesTag}`,
              description: `Please check your project. Franchise fees measures should have assigned the tag ${franchiseFeesTag}.`,
            },
          });
        }
        return this.state = ({
          measureList: response.data.entries.map(entry => ({
            ...entry,
            isSelected: true,
            afmMeasure: Model.measure(entry.link).format("#,##0"),
          })),
          error: null,
        });
      })
      .catch(error => {
        this.state = ({
          measureList: null,
          error: {
            message: `There was Error while requesting measures by tag ${franchiseFeesTag}`,
            description: JSON.stringify(error),
          },
        });
      });
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
    this.state = {
      measureList: updatedMeasure,
      error: this.state.error,
    };
  }

  // protected renderButton({ label, isSelected }) {
  //   return React.createElement("button", {
  //     'className': `list-item ${isSelected ? "selected" : ""}`,
  //     onClick: this.onMeasureChange,
  //   }, label);
  // }


  // protected getButtonNode() {
  //   const node = document.getElementById(this.buttonID);
  //   invariant(node, `Node '${this.buttonID} not found!`);
  //   return node;
  // }

  // protected getLineChartProps(measures): LineChartBucketProps {
  //   return {
  //     projectId: projectId,
  //     measures: measures,
  //     trendBy: this.attribute
  //   };
  // }

  // public renderLineChart(measures) {
  //   ReactDOM.render(React.createElement(LineChart, this.getLineChartProps(measures)), this.getLineChartNode());
  // }

  // protected getLineChartNode() {
  //   const node = document.getElementById(this.lineChartDM);
  //   invariant(node, `Node lineChartDM not found!`);
  //   return node;
  // }

  // getMeasure = (measureList) => {
  //   if (measureList) {
  //     this.selectedMeasures = measureList.filter(measure => measure.isSelected); 
  //     this.measures=this.selectedMeasures.map(item => item.afmMeasure);
  //     return this.measures;     
  //   }
  // }

  // render() {
  //   this.renderLineChart(this.getMeasure(this.measures))

  // }

  ngOnInit() {
    this.componentWillMount();
    this.lineChartDM = uuid.v4();
    self = this;
    this.onMeasureChange = this.onMeasureChange.bind(this);
    this.state = {
      measureList: null,
      error: null,
    };

  }

  ngOnChanges() {
    // this.render();

  }

  ngAfterViewInit() {
    // this.render();

  }

  ngOnDestroy() {


    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
