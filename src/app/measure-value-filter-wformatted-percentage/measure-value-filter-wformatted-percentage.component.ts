import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ColumnChart, Model,MeasureValueFilterDropdown } from '@gooddata/react-components';
import { projectId, locationNameDisplayFormIdentifier, franchisedSalesIdentifier,monthDateIdentifier } from '../../utils/fixtures';
import classNames from "classnames";

export interface ColumnChartProps {
  projectId: any;
  measures?: any[];
  viewBy?: any;
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
}


export interface MeasureValueFilterDropdownProps{
  projectId: any;
  filter: any;
  onApply: any;
  onCancel: any;
  anchorEl: any;
  usePercentage?: boolean;
  warningMessage?: string;
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
  selector: 'app-measure-value-filter-wformatted-percentage',
  templateUrl: './measure-value-filter-wformatted-percentage.component.html',
  styleUrls: ['./measure-value-filter-wformatted-percentage.component.css']
})


export class MeasureValueFilterWFormattedPercentageComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit  {
  public buttonID: string;
  public rootDomID: string;
  public columChartData: string;
  ref: React.RefObject<any>;
  displayDropdown: boolean;
  filters: any[];
  filterValue:any;

  franchisedSalesIdentifier = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSalesIdentifier').format('#,##0').alias('$ franchisedSalesIdentifier');
  defaultMeasureValueFilter = Model.measureValueFilter('franchisedSalesIdentifier');

  locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  monthDateIdentifier = Model.attribute(monthDateIdentifier)
  config ={
     stackMeasuresToPercent: true
  }

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
  protected getColumnChartNode() {
    const node = document.getElementById(this.columChartData);
    invariant(node, `Node tableRoomData not found!`);
    return node;
  }
//---------------Get Component-------------
  protected getMeasureValueProps(): MeasureValueFilterDropdownProps {
    //const { filters } = this.state;
    return {
      //anchorEl: this.getRootDomNode(),
      anchorEl: this.getButtonNode().getElementsByTagName('button')[0],
      projectId: projectId,
      filter: this.filterValue ? this.filterValue: this.defaultMeasureValueFilter,
      onApply: this.onApply,
      onCancel: this.onCancel, 
      warningMessage: "The filter uses actual measure values, not percentage.",
    };
  }

  protected getDropdownButtons(): DropdownButton {
    const { displayDropdown } = this.state;
    return {
      isActive: displayDropdown,
      measureTitle: "Measure",
      onClick: this.toggleDropdown,
    };
  }

  protected getColumnChartProps(): ColumnChartProps {
    return {
      projectId: projectId,
      measures: [this.franchisedSalesIdentifier ],
      viewBy: this.monthDateIdentifier,
      stackBy: this.locationResort,
      filters: this.filters,
      config: this.config

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
    this.renderColumnChart();
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
  public renderColumnChart() {
    ReactDOM.render(React.createElement(ColumnChart, this.getColumnChartProps()), this.getColumnChartNode());
}
//--------------

  ngOnInit() {
    this.rootDomID = uuid.v1();
    this.columChartData = 'columChartData';
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


