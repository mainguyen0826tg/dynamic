
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
  
  export interface ErrorProps {
    code?: string;
    icon?: string;
    message: string;
    description?: string;
    className?: string;
    style?: object;
    width?: any;
    height?: any;
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
    message: string;
    constructor() {
      this.measureList = null;
      this.error = null;
      this.onMeasureChange = this.onMeasureChange.bind(this);
    }
  
    protected getLineChartNode() {
      const node = document.getElementById(this.lineChartDM);
      invariant(node, `Node ` + this.lineChartDM + ` not found!`);
      return node;
    }
  
    protected getLineChartProps(measures): LineChartBucketProps {
      return {
        projectId: projectId,
        measures: measures,
        trendBy: this.attribute
      };
    }
  
  
  
    componentWillMount() {
      sdk.xhr
        .get(`/gdc/md/${projectId}/tags/${franchiseFeesTag}`)
        .then(response => {
          if (!response.data.entries.length) {
            this.measureList = null;
            this.error = {
              message: `No measures with tag ${franchiseFeesTag}`,
              description: `Please check your project. Franchise fees measures should have assigned the tag ${franchiseFeesTag}.`,
            }
          }
          else {
            this.measureList = response.data.entries.map(entry => ({
              ...entry,
              isSelected: true,
              afmMeasure: Model.measure(entry.link).format("#,##0"),
            })),
              this.error = null;
            //console.log("this.measureList = " + JSON.stringify(this.measureList[0].link));
            self.render();
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
  
    onMeasureChange(selectedItemLink) {
      self.message = null; 
        this.measureList.forEach(element => {
           if (element.link == selectedItemLink) {
            element.isSelected = !element.isSelected;        
          }
          self.render();
        });
         // self.message = 'PLEASE SELECT AT LEAST ONE MEASURE'; 
        
    }
  
    render() {
      if (this.measureList != null && this.measureList.length > 0) {
        const selectedMeasures = this.measureList.filter(measure => measure.isSelected);
        const measures = selectedMeasures.map(item => item.afmMeasure);
        this.renderLineChart(measures);
      }
    }
  
    public renderLineChart(measures) {
      if (this.message) {
        ReactDOM.render(React.createElement(ErrorComponent, this.getErrorProps()), this.getLineChartNode());
      } else {
        ReactDOM.render(React.createElement(LineChart, this.getLineChartProps(measures)), this.getLineChartNode());
      }    
    }
  
    protected getErrorProps(): ErrorProps {
      return {
        message: this.message,
      };
    }
  
    ngOnInit() {
      self = this;
      this.lineChartDM = 'lineChartDM';
      this.componentWillMount();
    }
  
    ngOnChanges() {
      this.render();
    }
  
    ngAfterViewInit() {
      this.render();
    }
  
    ngOnDestroy() {
      // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    }
  
  }