import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PivotTable, Model } from '@gooddata/react-components';
import { projectId, locationNameDisplayFormIdentifier, franchisedSalesIdentifier,totalSalesIdentifier } from '../../utils/fixtures';
export interface PivotTableBucketProps {
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  filters?: any[];
}
export interface PresetButton {
  isActive: boolean;
  label: any;
  appliedFilters: any;
}
@Component({
  selector: 'app-measure-value-filter-shown-in-percent',
  templateUrl: './measure-value-filter-shown-in-percent.component.html',
  styleUrls: ['./measure-value-filter-shown-in-percent.component.css']
})
export class MeasureValueFilterShownInPercentComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  filters: any[];
  private tableRoomData: string;
  private all: string;
  private greater: string;
  isActive: boolean;
  totalSales = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSales').title("Franchised Sales");
  totalSalesRatio = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSalesRatio').title("Franchised Sales %").ratio();
  
  locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  attributes = [Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("locationName")];
  greaterThanFilter = Model.measureValueFilter('franchisedSalesRatio').condition("GREATER_THAN", {
    value: 7000000,
  });
  state = {
    isActive: false,
  };
  // create button filter all//
  onClick = () => {
    this.state = {
      isActive: !this.state.isActive,
    };
    this.renderPivotTable(this.filters);
  }
  ButtonFilterAll = ({ label, isActive }) => {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClick
    }, label);
  };
  protected getButtonAll() {
    const node = document.getElementById(this.all);
    invariant(node, `Node all button not found!`);
    return node;
  }
  protected getButtonFilterALL(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "All franchise sales",
      appliedFilters: this.onClick
    };
  }
  protected renderFilterAll() {
    ReactDOM.render(React.createElement(this.ButtonFilterAll, this.getButtonFilterALL()), this.getButtonAll());
    this.renderPivotTable([]);
  }
  // Create button greater than filter//
  onClickGreaterThan = () => {
    this.state = {
      isActive: !this.state.isActive,
    };
    this.renderPivotTable([this.greaterThanFilter]);
  }
  ButtonGreaterThan = ({ label, isActive }) => {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClickGreaterThan
    }, label);
  };
  protected getButtonGreater() {
    const node = document.getElementById(this.greater);
    invariant(node, `Node greaterButton not found!`);
    return node;
  }
  protected getButtonGreaterThan(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "Franchise sales greater than 7,000,000 (shown in %)",
      appliedFilters: this.onClick
    };
  }
  protected renderGreaterThan() {
    ReactDOM.render(React.createElement(this.ButtonGreaterThan, this.getButtonGreaterThan()), this.getButtonGreater());
    this.renderPivotTable([]);
  }
 
  //render Pivot Table//
  protected getTableDataNode() {
    const node = document.getElementById(this.tableRoomData);
    invariant(node, `Node tableRoomData not found!`);
    return node;
  }
  protected getPivotTableProps(filters): PivotTableBucketProps {
    return {
      projectId: projectId,
      measures: [this.totalSales,this.totalSalesRatio],
      rows: [this.locationResort],
      filters: filters
    };
  }
  public renderPivotTable(filter) {
    ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps(filter)), this.getTableDataNode());
  }
  ngOnInit() {
    this.tableRoomData = uuid.v1();
    this.all = 'all';
    this.greater = 'greater';
  }
  ngOnChanges() {
    this.renderGreaterThan();
    this.renderFilterAll();
  }
  ngAfterViewInit() {
    this.renderGreaterThan();
    this.renderFilterAll();
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}