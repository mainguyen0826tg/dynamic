import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LineChart, Model, ErrorComponent,MeasureValueFilterDropdown } from '@gooddata/react-components';
import { projectId, locationNameDisplayFormIdentifier, franchisedSalesIdentifier } from '../../utils/fixtures';
import { VisualizationInput } from '@gooddata/typings';
import classNames from "classnames";


export interface LineChartProps {
  projectId: string;
  measures: any[];
  trendBy?: any;
  segmentBy?: any;
  filters?: any[];
  sortBy?: any[];
}


export interface MeasureValueFilterDropdownProps{
  projectId: any;
  filter: any;
  onApply: any;
  onCancel: any;
  anchorEl: any;
}


const DropdownButton = ({isActive,measureTitle,onClick}) => {
  const className = classNames("gd-mvf-dropdown-button", "s-mvf-dropdown-button", "gd-button", "gd-button-secondary", "button-dropdown", "icon-right", 
  {
    "icon-navigateup": isActive,
    "icon-navigatedown": !isActive
  });
  return React.createElement("button", {
    className: className,
    onClick: onClick,
  }, measureTitle);
};

export interface DropdownButton{
  isActive: boolean;
  measureTitle: any;
  onClick: any;
}


@Component({
  selector: 'app-measure-value-filter-nline-chart',
  template: `<div ref={this.ref} [id]="buttonID"></div>
  <div class="measure-value-filter" ref={this.ref}  [id]="rootDomID"></div>
  <hr className="separator" />
  <div class="measure-value-filter" style="height:500px" [id]="lineRoomData"></div>`,
})

export class MeasureValueFilterNLineChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit  {
  public buttonID: string;
  public rootDomID: string;
  public lineRoomData: string;
  ref: React.RefObject<any>;
  displayDropdown: boolean;
  filters: any[];
  filterValue:any;
  totalSales = [Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSalesIdentifier').format('#,##0').alias('$ franchisedSalesIdentifier')];
  locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  defaultMeasureValueFilter = Model.measureValueFilter('franchisedSalesIdentifier');

  state = {
    displayDropdown: false,
    filters: [this.defaultMeasureValueFilter],
};

onApply = filter => {
    this.filters= [filter];
    this.filterValue= filter;
    this.state ={
      displayDropdown: !this.state.displayDropdown,
      filters:  [this.defaultMeasureValueFilter]
    }
    this.render();
    

};

onCancel = () => {
  this.displayDropdown= false;
  this.state ={
    displayDropdown: !this.state.displayDropdown,
    filters:  [this.defaultMeasureValueFilter]
  }
 this.renderFilterValue();
};

toggleDropdown = () => {
     
    this.state = {
      displayDropdown: !this.state.displayDropdown,
      filters:  [this.defaultMeasureValueFilter]      
    }
    this.render();
};

//----------Get Element---------
  protected getButtonNode() {
    const node = document.getElementById(this.buttonID);
    invariant(node, `Node '${this.buttonID} not found!`);
    return node;
  }
  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getLineDataNode() {
    const node = document.getElementById(this.lineRoomData);
    invariant(node, `Node lineRoomData not found!`);
    return node;
  }
//---------------Get Component-------------
  protected getMeasureValueProps(): MeasureValueFilterDropdownProps {
    const { filters } = this.state;
    return {
      anchorEl: this.ref.current,
      projectId: projectId,
      filter: this.filterValue ? this.filterValue: this.defaultMeasureValueFilter,
      onApply: this.onApply,
      onCancel: this.onCancel,    
    };
  }

  protected getDropdownButtons(): DropdownButton {
    const { displayDropdown } = this.state;
    return {
      isActive: displayDropdown,
      measureTitle: "totalSales",
      onClick: this.toggleDropdown,
    };
  }

  protected getLineChartProps(): LineChartProps {
    return {
      projectId: projectId,
      measures: this.totalSales,
      trendBy: this.locationResort,
      filters: this.filters,
    };
  }


  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  private isFilterMounted(): boolean {
    return !!this.rootDomID;
  }
//--------------Rendering----------------------
  protected render() {
    this.renderButton();  
    this.renderFilterValue(); 
    this.renderLineChart();
  }
  public renderButton(){
    ReactDOM.render(React.createElement(DropdownButton, this.getDropdownButtons()), this.getButtonNode());
  }
  public renderFilterValue(){
    const  {displayDropdown} = this.state;
    if (displayDropdown)
    {
    ReactDOM.render(React.createElement(MeasureValueFilterDropdown, this.getMeasureValueProps()), this.getRootDomNode());
  }
  else {
    ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
  public renderLineChart() {
    ReactDOM.render(React.createElement(LineChart, this.getLineChartProps()), this.getLineDataNode());
}
//--------------

  ngOnInit() {
    this.rootDomID = uuid.v1();
    this.lineRoomData = 'lineRoomData';
    this.buttonID='buttonID'; 
    this.ref = React.createRef();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    this.render();
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }


}

