import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PivotTable, Model } from '@gooddata/react-components';
import { projectId, locationNameDisplayFormIdentifier, franchisedSalesIdentifier } from '../../utils/fixtures';
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
  selector: 'app-measure-value-filter-example',
  templateUrl:'./measure-value-filter-example.component.html',
  styleUrls: ['./measure-value-filter-example.component.css']
})
export class MeasureValueFilterExamplesComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  filters: any[];
  public tableRoomData: string;
  public all: string;
  public greater: string;
  public bewteen: string;
  isActive: boolean;
  totalSales = Model.measure(franchisedSalesIdentifier).localIdentifier('franchisedSales').format('#,##0').title("Franchised Sales");
  locationResort = Model.attribute(locationNameDisplayFormIdentifier);
  attributes = [Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("locationName")];
  greaterThanFilter = Model.measureValueFilter('franchisedSales').condition("GREATER_THAN", {
    value: 7000000,
  });
  betweenFilter = Model.measureValueFilter('franchisedSales').condition("BETWEEN", {
    from: 5000000,
    to: 8000000,
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
      label: "Filter All",
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
      label: "Greater Than Filter",
      appliedFilters: this.onClick
    };
  }
  protected renderGraterThan() {
    ReactDOM.render(React.createElement(this.ButtonGreaterThan, this.getButtonGreaterThan()), this.getButtonGreater());
    this.renderPivotTable([]);
  }
  // Create button between filter//
  onClickBetWeen = () => {
    this.state = {
      isActive: !this.state.isActive,
    };
    this.renderPivotTable([this.betweenFilter]);
  }
  ButtonBetweenFilter = ({ label, isActive }) => {
    return React.createElement("button", {
      'className': `gd-button gd-button-secondary ${isActive ? "is-active" : ""} s-filter-button`,
      onClick: this.onClickBetWeen
    }, label);
  };
  protected getButtonBewteen() {
    const node = document.getElementById(this.bewteen);
    invariant(node, `Node bewteenButton not found!`);
    return node;
  }
  protected getButtonBetweenProps(): PresetButton {
    const { isActive, } = this.state;
    return {
      isActive: isActive,
      label: "BetWeen Filter",
      appliedFilters: this.onClick
    };
  }
  protected renderFilterBetween() {
    ReactDOM.render(React.createElement(this.ButtonBetweenFilter, this.getButtonBetweenProps()), this.getButtonBewteen());
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
      measures: [this.totalSales],
      rows: [this.locationResort],
      filters: filters
    };
  }
  public renderPivotTable(filter) {
    ReactDOM.render(React.createElement(PivotTable, this.getPivotTableProps(filter)), this.getTableDataNode());
  }
  ngOnInit() {
    this.tableRoomData = uuid.v4();
    this.all = 'all';
    this.bewteen = 'bewteen';
    this.greater = 'greater';
  }
  ngOnChanges() {
    this.renderGraterThan();
    this.renderFilterBetween();
    this.renderFilterAll();
  }
  ngAfterViewInit() {
    this.renderGraterThan();
    this.renderFilterBetween();
    this.renderFilterAll();
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}